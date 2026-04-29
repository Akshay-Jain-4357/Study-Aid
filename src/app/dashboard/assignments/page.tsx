'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Clock, Plus, Filter, X, Calendar } from 'lucide-react';
import { mockAssignments } from '@/lib/mockData';
import { formatDate } from '@/lib/utils';
import type { Assignment } from '@/lib/types';

const STATUS_CONFIG = {
  pending: { label: 'Pending', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', icon: Clock },
  submitted: { label: 'Submitted', color: '#10b981', bg: 'rgba(16,185,129,0.12)', icon: CheckCircle },
  graded: { label: 'Graded', color: '#6366f1', bg: 'rgba(99,102,241,0.12)', icon: CheckCircle },
  overdue: { label: 'Overdue', color: '#ef4444', bg: 'rgba(239,68,68,0.12)', icon: AlertCircle },
};

const PRIORITY_CONFIG = {
  high: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
  medium: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  low: { color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
};

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);

  const filtered = filterStatus === 'all' ? assignments : assignments.filter(a => a.status === filterStatus);
  const counts = {
    all: assignments.length,
    pending: assignments.filter(a => a.status === 'pending').length,
    submitted: assignments.filter(a => a.status === 'submitted').length,
    overdue: assignments.filter(a => a.status === 'overdue').length,
  };

  const markDone = (id: string) => {
    setAssignments(prev => prev.map(a => a.id === id ? { ...a, status: 'submitted' as const } : a));
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold mb-1">Assignments</h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Track deadlines, submissions & grades</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2 self-start">
          <Plus size={16} /> Add Assignment
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: counts.all, color: '#6366f1' },
          { label: 'Pending', value: counts.pending, color: '#f59e0b' },
          { label: 'Submitted', value: counts.submitted, color: '#10b981' },
          { label: 'Overdue', value: counts.overdue, color: '#ef4444' },
        ].map((s) => (
          <div key={s.label} className="stat-card text-center cursor-pointer" onClick={() => setFilterStatus(s.label.toLowerCase())}>
            <div className="text-3xl font-black mb-1" style={{ color: s.color, fontFamily: 'Outfit' }}>{s.value}</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Filter Pills */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}
        className="flex gap-2 flex-wrap">
        {['all', 'pending', 'submitted', 'overdue'].map((s) => (
          <button key={s} onClick={() => setFilterStatus(s)}
            className="px-4 py-1.5 rounded-lg text-sm capitalize font-medium transition-all"
            style={{
              background: filterStatus === s ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${filterStatus === s ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.08)'}`,
              color: filterStatus === s ? '#a5b4fc' : 'var(--text-muted)',
            }}>
            {s} {s === 'all' ? `(${counts.all})` : ''}
          </button>
        ))}
      </motion.div>

      {/* List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((a, i) => {
            const status = STATUS_CONFIG[a.status];
            const priority = PRIORITY_CONFIG[a.priority];
            const StatusIcon = status.icon;
            const daysLeft = Math.ceil((new Date(a.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

            return (
              <motion.div
                key={a.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-4 flex items-start gap-4"
              >
                <StatusIcon size={20} style={{ color: status.color, flexShrink: 0, marginTop: 2 }} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h4 className="font-semibold text-sm">{a.title}</h4>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold capitalize"
                        style={{ background: priority.bg, color: priority.color }}>
                        {a.priority}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{ background: status.bg, color: status.color }}>
                        {status.label}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <span>{a.subject}</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={11} /> {formatDate(a.dueDate)}
                    </span>
                    <span style={{ color: daysLeft < 0 ? '#ef4444' : daysLeft <= 2 ? '#f59e0b' : 'var(--text-muted)' }}>
                      {daysLeft < 0 ? `${Math.abs(daysLeft)}d overdue` : daysLeft === 0 ? 'Due today' : `${daysLeft}d left`}
                    </span>
                  </div>
                </div>

                {a.status === 'pending' && (
                  <button onClick={() => markDone(a.id)} className="flex-shrink-0 text-xs px-3 py-1.5 rounded-lg font-medium transition-all hover:bg-emerald-500/20"
                    style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981', border: '1px solid rgba(16,185,129,0.25)' }}>
                    Mark Done
                  </button>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Add Assignment Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
            onClick={() => setShowModal(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="glass-card p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold">Add New Assignment</h3>
                <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-white/10"><X size={16} /></button>
              </div>
              <div className="space-y-4">
                <div><label className="form-label">Title</label><input className="input-field" placeholder="Assignment title..." /></div>
                <div><label className="form-label">Subject</label><input className="input-field" placeholder="e.g. Data Structures" /></div>
                <div><label className="form-label">Due Date</label><input type="date" className="input-field" /></div>
                <div>
                  <label className="form-label">Priority</label>
                  <div className="flex gap-2">
                    {['low', 'medium', 'high'].map(p => (
                      <button key={p} className="flex-1 py-2 rounded-xl text-sm capitalize font-medium"
                        style={{ background: PRIORITY_CONFIG[p as keyof typeof PRIORITY_CONFIG].bg, color: PRIORITY_CONFIG[p as keyof typeof PRIORITY_CONFIG].color, border: '1px solid rgba(255,255,255,0.08)' }}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <button className="btn-primary w-full" onClick={() => setShowModal(false)}>Add Assignment</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
