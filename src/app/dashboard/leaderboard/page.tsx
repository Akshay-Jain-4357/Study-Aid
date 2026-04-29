'use client';

import { motion } from 'framer-motion';
import { Trophy, Medal, Star, Flame, Crown, TrendingUp, Award } from 'lucide-react';

const LEADERBOARD_DATA = [
  { rank: 1, name: 'Priya Sharma', college: 'IIT Delhi', score: 9820, streak: 48, badge: '🏆', hours: 156 },
  { rank: 2, name: 'Rahul Mehta', college: 'IIT Bombay', score: 9240, streak: 35, badge: '🥈', hours: 142 },
  { rank: 3, name: 'Anjali Nair', college: 'NIT Trichy', score: 8975, streak: 29, badge: '🥉', hours: 138 },
  { rank: 4, name: 'Aryan Sharma', college: 'IIT Bombay', score: 8800, streak: 14, badge: '', hours: 127, isYou: true },
  { rank: 5, name: 'Karan Patel', college: 'BITS Pilani', score: 8640, streak: 22, badge: '', hours: 119 },
  { rank: 6, name: 'Sneha Gupta', college: 'VIT Vellore', score: 8320, streak: 18, badge: '', hours: 108 },
  { rank: 7, name: 'Dev Kumar', college: 'IIT Madras', score: 7980, streak: 31, badge: '', hours: 101 },
  { rank: 8, name: 'Mehak Verma', college: 'NIT Warangal', score: 7740, streak: 15, badge: '', hours: 98 },
  { rank: 9, name: 'Harsh Shah', college: 'IIIT Hyderabad', score: 7500, streak: 9, badge: '', hours: 91 },
  { rank: 10, name: 'Ishita Rao', college: 'SRM Chennai', score: 7180, streak: 12, badge: '', hours: 87 },
];

const CATEGORIES = ['Overall', 'CSE', 'Physics', 'Mathematics', 'GATE', 'This Week'];

export default function LeaderboardPage() {
  const top3 = LEADERBOARD_DATA.slice(0, 3);
  const rest = LEADERBOARD_DATA.slice(3);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-xl font-bold mb-1">Leaderboard</h2>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Compete with students across India · Updated every hour</p>
      </motion.div>

      {/* Category Tabs */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.08 }}
        className="flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map((c, i) => (
          <button key={c} className="flex-shrink-0 px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
            style={{
              background: i === 0 ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${i === 0 ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.08)'}`,
              color: i === 0 ? '#a5b4fc' : 'var(--text-muted)',
            }}>{c}</button>
        ))}
      </motion.div>

      {/* Podium */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass-card p-6">
        <h3 className="font-bold text-center mb-8 flex items-center justify-center gap-2">
          <Crown size={18} style={{ color: '#f59e0b' }} /> Top 3 This Month
        </h3>
        <div className="flex items-end justify-center gap-4 mb-6">
          {/* 2nd Place */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-2 flex-1 max-w-[160px]">
            <div className="avatar" style={{ width: 52, height: 52, fontSize: '1.1rem', background: 'linear-gradient(135deg, #94a3b8, #64748b)' }}>
              {top3[1].name[0]}
            </div>
            <div className="text-center">
              <div className="font-bold text-sm">{top3[1].name}</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{top3[1].college}</div>
            </div>
            <div className="w-full flex flex-col items-center justify-end py-4 rounded-xl" style={{ height: 80, background: 'rgba(148,163,184,0.1)', border: '1px solid rgba(148,163,184,0.2)' }}>
              <span className="text-2xl">🥈</span>
              <span className="text-sm font-bold mt-1 gradient-text-cyan">{top3[1].score.toLocaleString()}</span>
            </div>
          </motion.div>

          {/* 1st Place */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="flex flex-col items-center gap-2 flex-1 max-w-[180px]">
            <div className="relative">
              <div className="avatar" style={{ width: 64, height: 64, fontSize: '1.3rem', background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                {top3[0].name[0]}
              </div>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xl">👑</div>
            </div>
            <div className="text-center">
              <div className="font-bold">{top3[0].name}</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{top3[0].college}</div>
            </div>
            <div className="w-full flex flex-col items-center justify-end py-4 rounded-xl" style={{ height: 110, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)' }}>
              <span className="text-3xl">🏆</span>
              <span className="text-lg font-black mt-1" style={{ color: '#f59e0b' }}>{top3[0].score.toLocaleString()}</span>
            </div>
          </motion.div>

          {/* 3rd Place */}
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="flex flex-col items-center gap-2 flex-1 max-w-[160px]">
            <div className="avatar" style={{ width: 52, height: 52, fontSize: '1.1rem', background: 'linear-gradient(135deg, #cd7c2a, #a05c1e)' }}>
              {top3[2].name[0]}
            </div>
            <div className="text-center">
              <div className="font-bold text-sm">{top3[2].name}</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{top3[2].college}</div>
            </div>
            <div className="w-full flex flex-col items-center justify-end py-4 rounded-xl" style={{ height: 65, background: 'rgba(180,112,40,0.1)', border: '1px solid rgba(180,112,40,0.2)' }}>
              <span className="text-xl">🥉</span>
              <span className="text-sm font-bold mt-1" style={{ color: '#cd7c2a' }}>{top3[2].score.toLocaleString()}</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Full Leaderboard */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="glass-card overflow-hidden">
        <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 className="font-bold">Full Rankings</h3>
        </div>
        <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
          {LEADERBOARD_DATA.map((user, i) => (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-white/2"
              style={{
                background: user.isYou ? 'rgba(99,102,241,0.06)' : undefined,
                borderLeft: user.isYou ? '2px solid rgba(99,102,241,0.5)' : '2px solid transparent',
              }}
            >
              <div className="w-8 text-center font-bold text-sm" style={{ color: user.rank <= 3 ? '#f59e0b' : 'var(--text-muted)' }}>
                {user.rank <= 3 ? user.badge || `#${user.rank}` : `#${user.rank}`}
              </div>

              <div className="avatar flex-shrink-0" style={{ width: 36, height: 36, fontSize: '0.75rem' }}>
                {user.name[0]}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{user.name}</span>
                  {user.isYou && <span className="badge badge-primary" style={{ padding: '0 6px', fontSize: '0.65rem' }}>You</span>}
                </div>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{user.college}</span>
              </div>

              <div className="hidden md:flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                <span className="flex items-center gap-1"><Flame size={12} style={{ color: '#f97316' }} />{user.streak}d streak</span>
                <span>{user.hours}h studied</span>
              </div>

              <div className="text-right">
                <div className="font-bold text-sm gradient-text">{user.score.toLocaleString()}</div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>pts</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Your Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="glass-card p-5" style={{ border: '1px solid rgba(99,102,241,0.3)' }}>
        <h3 className="font-bold mb-4">Your Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Global Rank', value: '#4', icon: '🌍', color: '#6366f1' },
            { label: 'Score', value: '8,800', icon: '⭐', color: '#f59e0b' },
            { label: 'Study Streak', value: '14 days', icon: '🔥', color: '#ef4444' },
            { label: 'Total Study Hours', value: '127h', icon: '⏱️', color: '#10b981' },
          ].map((s) => (
            <div key={s.label} className="text-center p-3 rounded-xl" style={{ background: `${s.color}10`, border: `1px solid ${s.color}20` }}>
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-xl font-black" style={{ color: s.color, fontFamily: 'Outfit' }}>{s.value}</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
