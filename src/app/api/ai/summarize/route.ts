import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { noteId, title, subject, content } = await req.json();

    const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;
    const baseURL = process.env.GROQ_API_KEY 
      ? 'https://api.groq.com/openai/v1' 
      : 'https://api.openai.com/v1';

    if (!apiKey || apiKey.includes('YOUR_')) {
      // Fallback to simulated summary if no key is present, but with a warning
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return NextResponse.json({ 
        summary: `[SIMULATED SUMMARY] This note "${title}" covers key topics in ${subject}. (Please configure your AI API keys in .env to enable deep document analysis).` 
      });
    }

    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: baseURL,
    });

    const response = await openai.chat.completions.create({
      model: process.env.GROQ_API_KEY ? 'llama-3.1-8b-instant' : 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert academic summarizer. Provide a concise, structured summary of the study material provided. Use bullet points and highlight key terms.'
        },
        {
          role: 'user',
          content: `Document Title: ${title}\nSubject: ${subject}\n\nPlease summarize this material.`
        }
      ],
      temperature: 0.5,
    });

    return NextResponse.json({ summary: response.choices[0].message.content });

  } catch (error: any) {
    console.error("AI Summarize Error:", error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
