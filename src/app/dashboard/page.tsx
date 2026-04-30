'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Brain, BookOpen, Target, Clock, ArrowRight, UploadCloud, PlusCircle, Star, AlertCircle, CheckCircle2, Sparkles
} from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { getGreeting, formatDate } from '@/lib/utils';
import SmartInsights from '@/components/SmartInsights';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } }
};

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
    <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-6 min-h-[80vh]">
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
            <span className="text-sm font-bold">{data?.stats?.streak || 0} Day Streak</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
            <Star size={14} style={{ color: '#10b981' }} />
            <span className="text-sm font-bold text-emerald-400">XP: {data?.stats?.xp || 0}</span>
          </div>
        </div>
      </motion.div>

      {/* AI Dynamic Insight */}
      {!loading && <SmartInsights />}

      {/* Loading Skeletons */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-white/5 animate-pulse rounded-2xl border border-white/10" />)}
            </div>
          </motion.div>
        ) : (
          <motion.div key="content" variants={stagger} className="space-y-6">
            {/* KPI Cards */}
            <motion.div variants={fadeIn} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Notes Uploaded', value: notesCount.toString(), unit: 'files', icon: BookOpen, color: '#6366f1' },
                { label: 'Pending Tasks', value: todayTasks.length.toString(), unit: 'tasks', icon: Target, color: '#f59e0b' },
                { label: 'Study Streak', value: (data?.stats?.streak || 0).toString(), unit: 'days', icon: Clock, color: '#10b981' },
                { label: 'AI Tutor Access', value: 'PRO', unit: '', icon: Brain, color: '#ef4444' },
              ].map((kpi) => (
                <div key={kpi.label} className="stat-card">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${kpi.color}20`, border: `1px solid ${kpi.color}30` }}>
                    <kpi.icon size={18} style={{ color: kpi.color }} />
                  </div>
                  <div className="text-2xl font-black mb-1" style={{ color: kpi.color, fontFamily: 'Outfit' }}>{kpi.value}<span className="text-sm font-normal ml-1">{kpi.unit}</span></div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{kpi.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Getting Started Guide for New Users */}
            {isNewUser && (
              <motion.div variants={fadeIn} className="glass-card p-8 border-indigo-500/30 bg-indigo-500/[0.02]">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-indigo-400">
                  <Sparkles size={20} /> Welcome to your Study Vault
                </h3>
                <p className="text-sm text-gray-400 mb-6">Complete these steps to unlock the full power of your AI academic assistant.</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { title: 'Upload Notes', desc: 'Add your first PDF or DOCX', href: '/dashboard/upload', icon: UploadCloud },
                    { title: 'Set a Goal', desc: 'Create a study assignment', href: '/dashboard/planner', icon: Target },
                    { title: 'Ask AI', desc: 'Try your first AI Tutor query', href: '/dashboard/ai-tutor', icon: Brain },
                  ].map((step, idx) => (
                    <Link href={step.href} key={idx} className="p-4 rounded-xl border border-white/5 bg-black/40 hover:border-indigo-500/40 transition-all group">
                       <step.icon size={20} className="text-indigo-400 mb-3 group-hover:scale-110 transition-transform" />
                       <h4 className="text-sm font-bold mb-1">{step.title}</h4>
                       <p className="text-[11px] text-gray-500">{step.desc}</p>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            <div className="grid lg:grid-cols-2 gap-6">
              <motion.div variants={fadeIn} className="glass-card p-6 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold flex items-center gap-2"><BookOpen size={18} className="text-indigo-400"/> Latest Notes</h3>
                  <Link href="/dashboard/notes" className="text-xs text-indigo-400 hover:underline">View All</Link>
                </div>
                <div className="flex-1">
                  {data?.notes.length === 0 ? (
                    <div className="flex-1 h-32 flex flex-col items-center justify-center text-center border border-dashed border-white/10 rounded-xl">
                      <p className="text-xs text-gray-500">No documents found</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {data?.notes.map((note) => (
                        <div key={note.id} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                          <div>
                            <p className="text-sm font-medium">{note.title}</p>
                            <p className="text-[10px] text-gray-500">{note.subject}</p>
                          </div>
                          <ArrowRight size={14} className="text-gray-600" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="glass-card p-6 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold flex items-center gap-2"><Target size={18} className="text-emerald-400"/> Study Plan</h3>
                  <Link href="/dashboard/planner" className="text-xs text-emerald-400 hover:underline">Manage</Link>
                </div>
                <div className="flex-1">
                  {data?.assignments.length === 0 ? (
                    <div className="flex-1 h-32 flex flex-col items-center justify-center text-center border border-dashed border-white/10 rounded-xl">
                      <p className="text-xs text-gray-500">No active goals</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {data?.assignments.map((a) => (
                        <div key={a.id} className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/[0.02]">
                          <div className="w-4 h-4 rounded border-2 border-emerald-500/30" />
                          <div>
                            <p className="text-sm font-medium">{a.title}</p>
                            <p className="text-[10px] text-gray-500">Due: {formatDate(a.dueDate)}</p>
                          </div>
                        </div>
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
