'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Brain, BookOpen, Target, Clock, ArrowRight, Zap, Calendar, UploadCloud, PlusCircle, Star, AlertCircle
} from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { getGreeting, formatDate } from '@/lib/utils';

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

  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="space-y-6 min-h-[80vh]"
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
            <span className="text-sm font-bold">{data?.stats?.streak || 0} Day Streak</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
            <Star size={14} style={{ color: '#10b981' }} />
            <span className="text-sm font-bold text-emerald-400">XP: {data?.stats?.xp || 0}</span>
          </div>
        </div>
      </motion.div>

      {/* Loading Skeletons */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-white/5 animate-pulse rounded-2xl border border-white/10" />)}
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="h-64 bg-white/5 animate-pulse rounded-2xl border border-white/10" />
              <div className="h-64 bg-white/5 animate-pulse rounded-2xl border border-white/10" />
            </div>
          </motion.div>
        ) : (
          <motion.div key="content" variants={stagger} className="space-y-6">
            {/* KPI Cards */}
            <motion.div variants={fadeIn} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Notes Uploaded', value: notesCount.toString(), unit: 'files', icon: BookOpen, color: '#6366f1', change: 'Your vault', up: true },
                { label: 'Assignments Pending', value: todayTasks.length.toString(), unit: 'tasks', icon: Target, color: '#f59e0b', change: 'Action needed', up: false },
                { label: 'Study Streak', value: (data?.stats?.streak || 0).toString(), unit: 'days', icon: Clock, color: '#10b981', change: 'Keep it up!', up: true },
                { label: 'AI Tutor Queries', value: '∞', unit: '', icon: Brain, color: '#ef4444', change: 'Pro Plan', up: true },
              ].map((kpi) => (
                <div key={kpi.label} className="stat-card">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${kpi.color}20`, border: `1px solid ${kpi.color}30` }}>
                      <kpi.icon size={18} style={{ color: kpi.color }} />
                    </div>
                  </div>
                  <div className="text-2xl font-black mb-1" style={{ color: kpi.color, fontFamily: 'Outfit' }}>
                    {kpi.value}<span className="text-sm font-normal ml-1">{kpi.unit}</span>
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{kpi.label}</div>
                </div>
              ))}
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Notes Vault Widget - Empty State Aware */}
              <motion.div variants={fadeIn} className="glass-card p-6 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold flex items-center gap-2"><BookOpen size={18} className="text-indigo-400"/> Your Latest Notes</h3>
                  <Link href="/dashboard/notes" className="text-xs text-indigo-400 hover:underline flex items-center gap-1">
                    View All <ArrowRight size={12} />
                  </Link>
                </div>
                
                <div className="flex-1 flex flex-col">
                  {data?.notes.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
                      <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center mb-3">
                        <UploadCloud size={24} className="text-indigo-400" />
                      </div>
                      <h4 className="font-bold mb-1">No notes yet</h4>
                      <p className="text-xs text-gray-400 mb-4 max-w-[200px]">Start by uploading your first note to build your personal knowledge vault.</p>
                      <Link href="/dashboard/upload" className="btn-primary text-xs py-2 px-4 rounded-lg flex items-center gap-2">
                        <PlusCircle size={14} /> Upload Notes
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {data?.notes.map((note) => (
                        <Link href={`/dashboard/notes/${note.id}`} key={note.id} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 transition-all">
                          <div>
                            <p className="text-sm font-medium">{note.title}</p>
                            <p className="text-xs text-gray-400">{note.subject} · {formatDate(note.createdAt)}</p>
                          </div>
                          <ArrowRight size={14} className="text-gray-500" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Study Plan Widget - Empty State Aware */}
              <motion.div variants={fadeIn} className="glass-card p-6 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold flex items-center gap-2"><Target size={18} className="text-emerald-400"/> Your Study Plan</h3>
                  <Link href="/dashboard/planner" className="text-xs text-emerald-400 hover:underline flex items-center gap-1">
                    Manage <ArrowRight size={12} />
                  </Link>
                </div>

                <div className="flex-1 flex flex-col">
                  {data?.assignments.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
                      <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mb-3">
                        <Calendar size={24} className="text-emerald-400" />
                      </div>
                      <h4 className="font-bold mb-1">No activity yet</h4>
                      <p className="text-xs text-gray-400 mb-4 max-w-[200px]">Create your first assignment or exam to track your progress.</p>
                      <Link href="/dashboard/planner" className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all text-xs py-2 px-4 rounded-lg flex items-center gap-2 font-medium">
                        <PlusCircle size={14} /> Create Study Plan
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {data?.assignments.map((a) => (
                        <div key={a.id} className="flex items-start gap-3 p-3 rounded-lg border border-white/5 bg-white/[0.02]">
                          {a.status === 'OVERDUE' ? (
                            <AlertCircle size={16} className="text-red-400 mt-0.5 shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded border-2 border-emerald-500/50 mt-0.5 shrink-0" />
                          )}
                          <div>
                            <p className="text-sm font-medium">{a.title}</p>
                            <p className="text-xs text-gray-400">{a.subject} · Due: {formatDate(a.dueDate)}</p>
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
