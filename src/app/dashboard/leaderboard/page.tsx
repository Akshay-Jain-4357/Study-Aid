'use client';

import { motion } from 'framer-motion';
import { Trophy, Medal, Star, Flame, Crown, TrendingUp, Award, Lock } from 'lucide-react';
import { useUser } from '@clerk/nextjs';

export default function LeaderboardPage() {
  const { user } = useUser();
  const firstName = user?.firstName || 'Student';

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
        <h2 className="text-2xl font-bold mb-1 flex items-center gap-2" style={{ fontFamily: "'Instrument Serif', serif" }}>
          <span className="gradient-text">Global Leaderboard</span>
          <Trophy size={20} style={{ color: 'var(--amber-500)' }} />
        </h2>
        <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Compete with students across the platform · Rankings update daily</p>
      </motion.div>

      {/* Podium - Empty State */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 25 }}
        className="glass-surface p-12 flex flex-col items-center justify-center text-center rounded-3xl" style={{ background: 'var(--bg-glass-card)', borderColor: 'var(--border-subtle)' }}>
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-8 border relative shadow-lg" style={{ background: 'var(--bg-hover-strong)', borderColor: 'var(--border-amber-medium)' }}>
          <div className="absolute inset-0 bg-amber-500/10 rounded-full animate-pulse pointer-events-none" />
           <Trophy size={40} style={{ color: 'var(--amber-500)', opacity: 0.5 }} />
           <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center border shadow-sm" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-strong)' }}>
              <Lock size={16} style={{ color: 'var(--text-muted)' }} />
           </div>
        </div>
        <h3 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Instrument Serif', serif", color: 'var(--text-primary)' }}>Rankings are Calculating</h3>
        <p className="text-sm font-medium max-w-md mx-auto mb-10 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          The global leaderboard resets every 24 hours. Start studying, uploading notes, and completing tasks to earn points and climb the ranks!
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full max-w-2xl">
          <div className="glass-surface p-6 rounded-2xl text-center border transition-transform hover:scale-105" style={{ background: 'var(--bg-input)', borderColor: 'var(--border-strong)' }}>
            <div className="text-3xl font-black mb-1" style={{ color: 'var(--accent-secondary)' }}>0</div>
            <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Your Rank</div>
          </div>
          <div className="glass-surface p-6 rounded-2xl text-center border transition-transform hover:scale-105" style={{ background: 'var(--bg-input)', borderColor: 'var(--border-strong)' }}>
            <div className="text-3xl font-black mb-1" style={{ color: 'var(--accent-primary)' }}>0</div>
            <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>XP Points</div>
          </div>
          <div className="glass-surface p-6 rounded-2xl text-center border transition-transform hover:scale-105 col-span-2 sm:col-span-1" style={{ background: 'var(--bg-input)', borderColor: 'var(--border-strong)' }}>
            <div className="text-3xl font-black mb-1" style={{ color: 'var(--amber-500)' }}>0</div>
            <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Study Streak</div>
          </div>
        </div>
      </motion.div>

      {/* Placeholder Rankings */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="glass-surface overflow-hidden opacity-60 rounded-3xl" style={{ background: 'var(--bg-glass-card)', borderColor: 'var(--border-subtle)' }}>
        <div className="px-6 py-5 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <h3 className="font-bold text-sm uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>Recent Activity</h3>
        </div>
        <div className="p-16 text-center">
           <p className="text-base font-medium italic" style={{ color: 'var(--text-secondary)' }}>"The best way to predict the future is to create it."</p>
           <p className="text-xs font-bold uppercase tracking-wider mt-4" style={{ color: 'var(--text-muted)' }}>— Abraham Lincoln</p>
        </div>
      </motion.div>
    </div>
  );
}
