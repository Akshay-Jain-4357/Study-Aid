'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Sparkles, TrendingUp, AlertCircle, Loader2 } from 'lucide-react';

export default function SmartInsights() {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInsight() {
      try {
        const res = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [
              { role: 'system', content: 'Generate a single, high-impact, one-sentence study tip for a university student. Make it specific and actionable. Keep it under 20 words.' },
              { role: 'user', content: 'Give me a study tip.' }
            ]
          })
        });
        const data = await res.json();
        if (res.ok) {
          setInsight(data.message.content.replace(/^"|"$/g, ''));
        }
      } catch (err) {
        // Silently fail if AI is not configured
      } finally {
        setLoading(false);
      }
    }
    fetchInsight();
  }, []);

  if (loading) return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="glass-card p-4 relative overflow-hidden flex items-center gap-4"
      style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-glass-card)' }}
    >
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(90deg, transparent 0%, var(--bg-hover-light) 50%, transparent 100%)',
        animation: 'shimmer 2s infinite',
      }} />
      <div className="w-10 h-10 rounded-xl bg-white/5 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-2 w-24 bg-white/10 rounded-full" />
        <div className="h-3 w-3/4 bg-white/5 rounded-full" />
      </div>
    </motion.div>
  );

  if (!insight) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 300, damping: 25 }}
      className="glass-surface p-4 relative overflow-hidden group"
      style={{
        background: 'var(--bg-glass-card)',
        borderColor: 'var(--border-teal-subtle)',
      }}
      whileHover={{
        borderColor: 'var(--accent-secondary)',
        boxShadow: 'var(--shadow-teal-glow)',
      }}
    >
      {/* Dynamic Aurora Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: 'var(--gradient-aurora)' }} />

      <div className="flex items-center gap-4 relative z-10">
        <motion.div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'var(--bg-hover-strong)', border: '1px solid var(--border-teal-subtle)' }}
          whileHover={{ rotate: 10, scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <Lightbulb size={18} style={{ color: 'var(--accent-secondary)' }} />
          <motion.div
            className="absolute inset-0 rounded-xl"
            animate={{ boxShadow: ['0 0 0px transparent', '0 0 12px rgba(45,212,168,0.4)', '0 0 0px transparent'] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.15em] font-bold mb-0.5 flex items-center gap-1.5"
            style={{ color: 'var(--accent-secondary)' }}>
            <Sparkles size={10} />
            AI Insight
          </p>
          <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--text-primary)' }}>
            {insight}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
