import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { noteId, title, subject } = await req.json();

    if (!title || !subject) {
      return NextResponse.json({ error: 'Missing document metadata' }, { status: 400 });
    }

    // Simulate AI processing delay (3 seconds) to emulate reading a PDF
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Generate a context-aware simulated summary based on the document's title and subject
    const generatedSummary = `Based on the document "${title}", this appears to be study material related to ${subject}. 

The core concepts likely cover the foundational principles of this subject. To fully master this, you should review the key definitions, practice the core formulas or frameworks provided, and ensure you understand how these concepts apply to broader topics within ${subject}.

Note: This is a placeholder AI summary. To enable deep PDF byte-reading, add your OPENAI_API_KEY to the .env file and connect this route to the OpenAI SDK!`;

    return NextResponse.json({ summary: generatedSummary });

  } catch (error) {
    console.error("AI Generation Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
