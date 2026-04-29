'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis
} from 'recharts';
import { TrendingUp, TrendingDown, Brain, Clock, Target, Award, ChevronUp } from 'lucide-react';
import { mockSubjectProgress, weeklyStudyData, mockStudySessions } from '@/lib/mockData';

const FOCUS_DATA = [
  { session: 'Mon AM', focus: 88 }, { session: 'Mon PM', focus: 72 }, { session: 'Tue AM', focus: 91 },
  { session: 'Tue PM', focus: 65 }, { session: 'Wed AM', focus: 85 }, { session: 'Thu AM', focus: 94 },
  { session: 'Thu PM', focus: 78 }, { session: 'Fri AM', focus: 88 }, { session: 'Sat', focus: 79 },
  { session: 'Sun', focus: 82 },
];

const RADAR_DATA = [
  { subject: 'DSA', score: 78 }, { subject: 'ML', score: 62 }, { subject: 'OS', score: 88 },
  { subject: 'Networks', score: 45 }, { subject: 'DBMS', score: 91 }, { subject: 'Maths', score: 67 },
];

const TIME_RANGES = ['7 Days', '30 Days', '3 Months', 'All Time'];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7 Days');

  const totalHours = weeklyStudyData.reduce((a, b) => a + b.hours, 0);
  const avgFocus = Math.round(FOCUS_DATA.reduce((a, b) => a + b.focus, 0) / FOCUS_DATA.length);
  const strongestSubject = mockSubjectProgress.reduce((a, b) => a.progress > b.progress ? a : b);
  const weakestSubject = mockSubjectProgress.reduce((a, b) => a.progress < b.progress ? a : b);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold mb-1">Performance Analytics</h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>AI-powered insights into your study habits</p>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {TIME_RANGES.map((r) => (
            <button key={r} onClick={() => setTimeRange(r)} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                background: timeRange === r ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${timeRange === r ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.08)'}`,
                color: timeRange === r ? '#a5b4fc' : 'var(--text-muted)',
              }}>{r}</button>
          ))}
        </div>
      </motion.div>

      {/* KPI Row */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Study Hours', value: `${totalHours}h`, change: '+12%', icon: Clock, color: '#6366f1', up: true },
          { label: 'Avg Focus Score', value: `${avgFocus}%`, change: '+5pts', icon: Brain, color: '#06b6d4', up: true },
          { label: 'Strongest Subject', value: strongestSubject.subject, change: `${strongestSubject.progress}%`, icon: Award, color: '#10b981', up: true },
          { label: 'Weakest Subject', value: weakestSubject.subject, change: `${weakestSubject.progress}%`, icon: Target, color: '#ef4444', up: false },
        ].map((kpi) => (
          <motion.div key={kpi.label} whileHover={{ y: -3 }} className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${kpi.color}20` }}>
                <kpi.icon size={17} style={{ color: kpi.color }} />
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: kpi.up ? '#10b981' : '#ef4444' }}>
                {kpi.up ? <ChevronUp size={12} /> : <TrendingDown size={12} />}
                {kpi.change}
              </div>
            </div>
            <div className="text-xl font-black mb-1 truncate" style={{ color: kpi.color, fontFamily: 'Outfit' }}>{kpi.value}</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{kpi.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Row 1 */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Daily Hours Bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="glass-card p-6">
          <h3 className="font-bold mb-1">Daily Study Hours</h3>
          <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>This week · {totalHours}h total</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyStudyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" stroke="#475569" tick={{ fontSize: 12 }} />
              <YAxis stroke="#475569" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: '#12121f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 12 }} />
              <Bar dataKey="hours" fill="#6366f1" radius={[6, 6, 0, 0]}>
                {weeklyStudyData.map((_, i) => (
                  <Cell key={i} fill={i === 5 ? '#a5b4fc' : '#6366f1'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Focus Score Line */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass-card p-6">
          <h3 className="font-bold mb-1">Focus Score per Session</h3>
          <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>Higher = more productive</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={FOCUS_DATA}>
              <defs>
                <linearGradient id="focusGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="session" stroke="#475569" tick={{ fontSize: 10 }} />
              <YAxis domain={[40, 100]} stroke="#475569" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: '#12121f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 12 }} />
              <Area type="monotone" dataKey="focus" stroke="#06b6d4" strokeWidth={2} fill="url(#focusGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="glass-card p-6">
          <h3 className="font-bold mb-1">Subject Preparedness</h3>
          <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>Your performance radar</p>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={RADAR_DATA}>
              <PolarGrid stroke="rgba(255,255,255,0.06)" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Radar dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.25} strokeWidth={2} />
              <Tooltip contentStyle={{ background: '#12121f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Subject Progress Details */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="glass-card p-6">
          <h3 className="font-bold mb-5">Subject Breakdown</h3>
          <div className="space-y-4">
            {mockSubjectProgress.map((s, i) => (
              <div key={s.subject}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                    <span className="text-sm font-medium">{s.subject}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span style={{ color: 'var(--text-muted)' }}>{s.hoursStudied}h</span>
                    <span className="font-bold px-2 py-0.5 rounded" style={{ background: `${s.color}20`, color: s.color }}>{s.grade}</span>
                    <span className="font-bold w-8 text-right">{s.progress}%</span>
                  </div>
                </div>
                <div className="progress-bar">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${s.progress}%` }}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.9 }}
                    style={{ background: s.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AI Analysis */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        className="glass-card p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.2)' }}>
            <Brain size={16} style={{ color: '#a5b4fc' }} />
          </div>
          <h3 className="font-bold">AI Performance Analysis</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: '⚠️ Risk Alert', text: 'Computer Networks at 45% preparedness with only 8 days to exam. Increase daily study to 2hr.', color: '#ef4444' },
            { title: '💡 Optimization Tip', text: 'Your focus peaks at 9–11 AM. Schedule your hardest subjects in the morning session.', color: '#f59e0b' },
            { title: '🚀 Achievement Path', text: 'You\'re on track for an A+ in OS and DBMS. Maintain current pace and attempt mock tests.', color: '#10b981' },
          ].map((insight) => (
            <div key={insight.title} className="p-4 rounded-xl" style={{ background: `${insight.color}10`, border: `1px solid ${insight.color}25` }}>
              <div className="font-semibold text-sm mb-2" style={{ color: insight.color }}>{insight.title}</div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{insight.text}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
