'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const STEPS = [
  {
    number: '01',
    title: 'Upload Your Material',
    description: 'Drag and drop PDFs, DOCX files, or images into your secure vault. Everything is encrypted at rest with AES-256 and indexed for instant search.',
    detail: 'Supports PDF, DOCX, PPTX, images, and markdown. No file size limits on Pro.',
    color: '#E8A832',
  },
  {
    number: '02',
    title: 'AI Processes & Indexes',
    description: 'Our semantic engine analyzes your documents — extracting key concepts, building knowledge graphs, and preparing context-aware AI responses.',
    detail: 'Powered by GPT-4 with RAG. Understands tables, diagrams, and mathematical notation.',
    color: '#2DD4A8',
  },
  {
    number: '03',
    title: 'Ask, Learn, Excel',
    description: 'Chat with your documents using the AI Tutor. Get instant answers grounded in your actual course material — not generic internet results.',
    detail: 'Contextual Q&A, summary generation, quiz creation, and concept explanation.',
    color: '#38BDF8',
  },
];

export default function PipelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      style={{
        padding: '120px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Section header */}
      <div style={{ maxWidth: '1240px', margin: '0 auto', marginBottom: '80px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: '0.6875rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--teal-500)',
            marginBottom: '16px',
          }}>
            How It Works
          </p>
          <h2 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            color: 'var(--text-primary)',
            maxWidth: '560px',
          }}>
            From raw material to deep understanding, in three steps.
          </h2>
        </motion.div>
      </div>

      {/* Pipeline steps */}
      <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative' }}>
        {/* Connecting line */}
        <div
          className="hidden md:block"
          style={{
            position: 'absolute',
            top: '60px',
            left: '60px',
            right: '60px',
            height: '1px',
            background: 'linear-gradient(90deg, var(--amber-500), var(--teal-500), var(--accent-info))',
            opacity: 0.15,
            zIndex: 0,
          }}
        />

        {/* Animated progress along line */}
        <motion.div
          className="hidden md:block"
          style={{
            position: 'absolute',
            top: '59px',
            left: '60px',
            height: '3px',
            background: 'linear-gradient(90deg, var(--amber-500), var(--teal-500), var(--accent-info))',
            borderRadius: '2px',
            zIndex: 1,
          }}
          initial={{ width: '0%' }}
          animate={isInView ? { width: 'calc(100% - 120px)' } : { width: '0%' }}
          transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '32px',
          position: 'relative',
          zIndex: 2,
        }}
          className="pipeline-grid"
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative' }}
            >
              {/* Step number circle */}
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: `2px solid ${step.color}`,
                background: 'var(--bg-base)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                position: 'relative',
              }}>
                {/* Glow ring */}
                <div style={{
                  position: 'absolute',
                  inset: '-4px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${step.color}20, transparent)`,
                }} />
                <span style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: step.color,
                  position: 'relative',
                  zIndex: 1,
                }}>
                  {step.number}
                </span>
              </div>

              {/* Card */}
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '28px',
                transition: 'border-color 0.35s, box-shadow 0.35s',
                cursor: 'default',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${step.color}40`;
                  e.currentTarget.style.boxShadow = `0 0 30px ${step.color}12`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <h3 style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '12px',
                  letterSpacing: '-0.02em',
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: '0.9375rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                  marginBottom: '16px',
                }}>
                  {step.description}
                </p>
                <p style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: '0.8125rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.5,
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-subtle)',
                }}>
                  {step.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .pipeline-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
