'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const EXAMPLE_QUESTIONS = [
  'Explain the OSI model layers from my networking notes',
  'What are the ACID properties in DBMS?',
  'Summarize Chapter 3 — Process Scheduling',
  'Compare merge sort vs quick sort complexity',
];

const SIMULATED_RESPONSE = `Based on your uploaded notes (Chapter 2 — DBMS Fundamentals.pdf):

**ACID Properties** ensure reliable database transactions:

1. **Atomicity** — A transaction is all-or-nothing. If any part fails, the entire transaction rolls back.

2. **Consistency** — The database moves from one valid state to another. Constraints and rules are never violated.

3. **Isolation** — Concurrent transactions don't interfere with each other. Each runs as if it's the only one.

4. **Durability** — Once committed, changes persist even through system failures.

📖 *Source: Page 47, Section 2.3 of your uploaded notes*`;

export default function DemoPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [selectedQ, setSelectedQ] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);

  const handleAsk = (question: string) => {
    setSelectedQ(question);
    setResponse('');
    setTypingComplete(false);
    setLoading(true);

    // Simulate loading
    setTimeout(() => {
      setLoading(false);
      // Type out response
      let i = 0;
      const interval = setInterval(() => {
        if (i < SIMULATED_RESPONSE.length) {
          setResponse(SIMULATED_RESPONSE.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setTypingComplete(true);
        }
      }, 8);
    }, 1500);
  };

  const handleReset = () => {
    setSelectedQ(null);
    setResponse('');
    setLoading(false);
    setTypingComplete(false);
  };

  return (
    <section
      ref={ref}
      style={{
        padding: '120px 24px',
        background: 'var(--bg-gradient-soft)',
        borderTop: '1px solid var(--border-subtle)',
        position: 'relative'
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <p style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: '0.6875rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--amber-500)',
            marginBottom: '16px',
          }}>
            Try It Live
          </p>
          <h2 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            color: 'var(--text-primary)',
            marginBottom: '12px',
          }}>
            Ask your notes anything.
          </h2>
          <p style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: '1.0625rem',
            color: 'var(--text-secondary)',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Click a sample question to see how the AI Tutor responds with answers grounded in your actual documents.
          </p>
        </motion.div>

        {/* Demo container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
          }}
        >
          {/* Window chrome */}
          <div style={{
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'var(--bg-elevated)',
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F06070' }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F0C060' }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2DD4A8' }} />
            <div style={{ marginLeft: '12px', fontFamily: "'Satoshi', sans-serif", fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              AI Tutor — Live Demo
            </div>
          </div>

          {/* Content area */}
          <div style={{ padding: '24px', minHeight: '360px' }}>
            <AnimatePresence mode="wait">
              {!selectedQ ? (
                /* Question selection */
                <motion.div
                  key="questions"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <p style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: '0.8125rem',
                    color: 'var(--text-muted)',
                    marginBottom: '16px',
                  }}>
                    Select a question:
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {EXAMPLE_QUESTIONS.map((q, i) => (
                      <motion.button
                        key={q}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        onClick={() => handleAsk(q)}
                        style={{
                          background: 'var(--bg-elevated)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-md)',
                          padding: '14px 18px',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontFamily: "'Satoshi', sans-serif",
                          fontSize: '0.9375rem',
                          color: 'var(--text-primary)',
                          transition: 'border-color 0.2s, background 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--border-amber-medium)';
                          e.currentTarget.style.background = 'var(--bg-hover-light)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--border-subtle)';
                          e.currentTarget.style.background = 'var(--bg-elevated)';
                        }}
                      >
                        <span style={{ color: 'var(--amber-500)', fontSize: '1rem' }}>→</span>
                        {q}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                /* Chat interaction */
                <motion.div
                  key="chat"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                >
                  {/* User message */}
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '8px',
                      background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '14px', flexShrink: 0,
                    }}>🧑</div>
                    <div style={{
                      background: 'var(--bg-elevated)',
                      borderRadius: '14px 14px 14px 4px',
                      padding: '14px 18px',
                      fontFamily: "'Satoshi', sans-serif",
                      fontSize: '0.9375rem',
                      color: 'var(--text-primary)',
                      lineHeight: 1.5,
                    }}>
                      {selectedQ}
                    </div>
                  </div>

                  {/* AI response */}
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '8px',
                      background: 'var(--bg-hover-strong)', border: '1px solid var(--border-amber-subtle)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '14px', flexShrink: 0, color: 'var(--amber-500)',
                      fontWeight: 700,
                    }}>✦</div>
                    <div style={{
                      background: 'var(--bg-hover-light)',
                      border: '1px solid var(--border-amber-subtle)',
                      borderRadius: '14px 14px 14px 4px',
                      padding: '14px 18px',
                      fontFamily: "'Satoshi', sans-serif",
                      fontSize: '0.9375rem',
                      color: 'var(--text-primary)',
                      lineHeight: 1.7,
                      flex: 1,
                      minHeight: '100px',
                    }}>
                      {loading ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <LoadingDots />
                          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                            Searching your documents...
                          </span>
                        </div>
                      ) : (
                        <div style={{ whiteSpace: 'pre-wrap' }}
                          dangerouslySetInnerHTML={{
                            __html: response
                              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                              .replace(/\n/g, '<br/>')
                          }}
                        />
                      )}
                      {!loading && !typingComplete && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          style={{ display: 'inline-block', width: '2px', height: '16px', background: 'var(--amber-500)', marginLeft: '2px', verticalAlign: 'text-bottom' }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Reset button */}
                  {typingComplete && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '8px' }}
                    >
                      <button
                        onClick={handleReset}
                        style={{
                          fontFamily: "'Satoshi', sans-serif",
                          fontSize: '0.8125rem',
                          fontWeight: 600,
                          color: 'var(--text-secondary)',
                          background: 'var(--bg-elevated)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-md)',
                          padding: '8px 20px',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--amber-500)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                      >
                        ← Try another question
                      </button>
                      <a
                        href="/auth/signup"
                        style={{
                          fontFamily: "'Satoshi', sans-serif",
                          fontSize: '0.8125rem',
                          fontWeight: 700,
                          color: '#0A0A0C',
                          background: 'linear-gradient(135deg, #E8A832 0%, #F0C060 100%)',
                          borderRadius: 'var(--radius-md)',
                          padding: '8px 20px',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        Try with your own notes →
                      </a>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function LoadingDots() {
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--amber-500)',
          }}
        />
      ))}
    </div>
  );
}
