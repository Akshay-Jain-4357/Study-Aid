'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS = [
  { value: 10000, suffix: '+', label: 'Notes Uploaded' },
  { value: 50, suffix: '+', label: 'Colleges' },
  { value: 99.9, suffix: '%', label: 'Uptime' },
  { value: 4.9, suffix: '/5', label: 'Student Rating' },
];

function AnimatedNumber({ value, suffix, started }: { value: number; suffix: string; started: boolean }) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!started) return;

    const isDecimal = value % 1 !== 0;
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const progress = Math.min(current / steps, 1);
      // Ease out expo
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplayed(isDecimal ? parseFloat((value * eased).toFixed(1)) : Math.round(value * eased));

      if (current >= steps) clearInterval(timer);
    }, stepDuration);

    return () => clearInterval(timer);
  }, [started, value]);

  return (
    <span>
      {displayed.toLocaleString()}{suffix}
    </span>
  );
}

export default function ProofStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div
      ref={ref}
      style={{
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--bg-surface)',
        padding: '40px 24px',
        overflow: 'hidden',
      }}
    >
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '32px',
      }}
        className="proof-grid"
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              textAlign: 'center',
              borderRight: i < STATS.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              padding: '0 16px',
            }}
          >
            <div style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              fontWeight: 400,
              color: 'var(--amber-500)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: '8px',
            }}>
              <AnimatedNumber value={stat.value} suffix={stat.suffix} started={isInView} />
            </div>
            <div style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .proof-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 480px) {
          .proof-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
