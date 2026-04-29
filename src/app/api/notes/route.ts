import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const notes = await prisma.note.findMany({
      where: {
        OR: [
          { uploaderId: userId },
          { isPublic: true }
        ]
      },
      orderBy: { createdAt: 'desc' },
      include: {
        uploader: {
          select: { fullName: true, avatarUrl: true }
        }
      }
    });

    return NextResponse.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
