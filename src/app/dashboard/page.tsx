'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Brain, BookOpen, Target, Clock, TrendingUp, ArrowRight, Flame,
  CheckCircle, AlertCircle, Calendar, Zap, BarChart3, Star
} from 'lucide-react';
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';
import { useUser } from '@clerk/nextjs';
import { mockAssignments, mockExams, weeklyStudyData, mockSubjectProgress } from '@/lib/mockData';
import { getGreeting, formatDate } from '@/lib/utils';

const AI_RECOMMENDATIONS = [
  { text: 'You have a Computer Networks exam in 8 days — you are only 40% prepared. Start now.', urgency: 'high', icon: '⚠️' },
  { text: 'You studied DSA for 42hrs but haven\'t touched Networks in 5 days.', urgency: 'medium', icon: '📊' },
  { text: 'Top scorers in your batch spend 2hr/day on active recall. Try our quiz mode!', urgency: 'low', icon: '💡' },
];

const QUICK_ACTIONS = [
  { label: 'AI Tutor', href: '/dashboard/ai-tutor', icon: Brain, color: '#6366f1', desc: 'Ask anything' },
  { label: 'Notes Vault', href: '/dashboard/notes', icon: BookOpen, color: '#8b5cf6', desc: 'Browse & upload' },
  { label: 'Planner', href: '/dashboard/planner', icon: Clock, color: '#06b6d4', desc: 'Manage schedule' },
  { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3, color: '#10b981', desc: 'Track progress' },
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } }
};

export default function DashboardPage() {
  const { user } = useUser();
  const firstName = user?.firstName || 'Student';
  
  const todayTasks = mockAssignments.filter(a => a.status === 'pending').slice(0, 3);
  const upcomingExam = mockExams[0];
  const daysToExam = Math.ceil((new Date(upcomingExam.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Greeting */}
      <motion.div variants={fadeIn} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Outfit' }}>
            {getGreeting()}, {firstName}! 👋
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
            <span className="text-lg">🔥</span>
            <span className="text-sm font-bold">3 Day Streak</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
            <Star size={14} style={{ color: '#10b981' }} />
            <span className="text-sm font-bold text-emerald-400">Sem 5 · CSE</span>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div variants={fadeIn} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Study Hours This Week', value: '31.0', unit: 'hrs', icon: Clock, color: '#6366f1', change: '+12%', up: true },
          { label: 'Assignments Pending', value: todayTasks.length.toString(), unit: '', icon: Target, color: '#f59e0b', change: '2 overdue', up: false },
          { label: 'Next Exam In', value: daysToExam.toString(), unit: 'days', icon: Calendar, color: '#ef4444', change: upcomingExam.subject, up: false },
          { label: 'AI Tutor Queries', value: '∞', unit: '', icon: Brain, color: '#10b981', change: 'Pro Plan', up: true },
        ].map((kpi) => (
          <motion.div key={kpi.label} whileHover={{ y: -3, scale: 1.01 }} className="stat-card">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${kpi.color}20`, border: `1px solid ${kpi.color}30` }}>
                <kpi.icon size={18} style={{ color: kpi.color }} />
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{
                background: kpi.up ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.1)',
                color: kpi.up ? '#10b981' : '#fca5a5',
              }}>
                {kpi.change}
              </span>
            </div>
            <div className="text-2xl font-black mb-1" style={{ color: kpi.color, fontFamily: 'Outfit' }}>
              {kpi.value}<span className="text-sm font-normal ml-1">{kpi.unit}</span>
            </div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{kpi.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Weekly Study Chart */}
        <motion.div variants={fadeIn} className="glass-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold">Weekly Study Hours</h3>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>This week vs last week</p>
            </div>
            <div className="flex items-center gap-1.5 text-sm font-semibold text-emerald-400">
              <TrendingUp size={14} /> +12% this week
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={weeklyStudyData}>
              <defs>
                <linearGradient id="studyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" stroke="#475569" tick={{ fontSize: 12 }} />
              <YAxis stroke="#475569" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ background: '#12121f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 12 }}
                labelStyle={{ color: '#94a3b8' }}
              />
              <Area type="monotone" dataKey="hours" stroke="#6366f1" strokeWidth={2.5} fill="url(#studyGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div variants={fadeIn} className="glass-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.2)' }}>
              <Brain size={16} style={{ color: '#a5b4fc' }} />
            </div>
            <div>
              <h3 className="font-bold text-sm">AI Insights</h3>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Personalized for you</p>
            </div>
          </div>
          <div className="space-y-4">
            {AI_RECOMMENDATIONS.map((rec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.15 }}
                className="flex gap-3 p-3 rounded-xl"
                style={{
                  background: rec.urgency === 'high' ? 'rgba(239,68,68,0.08)' : rec.urgency === 'medium' ? 'rgba(245,158,11,0.08)' : 'rgba(99,102,241,0.08)',
                  border: `1px solid ${rec.urgency === 'high' ? 'rgba(239,68,68,0.2)' : rec.urgency === 'medium' ? 'rgba(245,158,11,0.2)' : 'rgba(99,102,241,0.2)'}`,
                }}
              >
                <span className="text-lg flex-shrink-0">{rec.icon}</span>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{rec.text}</p>
              </motion.div>
            ))}
          </div>
          <Link href="/dashboard/ai-tutor" className="mt-4 flex items-center gap-1.5 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
            <Zap size={14} /> Ask AI Tutor anything <ArrowRight size={13} />
          </Link>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Subject Progress */}
        <motion.div variants={fadeIn} className="glass-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold">Subject Progress</h3>
            <Link href="/dashboard/analytics" className="text-xs text-indigo-400 hover:underline flex items-center gap-1">
              Full Analytics <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-4">
            {mockSubjectProgress.map((s, i) => (
              <motion.div
                key={s.subject}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                    <span className="text-sm font-medium">{s.subject}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.hoursStudied}h studied</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: `${s.color}20`, color: s.color }}>{s.grade}</span>
                    <span className="text-sm font-bold">{s.progress}%</span>
                  </div>
                </div>
                <div className="progress-bar">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${s.progress}%` }}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.8 }}
                    style={{ background: s.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Today's Tasks & Upcoming */}
        <motion.div variants={fadeIn} className="glass-card p-6">
          <h3 className="font-bold mb-5">Today&apos;s Tasks</h3>
          <div className="space-y-3">
            {mockAssignments.slice(0, 4).map((a) => (
              <div key={a.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/4 transition-colors cursor-pointer">
                {a.status === 'submitted' ? (
                  <CheckCircle size={16} style={{ color: '#10b981', marginTop: 2, flexShrink: 0 }} />
                ) : a.status === 'overdue' ? (
                  <AlertCircle size={16} style={{ color: '#ef4444', marginTop: 2, flexShrink: 0 }} />
                ) : (
                  <div className="w-4 h-4 rounded border-2 mt-0.5 flex-shrink-0" style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{a.title}</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {a.subject} · Due {formatDate(a.dueDate)}
                  </div>
                </div>
                <span className={`badge text-xs flex-shrink-0`} style={{
                  background: a.priority === 'high' ? 'rgba(239,68,68,0.15)' : a.priority === 'medium' ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.08)',
                  color: a.priority === 'high' ? '#fca5a5' : a.priority === 'medium' ? '#fcd34d' : 'var(--text-muted)',
                  border: 'none',
                  padding: '2px 8px',
                  font: 'inherit',
                  textTransform: 'none',
                  letterSpacing: 'normal',
                  fontSize: '0.7rem',
                }}>
                  {a.priority}
                </span>
              </div>
            ))}
          </div>
          <Link href="/dashboard/assignments" className="mt-4 text-xs text-indigo-400 hover:underline flex items-center gap-1">
            View all assignments <ArrowRight size={12} />
          </Link>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={fadeIn}>
        <h3 className="font-bold mb-4">Quick Access</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {QUICK_ACTIONS.map((action, i) => (
            <motion.div
              key={action.label}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={action.href}
                className="glass-card p-5 flex flex-col items-center text-center gap-3 group"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110"
                  style={{ background: `${action.color}20`, border: `1px solid ${action.color}30` }}>
                  <action.icon size={22} style={{ color: action.color }} />
                </div>
                <div>
                  <div className="font-semibold text-sm">{action.label}</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{action.desc}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
