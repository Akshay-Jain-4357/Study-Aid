'use client';

import Link from 'next/link';

const FOOTER_SECTIONS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/#features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'AI Tutor', href: '/dashboard/ai-tutor' },
      { label: 'Notes Vault', href: '/dashboard/notes' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Refund Policy', href: '/refunds' },
      { label: 'Help Center', href: '/help' },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ position: 'relative', overflow: 'hidden' }}>
      {/* CTA band */}
      <div style={{
        background: 'var(--gradient-card-hover)',
        borderTop: '1px solid var(--border-amber-subtle)',
        padding: '80px 24px',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 400,
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          color: 'var(--text-primary)',
          marginBottom: '16px',
        }}>
          Start studying smarter tonight.
        </h2>
        <p style={{
          fontFamily: "'Satoshi', sans-serif",
          fontSize: '1.0625rem',
          color: 'var(--text-secondary)',
          maxWidth: '480px',
          margin: '0 auto 32px',
          lineHeight: 1.6,
        }}>
          Join thousands of students who replaced chaos with clarity.
          Free forever, upgrade when ready.
        </p>
        <Link
          href="/auth/signup"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: "'Satoshi', sans-serif",
            fontSize: '1rem',
            fontWeight: 700,
            color: '#0A0A0C',
            textDecoration: 'none',
            background: 'linear-gradient(135deg, #E8A832 0%, #F0C060 100%)',
            padding: '0.875rem 2.5rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 4px 16px rgba(232, 168, 50, 0.3)',
            transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-amber-glow)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(232,168,50,0.25)';
          }}
        >
          Create Free Account
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '4px' }}>
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

      {/* Footer body */}
      <div style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-surface)',
        padding: '64px 24px 40px',
      }}>
        <div style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '48px',
        }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: 'var(--radius-sm)',
                background: 'linear-gradient(135deg, #E8A832 0%, #F0C060 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Instrument Serif', serif",
                fontSize: '15px',
                color: '#0A0A0C',
              }}>
                S
              </div>
              <span style={{
                fontFamily: "'Satoshi', sans-serif",
                fontWeight: 700,
                fontSize: '0.9375rem',
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
              }}>
                StudyAid
              </span>
            </div>
            <p style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              lineHeight: 1.65,
              maxWidth: '280px',
              marginBottom: '24px',
            }}>
              The AI-powered academic platform built for focused students.
              Notes, AI tutor, planner, analytics — one place, zero friction.
            </p>
            {/* Social links */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { label: 'X', href: 'https://x.com', icon: '𝕏' },
                { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'in' },
                { label: 'GitHub', href: 'https://github.com', icon: '⌂' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    background: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--amber-500)';
                    e.currentTarget.style.color = 'var(--amber-500)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.color = 'var(--text-muted)';
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h6 style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: '0.6875rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '20px',
              }}>
                {section.title}
              </h6>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{
                        fontFamily: "'Satoshi', sans-serif",
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                        transition: 'color 0.15s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          maxWidth: '1240px',
          margin: '40px auto 0',
          paddingTop: '24px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
          }}>
            © {new Date().getFullYear()} Study Aid. All rights reserved. Built with 🧡 in India.
          </p>
          <p style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
          }}>
            Enterprise-grade infrastructure. Privacy-first architecture.
          </p>
        </div>
      </div>

      {/* Responsive grid override */}
      <style jsx>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
