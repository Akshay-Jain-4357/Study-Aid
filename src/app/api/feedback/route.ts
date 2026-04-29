import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const { type, message } = await req.json();

    if (!type || !message) {
      return NextResponse.json({ error: 'Missing type or message' }, { status: 400 });
    }

    const feedback = await prisma.feedback.create({
      data: {
        type,
        message,
        userId: userId || null, // Allow anonymous feedback
      }
    });

    return NextResponse.json(feedback, { status: 201 });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
