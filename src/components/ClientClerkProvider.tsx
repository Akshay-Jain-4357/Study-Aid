'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useState, useEffect } from 'react';

export default function ClientClerkProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Read initial theme
    setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
    
    // Listen for theme changes on html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);
  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === 'dark' ? dark : undefined,
        variables: {
          colorPrimary: '#E8A832',
          colorBackground: theme === 'dark' ? '#111114' : '#FFFFFF',
          colorInputBackground: theme === 'dark' ? '#1F1F25' : '#F5F5F0',
          colorInputText: theme === 'dark' ? '#EAEAF0' : '#0A0A0C',
          colorText: theme === 'dark' ? '#EAEAF0' : '#0A0A0C',
          colorTextSecondary: theme === 'dark' ? '#A8A8C0' : '#52526B',
          borderRadius: '10px',
          fontFamily: "'Satoshi', 'Inter', system-ui, sans-serif",
        },
        elements: {
          card: {
            backgroundColor: theme === 'dark' ? '#111114' : '#FFFFFF',
            border: `1px solid ${theme === 'dark' ? 'rgba(58, 58, 71, 0.5)' : 'rgba(224, 224, 216, 0.6)'}`,
            borderRadius: '14px',
          },
          headerTitle: {
            color: theme === 'dark' ? '#EAEAF0' : '#0A0A0C',
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontWeight: 400,
            letterSpacing: '-0.03em',
          },
          headerSubtitle: {
            color: theme === 'dark' ? '#A8A8C0' : '#52526B',
          },
          socialButtonsBlockButton: {
            backgroundColor: theme === 'dark' ? '#1F1F25' : '#F5F5F0',
            border: `1px solid ${theme === 'dark' ? 'rgba(58, 58, 71, 0.5)' : 'rgba(224, 224, 216, 0.6)'}`,
            color: theme === 'dark' ? '#EAEAF0' : '#0A0A0C',
          },
          socialButtonsBlockButtonText: {
            color: theme === 'dark' ? '#EAEAF0' : '#0A0A0C',
          },
          dividerText: {
            color: theme === 'dark' ? '#A8A8C0' : '#52526B',
          },
          formFieldLabel: {
            color: theme === 'dark' ? '#A8A8C0' : '#52526B',
          },
          formFieldInput: {
            backgroundColor: theme === 'dark' ? '#1F1F25' : '#FFFFFF',
            color: theme === 'dark' ? '#EAEAF0' : '#0A0A0C',
            border: `1px solid ${theme === 'dark' ? 'rgba(58, 58, 71, 0.5)' : 'rgba(224, 224, 216, 0.6)'}`,
          },
          formButtonPrimary: {
            background: 'linear-gradient(135deg, #E8A832 0%, #F0C060 100%)',
            color: '#0A0A0C',
            fontWeight: 700,
            fontFamily: "'Satoshi', sans-serif",
            borderRadius: '10px',
            boxShadow: theme === 'dark' 
              ? '0 2px 8px rgba(232, 168, 50, 0.25)' 
              : '0 2px 8px rgba(200, 136, 32, 0.2)',
          },
          footerActionLink: {
            color: theme === 'dark' ? '#E8A832' : '#C88820',
          },
          footerActionText: {
            color: theme === 'dark' ? '#A8A8C0' : '#52526B',
          },
          identityPreviewEditButton: {
            color: theme === 'dark' ? '#E8A832' : '#C88820',
          },
          identityPreviewText: {
            color: theme === 'dark' ? '#EAEAF0' : '#0A0A0C',
          },
          userButtonPopoverCard: {
            backgroundColor: theme === 'dark' ? '#111114' : '#FFFFFF',
            border: `1px solid ${theme === 'dark' ? 'rgba(58, 58, 71, 0.5)' : 'rgba(224, 224, 216, 0.6)'}`,
          },
          userButtonPopoverActionButton: {
            color: theme === 'dark' ? '#EAEAF0' : '#0A0A0C',
          },
          userButtonPopoverActionButtonText: {
            color: theme === 'dark' ? '#EAEAF0' : '#0A0A0C',
          },
          userButtonPopoverActionButtonIcon: {
            color: theme === 'dark' ? '#A8A8C0' : '#52526B',
          },
          userPreviewMainIdentifier: {
            color: theme === 'dark' ? '#EAEAF0' : '#0A0A0C',
          },
          userPreviewSecondaryIdentifier: {
            color: theme === 'dark' ? '#A8A8C0' : '#52526B',
          },
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
