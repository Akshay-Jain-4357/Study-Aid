import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth, currentUser } from '@clerk/nextjs/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '@/lib/s3';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const clerkUser = await currentUser();
    
    if (!userId || !clerkUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Ensure user exists in our DB to prevent Foreign Key constraints failing
    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress || 'unknown@example.com',
        fullName: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'Student',
        planTier: 'FREE',
      }
    });

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const subject = formData.get('subject') as string;
    const isPublicString = formData.get('isPublic') as string;
    const isPublic = isPublicString === 'true';

    if (!file || !title || !subject) {
      return NextResponse.json({ error: 'Missing required fields or file' }, { status: 400 });
    }

    // Convert file to buffer for AWS S3
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Create unique S3 key
    const uniqueFileName = `${userId}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const bucketName = process.env.AWS_S3_BUCKET_NAME || 'study-aid-vault';
    const region = process.env.AWS_REGION || 'ap-south-1';

    let s3Url = `https://placeholder-storage.com/${uniqueFileName}`;

    // Upload to AWS S3 (Will gracefully fall back to placeholder if AWS keys are not fully configured yet)
    if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
      await s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: uniqueFileName,
          Body: buffer,
          ContentType: file.type,
        })
      );
      s3Url = `https://${bucketName}.s3.${region}.amazonaws.com/${uniqueFileName}`;
    }

    const note = await prisma.note.create({
      data: {
        title,
        subject,
        documentUrl: s3Url,
        isPublic,
        uploaderId: userId,
        isPremium: false,
        drmProtected: true, // Enforce strict DRM conceptually
      }
    });

    return NextResponse.json(note, { status: 201 });
  } catch (error: any) {
    console.error('Error uploading note:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
