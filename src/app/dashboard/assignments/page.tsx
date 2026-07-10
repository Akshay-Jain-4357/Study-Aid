'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, PlusCircle, Target, Loader2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await fetch('/api/dashboard');
        const json = await res.json();
        if (res.ok) {
          setAssignments(json.assignments || []);
        }
      } catch (err) {
        console.error("Failed to fetch assignments", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-1 flex items-center gap-2" style={{ fontFamily: "'Instrument Serif', serif" }}>
              <span className="gradient-text">Assignments & Tasks</span>
              <Target size={20} style={{ color: 'var(--amber-500)' }} />
            </h2>
            <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Track and manage your study tasks</p>
          </div>
          <button className="btn-primary py-2.5 px-5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:scale-105 transition-transform">
            <PlusCircle size={16} /> New Task
          </button>
        </div>
      </motion.div>

      <div className="glass-surface p-8 min-h-[50vh] flex flex-col rounded-3xl" style={{ background: 'var(--bg-glass-card)', borderColor: 'var(--border-subtle)' }}>
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <Loader2 size={36} className="animate-spin mb-4" style={{ color: 'var(--accent-secondary)' }} />
            <p className="text-sm font-bold uppercase tracking-wider animate-pulse" style={{ color: 'var(--text-muted)' }}>Loading your tasks...</p>
          </div>
        ) : assignments.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border border-dashed rounded-3xl" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-hover-light)' }}>
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-sm border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
              <Target size={36} style={{ color: 'var(--text-muted)' }} />
            </div>
            <h4 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)', fontFamily: "'Instrument Serif', serif" }}>No tasks yet</h4>
            <p className="text-sm font-medium mb-8 max-w-sm" style={{ color: 'var(--text-secondary)' }}>You haven't created any assignments or tasks. Start organizing your study schedule today.</p>
            <button className="btn-primary py-3 px-8 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:scale-105 transition-transform">
              <PlusCircle size={16} /> Create Your First Task
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {assignments.map((a, i) => (
              <motion.div 
                key={a.id} 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 25 }}
                className="flex items-start gap-4 p-5 rounded-2xl border transition-all cursor-pointer group hover:scale-[1.01]" 
                style={{ background: 'var(--bg-input)', borderColor: 'var(--border-strong)' }}
                whileHover={{ borderColor: 'var(--border-teal-subtle)', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              >
                {a.status === 'SUBMITTED' ? (
                  <CheckCircle size={22} className="text-emerald-500 mt-1 shrink-0" />
                ) : a.status === 'OVERDUE' ? (
                  <AlertCircle size={22} className="text-red-500 mt-1 shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-[6px] border-2 mt-1 shrink-0 cursor-pointer transition-colors shadow-inner" style={{ borderColor: 'var(--border-strong)', background: 'var(--bg-card)' }} />
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-base font-bold truncate" style={{ color: 'var(--text-primary)' }}>{a.title}</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider mt-1.5" style={{ color: 'var(--text-muted)' }}>
                    <span style={{ color: 'var(--accent-secondary)' }}>{a.subject}</span> <span className="mx-2 opacity-30">•</span> Due: {formatDate(a.dueDate)}
                  </div>
                </div>
                <span className="text-[10px] font-bold px-3 py-1.5 rounded-lg shrink-0 uppercase tracking-widest border" style={{
                  background: a.priority === 'HIGH' ? 'rgba(239,68,68,0.1)' : a.priority === 'MEDIUM' ? 'rgba(232,168,50,0.1)' : 'var(--bg-hover)',
                  borderColor: a.priority === 'HIGH' ? 'rgba(239,68,68,0.2)' : a.priority === 'MEDIUM' ? 'rgba(232,168,50,0.2)' : 'var(--border-subtle)',
                  color: a.priority === 'HIGH' ? '#ef4444' : a.priority === 'MEDIUM' ? 'var(--amber-500)' : 'var(--text-muted)'
                }}>
                  {a.priority}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
