'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const FEATURES = [
  {
    title: 'AI Tutor',
    subtitle: 'Your documents, your answers.',
    description: 'Ask any question about your uploaded material and get precise, context-aware answers grounded in your actual course content — not generic internet results. Supports follow-up questions, summaries, and quiz generation.',
    accent: '#E8A832',
    mockup: 'ai-tutor',
    direction: 'left' as const,
  },
  {
    title: 'Notes Vault',
    subtitle: 'Encrypted. Organized. Instant.',
    description: 'Store every PDF, DOCX, and image in an AES-256 encrypted cloud vault. Full-text semantic search finds what you need in milliseconds. Organize by subject, semester, or custom tags.',
    accent: '#2DD4A8',
    mockup: 'notes-vault',
    direction: 'right' as const,
  },
  {
    title: 'Smart Planner',
    subtitle: 'Never miss a deadline.',
    description: 'AI-powered scheduling that adapts to your workload. Automatically prioritizes assignments, tracks due dates, and suggests optimal study blocks based on your past performance patterns.',
    accent: '#38BDF8',
    mockup: 'planner',
    direction: 'left' as const,
  },
  {
    title: 'Performance Analytics',
    subtitle: 'Study smarter, not harder.',
    description: 'Detailed insights into your study habits — time spent per subject, productivity peaks, streak tracking, and AI-generated recommendations to optimize your learning efficiency.',
    accent: '#F0C060',
    mockup: 'analytics',
    direction: 'right' as const,
  },
];

function FeatureItem({
  feature,
  index,
}: {
  feature: typeof FEATURES[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isLeft = feature.direction === 'left';

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: isLeft ? '1fr 1fr' : '1fr 1fr',
        gap: '64px',
        alignItems: 'center',
        padding: '0 24px',
        maxWidth: '1240px',
        margin: '0 auto',
      }}
      className="feature-row"
    >
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ order: isLeft ? 1 : 2 }}
        className="feature-content"
      >
        <div style={{
          fontFamily: "'Satoshi', sans-serif",
          fontSize: '0.6875rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: feature.accent,
          marginBottom: '12px',
        }}>
          0{index + 1}
        </div>
        <h3 style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
          fontWeight: 400,
          letterSpacing: '-0.025em',
          lineHeight: 1.2,
          color: 'var(--text-primary)',
          marginBottom: '8px',
        }}>
          {feature.title}
        </h3>
        <p style={{
          fontFamily: "'Satoshi', sans-serif",
          fontSize: '1rem',
          fontWeight: 600,
          color: feature.accent,
          marginBottom: '16px',
          letterSpacing: '-0.01em',
        }}>
          {feature.subtitle}
        </p>
        <p style={{
          fontFamily: "'Satoshi', sans-serif",
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          maxWidth: '460px',
        }}>
          {feature.description}
        </p>
      </motion.div>

      {/* Mockup / Visual */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 40 : -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{ order: isLeft ? 2 : 1 }}
        className="feature-visual"
      >
        <FeatureMockup accent={feature.accent} type={feature.mockup} />
      </motion.div>
    </div>
  );
}

function FeatureMockup({ accent, type }: { accent: string; type: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        padding: '2px',
        transition: 'border-color 0.35s, box-shadow 0.35s',
        borderColor: hovered ? `${accent}30` : 'var(--border-subtle)',
        boxShadow: hovered ? `0 0 40px ${accent}10` : 'none',
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
        borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
      }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F06070' }} />
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F0C060' }} />
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2DD4A8' }} />
        <div style={{
          marginLeft: '12px',
          flex: 1,
          height: '24px',
          borderRadius: '6px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 10px',
        }}>
          <span style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: '0.6875rem',
            color: 'var(--text-muted)',
          }}>
            studyaid.app/{type}
          </span>
        </div>
      </div>

      {/* Mockup content */}
      <div style={{
        padding: '24px',
        minHeight: '260px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}>
        {type === 'ai-tutor' && <AITutorMockup accent={accent} />}
        {type === 'notes-vault' && <NotesVaultMockup accent={accent} />}
        {type === 'planner' && <PlannerMockup accent={accent} />}
        {type === 'analytics' && <AnalyticsMockup accent={accent} />}
      </div>
    </div>
  );
}

/* Mini mockup internals */
function AITutorMockup({ accent }: { accent: string }) {
  return (
    <>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
        <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: `${accent}20`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>🧑</div>
        <div style={{ background: 'var(--bg-elevated)', borderRadius: '12px 12px 12px 4px', padding: '12px 14px', fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5, fontFamily: "'Satoshi', sans-serif" }}>
          Explain the difference between TCP and UDP protocols from Chapter 4.
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginLeft: 'auto', flexDirection: 'row-reverse' }}>
        <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: `${accent}20`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>✦</div>
        <div style={{ background: `${accent}10`, border: `1px solid ${accent}20`, borderRadius: '12px 12px 4px 12px', padding: '12px 14px', fontSize: '0.8125rem', color: 'var(--text-primary)', lineHeight: 1.6, fontFamily: "'Satoshi', sans-serif", maxWidth: '85%' }}>
          Based on your notes:<br/><strong>TCP</strong> is connection-oriented — it establishes a reliable channel with handshaking. <strong>UDP</strong> is connectionless — faster but no guaranteed delivery...
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
        <div style={{ flex: 1, height: '36px', borderRadius: '10px', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', padding: '0 12px', fontFamily: "'Satoshi', sans-serif", fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Ask a follow-up question...
        </div>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0A0A0C', fontWeight: 700, fontSize: '14px' }}>↑</div>
      </div>
    </>
  );
}

function NotesVaultMockup({ accent }: { accent: string }) {
  const notes = [
    { name: 'Chapter 4 — Networks.pdf', size: '2.4 MB', date: 'Today' },
    { name: 'OS Lecture Notes.docx', size: '890 KB', date: 'Yesterday' },
    { name: 'DBMS Unit 3.pdf', size: '3.1 MB', date: '2 days ago' },
  ];

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>Your Notes</span>
        <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.04em', color: accent, textTransform: 'uppercase' }}>3 files</span>
      </div>
      {notes.map((note, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px',
          borderRadius: '10px', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)',
        }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${accent}12`, border: `1px solid ${accent}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>📄</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>{note.name}</div>
            <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{note.size} · {note.date}</div>
          </div>
        </div>
      ))}
    </>
  );
}

function PlannerMockup({ accent }: { accent: string }) {
  const tasks = [
    { title: 'Complete DBMS Assignment', due: 'Tomorrow', priority: 'High', done: false },
    { title: 'Review OS Chapter 5', due: 'In 3 days', priority: 'Medium', done: false },
    { title: 'Submit Network Lab Report', due: 'Done', priority: '', done: true },
  ];

  return (
    <>
      <div style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '4px' }}>Study Plan</div>
      {tasks.map((task, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px',
          borderRadius: '10px', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)',
          opacity: task.done ? 0.5 : 1,
        }}>
          <div style={{
            width: '18px', height: '18px', borderRadius: '6px',
            border: task.done ? `2px solid ${accent}` : '2px solid var(--carbon-500)',
            background: task.done ? `${accent}` : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '10px', color: '#0A0A0C', fontWeight: 700,
          }}>
            {task.done && '✓'}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: task.done ? 'line-through' : 'none' }}>{task.title}</div>
            <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '0.6875rem', color: task.done ? 'var(--text-muted)' : accent }}>{task.due}{task.priority && ` · ${task.priority}`}</div>
          </div>
        </div>
      ))}
    </>
  );
}

function AnalyticsMockup({ accent }: { accent: string }) {
  const bars = [65, 82, 45, 90, 70, 88, 55];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>Weekly Activity</span>
        <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '0.8125rem', fontWeight: 600, color: accent }}>↑ 23%</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '120px', paddingBottom: '24px', position: 'relative' }}>
        {bars.map((height, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
            <div style={{
              width: '100%', borderRadius: '4px 4px 2px 2px',
              height: `${height}%`,
              background: i === 5 ? accent : `${accent}30`,
              transition: 'height 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }} />
            <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '0.625rem', fontWeight: 600, color: 'var(--text-muted)' }}>{days[i]}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <div style={{ background: 'var(--bg-elevated)', borderRadius: '8px', padding: '10px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '1rem', fontWeight: 800, color: accent }}>12.5h</div>
          <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Total Study</div>
        </div>
        <div style={{ background: 'var(--bg-elevated)', borderRadius: '8px', padding: '10px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '1rem', fontWeight: 800, color: 'var(--teal-500)' }}>7 days</div>
          <div style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Streak</div>
        </div>
      </div>
    </>
  );
}

export default function FeatureShowcase() {
  return (
    <section id="features" style={{ position: 'relative' }}>
      {FEATURES.map((feature, i) => (
        <div
          key={feature.title}
          style={{
            paddingTop: i === 0 ? '120px' : '80px',
            paddingBottom: i === FEATURES.length - 1 ? '120px' : '80px',
            borderTop: i > 0 ? '1px solid var(--border-subtle)' : 'none',
          }}
        >
          <FeatureItem feature={feature} index={i} />
        </div>
      ))}

      <style jsx>{`
        @media (max-width: 768px) {
          :global(.feature-row) {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          :global(.feature-content),
          :global(.feature-visual) {
            order: unset !important;
          }
        }
      `}</style>
    </section>
  );
}
