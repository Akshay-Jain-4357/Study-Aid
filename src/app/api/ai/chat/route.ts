import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;
    const baseURL = process.env.GROQ_API_KEY 
      ? 'https://api.groq.com/openai/v1' 
      : 'https://api.openai.com/v1';

    if (!apiKey || apiKey.includes('YOUR_')) {
      return NextResponse.json({ 
        error: 'AI API Key not configured. Please add your key to the .env file.',
        isConfigError: true 
      }, { status: 500 });
    }

    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: baseURL,
    });

    const response = await openai.chat.completions.create({
      model: process.env.GROQ_API_KEY ? 'llama-3.3-70b-versatile' : 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are StudyAid AI, an elite academic tutor. Your goal is to help students understand complex concepts, solve problems, and prepare for exams like GATE, JEE, and University finals. Use markdown for formatting. Be concise but thorough. If asked for a quiz, generate MCQs with explanations.'
        },
        ...messages.map((m: any) => ({
          role: m.role,
          content: m.content,
        }))
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const aiMessage = response.choices[0].message;

    return NextResponse.json({ message: aiMessage });

  } catch (error: any) {
    console.error('AI Chat Error:', error);
    return NextResponse.json({ 
      error: error.message || 'An error occurred during AI processing.' 
    }, { status: 500 });
  }
}
