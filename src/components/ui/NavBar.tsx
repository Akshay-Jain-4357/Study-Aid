'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth, UserButton } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../ThemeToggle';

const NAV_LINKS = [
  { label: 'Features', href: '/#features' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoaded, userId } = useAuth();
  const isSignedIn = isLoaded && !!userId;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          background: scrolled ? 'rgba(10, 10, 12, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
          transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
        }}
      >
        <div style={{
          maxWidth: '1240px',
          width: '100%',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              color: 'var(--text-primary)',
            }}
          >
            {/* Logo mark — stylized "S" */}
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(135deg, #E8A832 0%, #F0C060 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Instrument Serif', serif",
              fontSize: '18px',
              fontWeight: 400,
              color: '#0A0A0C',
              letterSpacing: '-0.02em',
            }}>
              S
            </div>
            <span style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 700,
              fontSize: '1.0625rem',
              letterSpacing: '-0.02em',
            }}>
              StudyAid
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
            className="hidden md:flex"
          >
            {NAV_LINKS.map((link) => (
              <NavLink key={link.label} href={link.href} label={link.label} />
            ))}
            {isSignedIn && (
              <NavLink href="/dashboard" label="Dashboard" />
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: '16px' }}>
            <ThemeToggle />
            {!isSignedIn ? (
              <>
                <Link
                  href="/auth/login"
                  style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: '#0A0A0C',
                    textDecoration: 'none',
                    background: 'linear-gradient(135deg, #E8A832 0%, #F0C060 100%)',
                    padding: '0.5rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: '0 2px 8px rgba(232, 168, 50, 0.25)',
                    transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-amber-glow)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(232, 168, 50, 0.25)';
                  }}
                >
                  Get Started
                </Link>
              </>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Link
                  href="/dashboard"
                  style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: '#0A0A0C',
                    textDecoration: 'none',
                    background: 'linear-gradient(135deg, #E8A832 0%, #F0C060 100%)',
                    padding: '0.5rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  Dashboard
                </Link>
                <div style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: '16px', height: '24px', display: 'flex', alignItems: 'center' }}>
                  <UserButton appearance={{ elements: { avatarBox: 'w-8 h-8 rounded-md' } }} />
                </div>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              style={{ display: 'block', width: '22px', height: '2px', background: 'var(--text-primary)', borderRadius: '1px' }}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.15 }}
              style={{ display: 'block', width: '22px', height: '2px', background: 'var(--text-primary)', borderRadius: '1px' }}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              style={{ display: 'block', width: '22px', height: '2px', background: 'var(--text-primary)', borderRadius: '1px' }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: 'rgba(10, 10, 12, 0.97)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '32px',
              paddingTop: '80px',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: '2rem',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--amber-500)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {isSignedIn && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.08, duration: 0.4 }}
              >
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: '2rem',
                    color: 'var(--amber-500)',
                    textDecoration: 'none',
                  }}
                >
                  Dashboard
                </Link>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (NAV_LINKS.length + 1) * 0.08 }}
              style={{ marginTop: '16px' }}
            >
              {!isSignedIn ? (
                <Link
                  href="/auth/signup"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#0A0A0C',
                    textDecoration: 'none',
                    background: 'linear-gradient(135deg, #E8A832 0%, #F0C060 100%)',
                    padding: '0.75rem 2rem',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  Get Started Free
                </Link>
              ) : null}
            </motion.div>
            
            <div style={{ marginTop: '32px' }}>
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* Individual nav link with underline-draw hover */
function NavLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      style={{
        fontFamily: "'Satoshi', sans-serif",
        fontSize: '0.875rem',
        fontWeight: 500,
        color: hovered ? 'var(--text-primary)' : 'var(--text-secondary)',
        textDecoration: 'none',
        position: 'relative',
        paddingBottom: '2px',
        transition: 'color 0.2s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
      {/* Animated underline */}
      <motion.span
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '1px',
          background: 'var(--amber-500)',
        }}
        initial={{ width: '0%' }}
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
    </Link>
  );
}
