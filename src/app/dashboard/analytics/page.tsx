'use client';

import { motion } from 'framer-motion';
import { BarChart3, Lock } from 'lucide-react';
import Link from 'next/link';

export default function AnalyticsPage() {
  // Empty state since analytics requires weeks of data to generate
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-1 flex items-center gap-2" style={{ fontFamily: "'Instrument Serif', serif" }}>
            <span className="gradient-text">Performance Analytics</span>
            <BarChart3 size={20} style={{ color: 'var(--amber-500)' }} />
          </h2>
          <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>AI-powered insights into your study habits</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 25 }} className="glass-surface p-12 min-h-[60vh] flex flex-col items-center justify-center text-center rounded-3xl" style={{ background: 'var(--bg-glass-card)', borderColor: 'var(--border-subtle)' }}>
        <div className="w-24 h-24 rounded-[2rem] flex items-center justify-center mb-8 border relative" style={{ background: 'var(--bg-hover)', borderColor: 'var(--border-teal-subtle)' }}>
          <div className="absolute inset-0 bg-teal-500/5 rounded-[2rem] animate-pulse pointer-events-none" />
          <BarChart3 size={40} style={{ color: 'var(--accent-secondary)' }} />
          <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-xl flex items-center justify-center border shadow-lg" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-strong)' }}>
            <Lock size={16} style={{ color: 'var(--text-muted)' }} />
          </div>
        </div>
        <h3 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Instrument Serif', serif", color: 'var(--text-primary)' }}>Not enough data yet</h3>
        <p className="text-sm font-medium max-w-md mx-auto mb-10 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Analytics require at least a few days of active study sessions, assignment completions, and notes interactions to generate meaningful AI insights.
        </p>
        
        <div className="flex gap-4">
          <Link href="/dashboard/upload" className="btn-primary py-3 px-8 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
            Upload Notes
          </Link>
          <Link href="/dashboard/planner" className="py-3 px-8 rounded-xl text-xs font-bold uppercase tracking-wider border shadow-sm hover:scale-105 transition-transform flex items-center gap-2" style={{ background: 'var(--bg-input)', borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}>
            Create Study Plan
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
