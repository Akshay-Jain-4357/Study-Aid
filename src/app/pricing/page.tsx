'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useAuth, UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

import NavBar from '@/components/ui/NavBar';
import Footer from '@/components/ui/Footer';

const PLANS = [
  {
    id: 'free', name: 'Starter', price: 0, annual: 0,
    desc: 'Everything you need to get started.',
    accent: 'var(--carbon-400)',
    accentRaw: '#7B7B99',
    features: [
      '5 note uploads per month',
      '10 AI Tutor queries per day',
      'Basic Study Planner',
      '5GB encrypted storage',
      'Community access',
      'Basic analytics',
    ],
  },
  {
    id: 'pro', name: 'Pro', price: 99, annual: 799,
    desc: 'For students who mean business.',
    accent: 'var(--amber-500)',
    accentRaw: '#E8A832',
    popular: true,
    features: [
      'Unlimited note uploads',
      'Unlimited AI Tutor',
      'Advanced performance analytics',
      '50GB encrypted storage',
      'Full PYQ database access',
      'Priority support (2hr SLA)',
      'Study collaboration rooms',
      'Offline study mode',
      'Custom AI study plans',
    ],
  },
  {
    id: 'elite', name: 'Elite', price: 299, annual: 2399,
    desc: 'For top rankers and institutions.',
    accent: 'var(--teal-500)',
    accentRaw: '#2DD4A8',
    features: [
      'Everything in Pro',
      'Personal AI mentor (dedicated)',
      'Private study war room',
      'DRM-protected PDF streaming',
      '200GB encrypted storage',
      'Screenshot detection',
      'Campus ambassador access',
      'Exclusive elite resources',
      'AI career roadmap',
      '1-on-1 doubt solving sessions',
    ],
  },
];

const FAQS = [
  { q: 'Can I cancel anytime?', a: 'Yes. Cancel your subscription at any time from Settings. Your access continues until the end of the current billing period. No hidden fees, no cancellation charges.' },
  { q: 'Is there a student discount?', a: 'Verify your student email (.edu or .ac.in) and get 20% off Pro and Elite plans. The discount applies for as long as your student email is active.' },
  { q: 'How secure is my data?', a: 'All files are encrypted at rest with AES-256 and in transit with TLS 1.3. We use JWT authentication and run on ISO 27001 certified infrastructure. Your notes are only accessible by you.' },
  { q: 'Can I download notes for offline use?', a: 'Pro users can download all their notes for offline access. Elite users additionally get DRM-protected streaming for premium content.' },
  { q: 'Is there a free trial for Pro?', a: 'Yes — start with a 7-day free Pro trial. No credit card required. You can downgrade to Starter at any time.' },
];

export default function PricingPage() {
  const { isLoaded, userId } = useAuth();
  const isSignedIn = isLoaded && !!userId;
  const [loading, setLoading] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const router = useRouter();

  const handleCheckout = async (planId: string) => {
    if (!isSignedIn) {
      router.push('/auth/signup');
      return;
    }

    if (planId === 'free') {
      router.push('/dashboard');
      return;
    }

    setLoading(planId);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      alert('Checkout failed. Please check if your Stripe keys are configured.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      <NavBar />

      {/* Header */}
      <section style={{ paddingTop: '140px', paddingBottom: '60px', textAlign: 'center', padding: '140px 24px 60px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
            Transparent Pricing
          </p>
          <h1 className="gradient-text" style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 'clamp(2.25rem, 4vw, 3.25rem)',
            fontWeight: 400,
            letterSpacing: '-0.035em',
            lineHeight: 1.1,
            marginBottom: '16px',
            display: 'inline-block'
          }}>
            Choose your study plan.
          </h1>
          <p style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: '1.0625rem',
            color: 'var(--text-secondary)',
            maxWidth: '480px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Start free, upgrade when you're ready. No hidden fees. Cancel anytime.
          </p>
        </motion.div>
      </section>

      {/* Pricing cards */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          alignItems: 'start',
        }}
          className="pricing-grid"
        >
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 300, damping: 25 }}
              className={`glass-surface p-8 relative transition-all group hover:scale-[1.02] ${plan.popular ? 'border shadow-2xl scale-[1.02]' : 'border'}`}
              style={{
                background: plan.popular ? 'var(--bg-hover-strong)' : 'var(--bg-glass-card)',
                borderColor: plan.popular ? `${plan.accentRaw}60` : 'var(--border-subtle)',
                borderRadius: 'var(--radius-xl)',
              }}
            >
              {plan.popular && (
                <div className="absolute inset-0 rounded-[var(--radius-xl)] pointer-events-none animate-pulse" style={{ background: `radial-gradient(circle at 50% 0%, ${plan.accentRaw}20 0%, transparent 60%)` }} />
              )}
              {/* Popular badge */}
              {plan.popular && (
                <div className="shadow-lg" style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--gradient-amber)',
                  color: '#0A0A0C',
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: '0.6875rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding: '4px 16px',
                  borderRadius: '99px',
                }}>
                  Most Popular
                </div>
              )}

              {/* Plan name */}
              <h3 style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '4px',
                letterSpacing: '-0.02em',
              }}>
                {plan.name}
              </h3>
              <p style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: '0.8125rem',
                color: 'var(--text-muted)',
                marginBottom: '24px',
              }}>
                {plan.desc}
              </p>

              {/* Price */}
              <div style={{ marginBottom: '28px', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: '3rem',
                  fontWeight: 400,
                  letterSpacing: '-0.03em',
                  color: plan.accentRaw,
                  lineHeight: 1,
                }}>
                  {plan.price === 0 ? 'Free' : `₹${plan.price}`}
                </span>
                {plan.price > 0 && (
                  <span style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                    fontWeight: 500,
                  }}>
                    /month
                  </span>
                )}
              </div>

              {/* Features */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {plan.features.map((f) => (
                  <li key={f} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                  }}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      style={{ flexShrink: 0, marginTop: '2px' }}
                    >
                      <path
                        d="M3 8l3 3 7-7"
                        stroke={plan.accentRaw}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => handleCheckout(plan.id)}
                disabled={!!loading}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: '0.9375rem',
                  fontWeight: 700,
                  cursor: loading ? 'wait' : 'pointer',
                  transition: 'all 0.25s',
                  border: plan.popular ? 'none' : `1px solid ${plan.accentRaw}40`,
                  background: plan.popular
                    ? 'var(--gradient-amber)'
                    : 'transparent',
                  color: plan.popular ? '#0A0A0C' : 'var(--text-primary)',
                  boxShadow: plan.popular ? 'var(--shadow-amber-glow)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                {loading === plan.id ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    style={{ width: '16px', height: '16px', border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%' }}
                  />
                ) : (
                  plan.price === 0 ? 'Start Free' : `Upgrade to ${plan.name}`
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{
        padding: '80px 24px 120px',
        borderTop: '1px solid var(--border-subtle)',
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', marginBottom: '48px' }}
          >
            <h2 style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: '2rem',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              marginBottom: '8px',
            }}>
              Common questions.
            </h2>
            <p style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: '1rem',
              color: 'var(--text-secondary)',
            }}>
              Everything you need to know about Study Aid pricing.
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="glass-surface transition-all"
                style={{
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  borderColor: openFaq === i ? 'var(--border-amber-medium)' : 'var(--border-subtle)',
                  background: openFaq === i ? 'var(--bg-hover)' : 'var(--bg-glass-card)',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%',
                    padding: '18px 20px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    textAlign: 'left',
                  }}
                >
                  {faq.q}
                  <motion.span
                    animate={{ rotate: openFaq === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ fontSize: '1.25rem', color: 'var(--text-muted)', flexShrink: 0, marginLeft: '16px' }}
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{
                        padding: '0 20px 18px',
                        fontFamily: "'Satoshi', sans-serif",
                        fontSize: '0.9375rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.65,
                      }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @media (max-width: 768px) {
          .pricing-grid {
            grid-template-columns: 1fr !important;
            max-width: 440px !important;
          }
        }
      `}</style>
    </div>
  );
}
