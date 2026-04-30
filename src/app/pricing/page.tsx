'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle, Zap, ArrowRight, Shield, Star, Crown } from 'lucide-react';
import { useAuth, UserButton } from '@clerk/nextjs';

const PLANS = [
  {
    id: 'free', name: 'Free', price: 0, annual: 0, period: '/month',
    desc: 'Best for getting started', icon: '🎓',
    color: '#475569', border: 'rgba(71,85,105,0.3)',
    features: [
      '5 Note uploads/month', '10 AI Tutor queries/day', 'Basic Study Planner',
      'Community Access', '5GB Storage', 'Basic Analytics',
    ],
  },
  {
    id: 'pro', name: 'Pro', price: 99, annual: 799, period: '/month',
    desc: 'For serious academic achievers', icon: '⚡',
    color: '#6366f1', border: 'rgba(99,102,241,0.5)',
    popular: true,
    features: [
      'Unlimited Note uploads', 'Unlimited AI Tutor', 'Advanced Performance Analytics',
      '50GB Secure Storage', 'Full PYQ Database Access', 'Priority Support (2hr SLA)',
      'Study Collaboration Rooms', 'Offline Study Mode', 'Custom Study Plans',
    ],
  },
  {
    id: 'elite', name: 'Elite', price: 299, annual: 2399, period: '/month',
    desc: 'For top rankers & institutions', icon: '👑',
    color: '#f59e0b', border: 'rgba(245,158,11,0.5)',
    features: [
      'Everything in Pro', 'Personal AI Mentor (Dedicated)',
      'Study War Room (Private)', 'DRM-Protected PDF Streaming',
      '200GB Secure Storage', 'Screenshot Detection', 'Campus Ambassador Access',
      'Exclusive Elite Resources', 'AI Career Roadmap', '1-on-1 Doubt Solving',
    ],
  },
];

const FAQS = [
  { q: 'Can I cancel anytime?', a: 'Yes! You can cancel your subscription at any time. Your access continues until the end of your billing period.' },
  { q: 'Is there a student discount?', a: 'Verify your student email (.edu) and get 20% off on Pro and Elite plans.' },
  { q: 'How secure is my data?', a: 'We use AES-256 encryption, JWT auth, and ISO 27001 certified infrastructure. Your notes are only visible to you.' },
  { q: 'Can I download notes for offline use?', a: 'Free and Pro users can download standard notes. Elite users get DRM-protected stream-only PDFs.' },
  { q: 'Is there a free trial for Pro?', a: 'Yes! Start with a 7-day free Pro trial. No credit card required.' },
];

export default function PricingPage() {
  const { isLoaded, userId } = useAuth();
  const isSignedIn = isLoaded && !!userId;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b bg-black/80 backdrop-blur-md border-white/10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
              <ArrowRight size={16} className="rotate-180" /> Back to Home
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            {!isSignedIn ? (
              <>
                <Link href="/auth/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Sign In</Link>
                <Link href="/auth/signup" className="text-sm font-medium bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">Get Started</Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className="text-sm font-medium bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">Go to Dashboard</Link>
                <div className="border-l border-white/10 pl-4 h-6 flex items-center">
                  <UserButton appearance={{ elements: { avatarBox: "w-8 h-8 rounded-md" } }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-32">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <span className="badge badge-warning mb-4">Transparent Pricing</span>
          <h1 className="text-5xl font-black mb-4" style={{ fontFamily: 'Outfit' }}>
            Choose Your <span className="gradient-text">Study Plan</span>
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Start free, upgrade when you&apos;re ready. No hidden fees. Cancel anytime.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="relative glass-card p-8"
              style={{
                borderColor: plan.border,
                boxShadow: plan.popular ? `0 0 50px ${plan.color}20` : undefined,
              }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="badge badge-primary px-5 py-1.5 text-xs">⚡ Most Popular</span>
                </div>
              )}

              <div className="text-3xl mb-4">{plan.icon}</div>
              <h2 className="text-2xl font-bold mb-1">{plan.name}</h2>
              <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>{plan.desc}</p>

              <div className="flex items-end gap-1 mb-2">
                <span className="text-5xl font-black" style={{ color: plan.color, fontFamily: 'Outfit' }}>
                  {plan.price === 0 ? 'Free' : `₹${plan.price}`}
                </span>
                {plan.price > 0 && <span className="text-sm pb-1.5" style={{ color: 'var(--text-muted)' }}>/mo</span>}
              </div>
              {plan.annual > 0 && (
                <p className="text-xs mb-6" style={{ color: '#10b981' }}>
                  Save ₹{plan.price * 12 - plan.annual} · ₹{plan.annual}/year billed annually
                </p>
              )}

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <CheckCircle size={15} className="flex-shrink-0 mt-0.5" style={{ color: plan.color }} />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/auth/signup"
                className="block text-center w-full py-3 px-6 rounded-xl font-bold text-sm transition-all hover:-translate-y-1"
                style={{
                  background: plan.popular ? 'var(--gradient-primary)' : `${plan.color}18`,
                  color: plan.popular ? 'white' : plan.color,
                  border: `1px solid ${plan.border}`,
                  boxShadow: plan.popular ? `0 8px 30px ${plan.color}40` : undefined,
                }}
              >
                {plan.price === 0 ? 'Start Free — No CC Needed' : `Start ${plan.name} Plan`}
              </Link>

              {plan.popular && (
                <p className="text-center text-xs mt-3" style={{ color: 'var(--text-muted)' }}>7-day free trial included</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Feature comparison */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="glass-card overflow-x-auto mb-16">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <th className="p-4 text-left font-semibold">Feature</th>
                <th className="p-4 text-center">Free</th>
                <th className="p-4 text-center" style={{ color: '#a5b4fc' }}>Pro</th>
                <th className="p-4 text-center" style={{ color: '#fcd34d' }}>Elite</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['AI Tutor Access', '10/day', 'Unlimited', 'Unlimited + Mentor'],
                ['Note Storage', '5GB', '50GB', '200GB'],
                ['PYQ Database', '—', '✅ Full Access', '✅ Full Access'],
                ['Collaboration', '—', '✅', '✅ War Room'],
                ['DRM PDF Streaming', '—', '—', '✅'],
                ['Analytics', 'Basic', 'Advanced', 'AI-Powered'],
                ['Support', 'Community', '2hr response', 'Priority 24/7'],
                ['AI Study Roadmap', '—', '✅', '✅ Personalized'],
              ].map(([feature, free, pro, elite]) => (
                <tr key={feature} className="border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                  <td className="p-4 font-medium">{feature}</td>
                  <td className="p-4 text-center" style={{ color: free === '—' ? 'var(--text-muted)' : 'var(--text-secondary)' }}>{free}</td>
                  <td className="p-4 text-center" style={{ color: pro === '—' ? 'var(--text-muted)' : '#a5b4fc' }}>{pro}</td>
                  <td className="p-4 text-center" style={{ color: elite === '—' ? 'var(--text-muted)' : '#fcd34d' }}>{elite}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* FAQs */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-8" style={{ fontFamily: 'Outfit' }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 + i * 0.06 }}
                className="glass-card p-5">
                <h4 className="font-semibold mb-2">{faq.q}</h4>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}
          className="text-center">
          <div className="inline-flex items-center gap-2 text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
            <Shield size={14} />
            30-day money-back guarantee · Cancel any time · No questions asked
          </div>
          <div>
            <Link href="/auth/signup" className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4">
              Start Learning Today <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
