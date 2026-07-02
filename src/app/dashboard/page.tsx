'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Brain, BookOpen, Target, Clock, ArrowRight, UploadCloud, Star, Sparkles, Zap, ChevronRight
} from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { getGreeting, formatDate } from '@/lib/utils';
import SmartInsights from '@/components/SmartInsights';

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -4, transition: { duration: 0.3, ease: 'easeOut' as const } },
};

const KPI_COLORS = [
  { gradient: 'linear-gradient(135deg, rgba(232,168,50,0.12), rgba(240,192,96,0.06))', border: 'rgba(232,168,50,0.2)', accent: '#E8A832', glow: 'rgba(232,168,50,0.15)' },
  { gradient: 'linear-gradient(135deg, rgba(45,212,168,0.1), rgba(56,189,248,0.06))', border: 'rgba(45,212,168,0.2)', accent: '#2DD4A8', glow: 'rgba(45,212,168,0.15)' },
  { gradient: 'linear-gradient(135deg, rgba(240,192,96,0.1), rgba(232,168,50,0.06))', border: 'rgba(240,192,96,0.2)', accent: '#F0C060', glow: 'rgba(240,192,96,0.12)' },
  { gradient: 'linear-gradient(135deg, rgba(56,189,248,0.1), rgba(45,212,168,0.06))', border: 'rgba(56,189,248,0.2)', accent: '#38BDF8', glow: 'rgba(56,189,248,0.12)' },
];

function AnimatedCounter({ value, suffix = '' }: { value: string, suffix?: string }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ fontFamily: 'Outfit' }}
    >
      {value}<span className="text-sm font-normal ml-1" style={{ color: 'var(--text-muted)' }}>{suffix}</span>
    </motion.span>
  );
}

export default function DashboardPage() {
  const { user } = useUser();
  const firstName = user?.firstName || 'Student';

  const [data, setData] = useState<{ assignments: any[], notes: any[], stats: any } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/dashboard');
        const json = await res.json();
        if (res.ok) {
          setData(json);
        }
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const todayTasks = data?.assignments.filter(a => a.status === 'PENDING') || [];
  const notesCount = data?.notes.length || 0;
  const isNewUser = notesCount === 0 && todayTasks.length === 0;

  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-8 min-h-[80vh]">
      {/* Greeting Section */}
      <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-1" style={{ fontFamily: "'Instrument Serif', serif" }}>
            <span className="gradient-text">{getGreeting()}, {firstName}!</span>{' '}
            <motion.span
              className="inline-block"
              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
              transition={{ duration: 2.5, delay: 0.5, repeat: Infinity, repeatDelay: 4 }}
            >
              👋
            </motion.span>
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <motion.div
            className="flex items-center gap-2 px-4 py-2 rounded-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(232,168,50,0.1), rgba(240,192,96,0.06))',
              border: '1px solid rgba(232,168,50,0.15)',
            }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(232,168,50,0.12)' }}
          >
            <motion.span
              className="text-lg"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            >
              🔥
            </motion.span>
            <span className="text-sm font-bold">{data?.stats?.streak || 0} Day Streak</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-2 px-4 py-2 rounded-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(45,212,168,0.1), rgba(14,184,134,0.05))',
              border: '1px solid rgba(45,212,168,0.15)',
            }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(45,212,168,0.12)' }}
          >
            <Star size={14} style={{ color: 'var(--accent-success)' }} />
            <span className="text-sm font-bold" style={{ color: 'var(--accent-success)' }}>XP: {data?.stats?.xp || 0}</span>
          </motion.div>
        </div>
      </motion.div>

      {/* AI Dynamic Insight */}
      {!loading && <SmartInsights />}

      {/* Loading Skeletons */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-36 rounded-2xl overflow-hidden relative"
                  style={{ background: 'var(--glass-bg)', border: '1px solid var(--border-subtle)' }}>
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(90deg, transparent 0%, var(--bg-hover) 50%, transparent 100%)',
                    animation: 'shimmer 1.5s infinite',
                  }} />
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="content" variants={stagger} className="space-y-8">
            {/* KPI Cards */}
            <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Notes Uploaded', value: notesCount.toString(), unit: 'files', icon: BookOpen },
                { label: 'Pending Tasks', value: todayTasks.length.toString(), unit: 'tasks', icon: Target },
                { label: 'Study Streak', value: (data?.stats?.streak || 0).toString(), unit: 'days', icon: Clock },
                { label: 'AI Credits', value: data?.stats?.credits || 'PRO', unit: '', icon: Brain },
              ].map((kpi, idx) => (
                <motion.div
                  key={kpi.label}
                  className="stat-card group cursor-default"
                  variants={cardHover}
                  initial="rest"
                  whileHover="hover"
                  style={{
                    background: KPI_COLORS[idx].gradient,
                    borderColor: KPI_COLORS[idx].border,
                  }}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ boxShadow: `0 0 30px ${KPI_COLORS[idx].glow}, inset 0 0 30px ${KPI_COLORS[idx].glow}` }} />

                  <motion.div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 relative z-10"
                    style={{
                      background: `${KPI_COLORS[idx].accent}15`,
                      border: `1px solid ${KPI_COLORS[idx].accent}30`,
                    }}
                    whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                  >
                    <kpi.icon size={20} style={{ color: KPI_COLORS[idx].accent }} />
                  </motion.div>
                  <div className="text-2xl font-black mb-1 relative z-10" style={{ color: KPI_COLORS[idx].accent }}>
                    <AnimatedCounter value={kpi.value} suffix={kpi.unit} />
                  </div>
                  <div className="text-xs font-medium relative z-10" style={{ color: 'var(--text-muted)' }}>{kpi.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Getting Started Guide for New Users */}
            {isNewUser && (
              <motion.div variants={fadeInUp} className="glass-card p-8 relative overflow-hidden"
                style={{
                  borderColor: 'rgba(232,168,50,0.15)',
                  background: 'linear-gradient(135deg, rgba(232,168,50,0.04), rgba(45,212,168,0.02), rgba(56,189,248,0.01))',
                }}>
                {/* Animated background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(232,168,50,0.06) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                  }} />

                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 relative z-10">
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Sparkles size={20} style={{ color: 'var(--accent-primary)' }} />
                  </motion.div>
                  <span className="gradient-text">Welcome to your Study Vault</span>
                </h3>
                <p className="text-sm mb-6 relative z-10" style={{ color: 'var(--text-secondary)' }}>
                  Complete these steps to unlock the full power of your AI academic assistant.
                </p>
                <div className="grid sm:grid-cols-3 gap-4 relative z-10">
                  {[
                    { title: 'Upload Notes', desc: 'Add your first PDF or DOCX', href: '/dashboard/upload', icon: UploadCloud, color: '#E8A832' },
                    { title: 'Set a Goal', desc: 'Create a study assignment', href: '/dashboard/planner', icon: Target, color: '#2DD4A8' },
                    { title: 'Ask AI', desc: 'Try your first AI Tutor query', href: '/dashboard/ai-tutor', icon: Brain, color: '#38BDF8' },
                  ].map((step, idx) => (
                    <motion.div key={idx} whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link href={step.href}
                        className="block p-5 rounded-xl transition-all group"
                        style={{
                          background: 'var(--glass-bg)',
                          border: '1px solid var(--border-subtle)',
                        }}>
                        <motion.div
                          className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                          style={{ background: `${step.color}15`, border: `1px solid ${step.color}25` }}
                          whileHover={{ rotate: 12 }}
                        >
                          <step.icon size={20} style={{ color: step.color }} />
                        </motion.div>
                        <h4 className="text-sm font-bold mb-1 flex items-center gap-1">
                          {step.title}
                          <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" style={{ color: step.color }} />
                        </h4>
                        <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{step.desc}</p>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Content Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Latest Notes */}
              <motion.div variants={fadeInUp} className="glass-card p-6 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(232,168,50,0.1)', border: '1px solid rgba(232,168,50,0.15)' }}>
                      <BookOpen size={16} style={{ color: 'var(--accent-primary)' }} />
                    </div>
                    Latest Notes
                  </h3>
                  <Link href="/dashboard/notes" className="text-xs font-medium flex items-center gap-1 group"
                    style={{ color: 'var(--accent-primary)' }}>
                    View All
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div className="flex-1">
                  {data?.notes.length === 0 ? (
                    <div className="flex-1 h-32 flex flex-col items-center justify-center text-center rounded-xl"
                      style={{
                        border: '1px dashed var(--border-default)',
                        background: 'var(--bg-hover)',
                      }}>
                      <BookOpen size={20} className="mb-2" style={{ color: 'var(--text-muted)' }} />
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>No documents found</p>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {data?.notes.map((note, idx) => (
                        <motion.div
                          key={note.id}
                          className="flex items-center justify-between p-3.5 rounded-xl transition-all cursor-pointer group"
                          style={{
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-subtle)',
                          }}
                          whileHover={{
                            borderColor: 'var(--border-strong)',
                            x: 4,
                          }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                              style={{ background: 'rgba(232,168,50,0.06)', border: '1px solid rgba(232,168,50,0.12)' }}>
                              <BookOpen size={14} style={{ color: 'var(--accent-primary)' }} />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{note.title}</p>
                              <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{note.subject}</p>
                            </div>
                          </div>
                          <ArrowRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                            style={{ color: 'var(--accent-primary)' }} />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Study Plan */}
              <motion.div variants={fadeInUp} className="glass-card p-6 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(45,212,168,0.1)', border: '1px solid rgba(45,212,168,0.15)' }}>
                      <Target size={16} style={{ color: 'var(--accent-success)' }} />
                    </div>
                    Study Plan
                  </h3>
                  <Link href="/dashboard/planner" className="text-xs font-medium flex items-center gap-1 group"
                    style={{ color: 'var(--accent-success)' }}>
                    Manage
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div className="flex-1">
                  {data?.assignments.length === 0 ? (
                    <div className="flex-1 h-32 flex flex-col items-center justify-center text-center rounded-xl"
                      style={{
                        border: '1px dashed var(--border-default)',
                        background: 'var(--bg-hover)',
                      }}>
                      <Target size={20} className="mb-2" style={{ color: 'var(--text-muted)' }} />
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>No active goals</p>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {data?.assignments.map((a, idx) => (
                        <motion.div
                          key={a.id}
                          className="flex items-center gap-3 p-3.5 rounded-xl group transition-all"
                          style={{
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-subtle)',
                          }}
                          whileHover={{
                            borderColor: 'var(--border-strong)',
                            x: 4,
                          }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <motion.div
                            className="w-5 h-5 rounded-md flex-shrink-0"
                            style={{
                              border: '2px solid rgba(45,212,168,0.35)',
                              background: 'rgba(45,212,168,0.06)',
                            }}
                            whileHover={{ scale: 1.2, borderColor: 'rgba(45,212,168,0.7)' }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{a.title}</p>
                            <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                              Due: {formatDate(a.dueDate)}
                            </p>
                          </div>
                          <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all"
                            style={{ color: 'var(--accent-success)' }} />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
