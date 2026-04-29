import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth, currentUser } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const { userId } = await auth();
    const clerkUser = await currentUser();
    
    if (!userId || !clerkUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Ensure user exists in database
    const user = await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress || 'no-email@example.com',
        fullName: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'Student',
        planTier: 'FREE',
      }
    });

    // Calculate credits based on plan
    const credits = user.planTier === 'FREE' ? '10' : '∞';

    return NextResponse.json({
      plan: user.planTier,
      credits: credits,
      streak: user.currentStreak,
      xp: user.xpPoints
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
