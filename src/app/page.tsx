'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useAuth, UserButton } from '@clerk/nextjs';
import { motion, useScroll, useTransform } from 'framer-motion';

import NavBar from '@/components/ui/NavBar';
import Footer from '@/components/ui/Footer';
import HeroCanvas from '@/components/landing/HeroCanvas';
import ProofStrip from '@/components/landing/ProofStrip';
import PipelineSection from '@/components/landing/PipelineSection';
import FeatureShowcase from '@/components/landing/FeatureShowcase';
import DemoPreview from '@/components/landing/DemoPreview';

export default function LandingPage() {
  const { isLoaded, userId } = useAuth();
  const isSignedIn = isLoaded && !!userId;
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      <NavBar />

      {/* ═══════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: 'var(--gradient-hero)',
        }}
      >
        {/* Canvas neural network */}
        <HeroCanvas />

        {/* Gradient overlay to ensure text readability */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(10,10,12,0.3) 0%, rgba(10,10,12,0.7) 70%)',
          zIndex: 1,
          pointerEvents: 'none',
        }} />

        {/* Hero content */}
        <motion.div
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            padding: '0 24px',
            maxWidth: '820px',
            opacity: heroOpacity,
            y: heroY,
            scale: heroScale,
          }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '99px',
              background: 'var(--bg-hover-strong)',
              border: '1px solid var(--border-amber-medium)',
              fontFamily: "'Satoshi', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: 'var(--amber-400)',
              marginBottom: '32px',
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--amber-500)',
                animation: 'pulseGlow 2s ease-in-out infinite',
              }} />
              AI-Powered Academic Platform
            </span>
          </motion.div>

          {/* Headline with staggered reveal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: 'clamp(3rem, 7vw, 5rem)',
              fontWeight: 400,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              color: 'var(--text-primary)',
              marginBottom: '24px',
            }}
          >
            Your study vault,{' '}
            <br className="hidden sm:block" />
            <span className="gradient-text">
              powered by intelligence.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: 'clamp(1rem, 1.5vw, 1.1875rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              maxWidth: '540px',
              margin: '0 auto 40px',
            }}
          >
            Upload your notes. Ask the AI tutor anything. 
            Plan your study schedule. Track your progress.
            One encrypted platform — zero friction.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {!isSignedIn ? (
                <Link
                  href="/auth/signup"
                  className="btn-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: '1rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    padding: '1rem 2.5rem',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-amber-glow)',
                    transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Start Free
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              ) : (
                <Link
                  href="/dashboard"
                  className="btn-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: '1rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    padding: '1rem 2.5rem',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-amber-glow)',
                  }}
                >
                  Go to Dashboard →
                </Link>
              )}

              <Link
                href="#features"
                className="glass-surface"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  padding: '1rem 2.5rem',
                  borderRadius: 'var(--radius-md)',
                  transition: 'border-color 0.2s, background 0.2s',
                  borderColor: 'var(--border-strong)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--amber-500)';
                  e.currentTarget.style.background = 'var(--bg-hover-light)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-strong)';
                  e.currentTarget.style.background = 'var(--bg-glass-card)';
                }}
              >
                See How It Works
              </Link>
            </div>

            <p style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
            }}>
              No credit card required · Free forever plan available
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '20px',
              height: '32px',
              borderRadius: '10px',
              border: '1.5px solid var(--carbon-600)',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '6px',
            }}
          >
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                width: '3px',
                height: '8px',
                borderRadius: '2px',
                background: 'var(--amber-500)',
              }}
            />
          </motion.div>
        </motion.div>
      </section>


      {/* ═══════════════════════════════════════
          PROOF STRIP
          ═══════════════════════════════════════ */}
      <ProofStrip />


      {/* ═══════════════════════════════════════
          PROBLEM STATEMENT
          ═══════════════════════════════════════ */}
      <ProblemSection />


      {/* ═══════════════════════════════════════
          HOW IT WORKS / PIPELINE
          ═══════════════════════════════════════ */}
      <PipelineSection />


      {/* ═══════════════════════════════════════
          FEATURES
          ═══════════════════════════════════════ */}
      <FeatureShowcase />


      {/* ═══════════════════════════════════════
          LIVE DEMO
          ═══════════════════════════════════════ */}
      <DemoPreview />


      {/* ═══════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════ */}
      <Footer />
    </div>
  );
}


/* ═══════════════════════════════════════
   PROBLEM SECTION — Editorial layout
   ═══════════════════════════════════════ */
function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const diagramY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={ref}
      style={{
        padding: '120px 24px',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '7fr 5fr',
        gap: '80px',
        alignItems: 'center',
      }}
        className="problem-grid"
      >
        {/* Pull quote text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: '0.6875rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--amber-500)',
            marginBottom: '24px',
          }}>
            The Problem
          </p>

          <h2 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
            color: 'var(--text-primary)',
            marginBottom: '24px',
          }}>
            Students juggle 6+ apps just to study. 
            <span style={{ color: 'var(--text-muted)' }}>{' '}Notes in Drive, tasks in Notion, flashcards on Anki, AI on ChatGPT, schedules on Google Calendar.</span>
          </h2>

          <div style={{
            borderLeft: '3px solid var(--amber-500)',
            paddingLeft: '20px',
            marginTop: '32px',
          }}>
            <p style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: '1.375rem',
              fontWeight: 400,
              fontStyle: 'italic',
              lineHeight: 1.5,
              color: 'var(--text-primary)',
              marginBottom: '12px',
            }}>
              "I spend more time organizing my study tools than actually studying."
            </p>
            <p style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: '0.8125rem',
              color: 'var(--text-muted)',
              fontWeight: 600,
            }}>
              — Every engineering student, everywhere.
            </p>
          </div>

          <p style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: '1.0625rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            marginTop: '32px',
            maxWidth: '520px',
          }}>
            Study Aid replaces the chaos. One platform with your notes, an AI tutor that actually reads your documents, 
            a smart planner, and analytics to track what works. Encrypted. Fast. Built for focus.
          </p>
        </motion.div>

        {/* Diagram */}
        <motion.div style={{ y: diagramY }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <FragmentedVsUnifiedDiagram />
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .problem-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}

function FragmentedVsUnifiedDiagram() {
  const fragmentedApps = [
    { name: 'Drive', color: '#4285F4' },
    { name: 'Notion', color: '#787878' },
    { name: 'Anki', color: '#2369BD' },
    { name: 'ChatGPT', color: '#10A37F' },
    { name: 'Calendar', color: '#EA4335' },
    { name: 'WhatsApp', color: '#25D366' },
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
    }}>
      {/* Fragmented */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
      }}>
        <div style={{
          fontFamily: "'Satoshi', sans-serif",
          fontSize: '0.6875rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--accent-danger)',
          marginBottom: '16px',
        }}>
          ✕ Before — Fragmented
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
        }}>
          {fragmentedApps.map((app) => (
            <div key={app.name} style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px',
              textAlign: 'center',
              fontFamily: "'Satoshi', sans-serif",
              fontSize: '0.6875rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '6px',
                background: `${app.color}20`,
                border: `1px solid ${app.color}30`,
                margin: '0 auto 6px',
              }} />
              {app.name}
            </div>
          ))}
        </div>
      </div>

      {/* Arrow */}
      <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Unified */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-amber-medium)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        boxShadow: 'var(--shadow-amber-glow)',
      }}>
        <div style={{
          fontFamily: "'Satoshi', sans-serif",
          fontSize: '0.6875rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--amber-500)',
          marginBottom: '16px',
        }}>
          ✓ After — Study Aid
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'var(--bg-hover-light)',
          border: '1px solid var(--border-amber-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--gradient-amber)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Instrument Serif', serif",
            fontSize: '20px',
            color: '#0A0A0C',
            flexShrink: 0,
          }}>S</div>
          <div>
            <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Study Aid
            </div>
            <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Notes · AI Tutor · Planner · Analytics · Collaboration
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
