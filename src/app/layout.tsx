import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs'
import FeedbackButton from '@/components/FeedbackButton';
import ThemeProvider from '@/components/ThemeProvider';
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
    <ClerkProvider appearance={{
      baseTheme: dark,
      variables: {
        colorPrimary: '#E8A832',
        colorBackground: '#111114',
        colorInputBackground: '#1F1F25',
        colorInputText: '#EAEAF0',
        colorText: '#EAEAF0',
        colorTextSecondary: '#A8A8C0',
        borderRadius: '10px',
        fontFamily: "'Satoshi', 'Inter', system-ui, sans-serif",
      },
      elements: {
        card: {
          backgroundColor: '#111114',
          border: '1px solid rgba(58, 58, 71, 0.5)',
          borderRadius: '14px',
        },
        headerTitle: {
          color: '#EAEAF0',
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontWeight: 400,
          letterSpacing: '-0.03em',
        },
        headerSubtitle: {
          color: '#A8A8C0',
        },
        socialButtonsBlockButton: {
          backgroundColor: '#1F1F25',
          border: '1px solid rgba(58, 58, 71, 0.5)',
          color: '#EAEAF0',
        },
        socialButtonsBlockButtonText: {
          color: '#EAEAF0',
        },
        dividerText: {
          color: '#A8A8C0',
        },
        formFieldLabel: {
          color: '#A8A8C0',
        },
        formFieldInput: {
          backgroundColor: '#1F1F25',
          color: '#EAEAF0',
          border: '1px solid rgba(58, 58, 71, 0.5)',
        },
        formButtonPrimary: {
          background: 'linear-gradient(135deg, #E8A832 0%, #F0C060 100%)',
          color: '#0A0A0C',
          fontWeight: 700,
          fontFamily: "'Satoshi', sans-serif",
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(232, 168, 50, 0.25)',
        },
        footerActionLink: {
          color: '#E8A832',
        },
        footerActionText: {
          color: '#A8A8C0',
        },
        identityPreviewEditButton: {
          color: '#E8A832',
        },
        identityPreviewText: {
          color: '#EAEAF0',
        },
        userButtonPopoverCard: {
          backgroundColor: '#111114',
          border: '1px solid rgba(58, 58, 71, 0.5)',
        },
        userButtonPopoverActionButton: {
          color: '#EAEAF0',
        },
        userButtonPopoverActionButtonText: {
          color: '#EAEAF0',
        },
        userButtonPopoverActionButtonIcon: {
          color: '#A8A8C0',
        },
        userPreviewMainIdentifier: {
          color: '#EAEAF0',
        },
        userPreviewSecondaryIdentifier: {
          color: '#A8A8C0',
        },
      },
    }}>
      <html lang="en" data-theme="dark" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
          <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700,800,900&display=swap" rel="stylesheet" />
        </head>
        <body className="antialiased">
          <ThemeProvider>
            {/* Skip to content for accessibility */}
            <a href="#main-content" className="skip-to-content">Skip to content</a>
            {/* Grain texture overlay */}
            <div aria-hidden="true" style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9998,
              pointerEvents: 'none',
              opacity: 0.03,
              mixBlendMode: 'overlay',
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '128px 128px',
            }} />
            <div id="main-content">
              {children}
            </div>
            <FeedbackButton />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
