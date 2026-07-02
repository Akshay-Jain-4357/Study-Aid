'use client';

import { motion } from 'framer-motion';
import NavBar from '@/components/ui/NavBar';
import Footer from '@/components/ui/Footer';

const TEAM = [
  {
    name: 'The Builder',
    role: 'Engineering & Design',
    bio: 'Full-stack engineer with a passion for education technology. Built Study Aid from a personal frustration with fragmented study tools during engineering exams.',
    accent: '#E8A832',
    initial: 'B',
  },
  {
    name: 'The AI Mind',
    role: 'Machine Learning & AI',
    bio: 'Specializes in RAG systems and semantic search. Designed the AI Tutor engine that reads and understands students\' actual course materials.',
    accent: '#2DD4A8',
    initial: 'A',
  },
  {
    name: 'The Strategist',
    role: 'Product & Growth',
    bio: 'Former campus ambassador turned product thinker. Ensures Study Aid solves real problems for real students, not just hypothetical use cases.',
    accent: '#38BDF8',
    initial: 'S',
  },
];

const VALUES = [
  {
    title: 'Privacy by Default',
    description: 'Your notes are encrypted end-to-end. We can\'t read them, and we never will. No data mining, no selling to third parties. Your study material is yours alone.',
    number: '01',
  },
  {
    title: 'Built for India',
    description: 'Designed for the academic reality of Indian colleges — PYQs, semester patterns, assignment deadlines, and the unique pressure of competitive exams.',
    number: '02',
  },
  {
    title: 'Substance Over Surface',
    description: 'We don\'t ship features for marketing slides. Every feature exists because a student asked for it, tested it, and confirmed it helped them study better.',
    number: '03',
  },
];

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      <NavBar />

      {/* Hero */}
      <section style={{ paddingTop: '160px', paddingBottom: '80px', padding: '160px 24px 80px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: '0.6875rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--amber-500)',
              marginBottom: '20px',
            }}>
              About Study Aid
            </p>
            <h1 style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 400,
              letterSpacing: '-0.035em',
              lineHeight: 1.1,
              color: 'var(--text-primary)',
              marginBottom: '24px',
            }}>
              We believe studying should be{' '}
              <span style={{
                background: 'linear-gradient(135deg, #E8A832 0%, #2DD4A8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                effortless
              </span>, not exhausting.
            </h1>
            <p style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: '1.125rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              maxWidth: '620px',
            }}>
              Study Aid was born from a simple frustration: why do students need 6+ apps just to study? 
              We built one platform that replaces them all — with AI that actually reads your notes, 
              a planner that adapts to your schedule, and analytics that show what works.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section style={{
        padding: '80px 24px',
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-surface)',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div style={{
              borderLeft: '3px solid var(--amber-500)',
              paddingLeft: '24px',
              marginBottom: '40px',
            }}>
              <p style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: '1.5rem',
                fontWeight: 400,
                fontStyle: 'italic',
                lineHeight: 1.5,
                color: 'var(--text-primary)',
              }}>
                "The night before my DBMS exam, I had notes in three different apps, 
                ChatGPT open for doubts, and a calendar I hadn't checked in weeks. 
                I thought — there has to be a better way."
              </p>
            </div>

            <p style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: '1.0625rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              marginBottom: '20px',
            }}>
              That frustration became Study Aid. We started building in a hostel room during final semester, 
              and now thousands of students across India use it daily. Not because of flashy marketing — 
              because it actually saves them time.
            </p>
            <p style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: '1.0625rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
            }}>
              Our AI doesn't generate generic answers from the internet. It reads YOUR uploaded documents 
              and answers questions grounded in YOUR actual course material. That's the difference between 
              a general chatbot and a personal tutor.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '120px 24px', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: '64px' }}
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
              What We Stand For
            </p>
            <h2 style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: 'clamp(2rem, 3vw, 2.5rem)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              color: 'var(--text-primary)',
            }}>
              Our principles.
            </h2>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {VALUES.map((value, i) => (
              <motion.div
                key={value.number}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '48px 1fr',
                  gap: '24px',
                  padding: '28px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  transition: 'border-color 0.25s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(232,168,50,0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
              >
                <span style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: '1.5rem',
                  color: 'var(--amber-500)',
                  fontWeight: 400,
                  opacity: 0.6,
                }}>
                  {value.number}
                </span>
                <div>
                  <h4 style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '8px',
                    letterSpacing: '-0.015em',
                  }}>
                    {value.title}
                  </h4>
                  <p style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: '0.9375rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                  }}>
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{
        padding: '120px 24px',
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-surface)',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: '64px' }}
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
              The Team
            </p>
            <h2 style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: 'clamp(2rem, 3vw, 2.5rem)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              color: 'var(--text-primary)',
            }}>
              Small team, big ambition.
            </h2>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
            className="team-grid"
          >
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '32px',
                  transition: 'border-color 0.25s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = `${member.accent}30`}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
              >
                {/* Avatar — large initial, not a photo */}
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: 'var(--radius-md)',
                  background: `${member.accent}12`,
                  border: `1px solid ${member.accent}25`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: '2rem',
                  color: member.accent,
                  marginBottom: '20px',
                }}>
                  {member.initial}
                </div>
                <h4 style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '4px',
                  letterSpacing: '-0.015em',
                }}>
                  {member.name}
                </h4>
                <p style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: member.accent,
                  marginBottom: '16px',
                }}>
                  {member.role}
                </p>
                <p style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                }}>
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @media (max-width: 768px) {
          .team-grid {
            grid-template-columns: 1fr !important;
            max-width: 440px !important;
            margin: 0 auto !important;
          }
        }
      `}</style>
    </div>
  );
}
