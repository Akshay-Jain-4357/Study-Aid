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

    const assignments = await prisma.assignment.findMany({
      where: { userId },
      orderBy: { dueDate: 'asc' },
    });

    const notes = await prisma.note.findMany({
      where: { uploaderId: userId },
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    return NextResponse.json({
      assignments,
      notes,
      stats: {
        xp: user?.xpPoints || 0,
        streak: user?.currentStreak || 0,
        plan: user?.planTier || 'FREE'
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
