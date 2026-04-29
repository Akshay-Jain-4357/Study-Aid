import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs'
import FeedbackButton from '@/components/FeedbackButton';
import { dark } from '@clerk/themes';
import './globals.css';

export const metadata: Metadata = {
  title: 'Study Aid – AI Powered Academic Platform',
  description: 'The most advanced AI-powered study platform for college and university students. Notes, PYQs, AI Tutor, Planner – all in one secure place.',
  keywords: 'study aid, AI tutor, college notes, PYQs, study planner, academic platform, student productivity',
  authors: [{ name: 'Study Aid Team' }],
  openGraph: {
    title: 'Study Aid – AI Powered Academic Platform',
    description: 'Study smarter. Achieve more. India\'s #1 AI academic platform.',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" className="dark">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        </head>
        <body className="antialiased">
          {children}
          <FeedbackButton />
        </body>
      </html>
    </ClerkProvider>
  );
}
