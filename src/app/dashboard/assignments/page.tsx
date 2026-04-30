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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold mb-1">Assignments & Tasks</h2>
            <p className="text-sm text-gray-400">Track and manage your study tasks</p>
          </div>
          <button className="btn-primary py-2 px-4 rounded-xl text-sm font-medium flex items-center gap-2">
            <PlusCircle size={16} /> New Task
          </button>
        </div>
      </motion.div>

      <div className="glass-card p-6 min-h-[50vh] flex flex-col">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center text-indigo-400">
            <Loader2 size={32} className="animate-spin mb-4" />
            <p className="text-sm font-medium animate-pulse">Loading your tasks...</p>
          </div>
        ) : assignments.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <Target size={32} className="text-gray-400" />
            </div>
            <h4 className="text-lg font-bold mb-2">No tasks yet</h4>
            <p className="text-sm text-gray-400 mb-6 max-w-[300px]">You haven't created any assignments or tasks. Start organizing your study schedule today.</p>
            <button className="btn-primary py-2 px-6 rounded-xl text-sm font-medium flex items-center gap-2">
              <PlusCircle size={16} /> Create Your First Task
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {assignments.map((a) => (
              <div key={a.id} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-white/5 bg-white/[0.02]">
                {a.status === 'SUBMITTED' ? (
                  <CheckCircle size={20} className="text-emerald-500 mt-1 shrink-0" />
                ) : a.status === 'OVERDUE' ? (
                  <AlertCircle size={20} className="text-red-500 mt-1 shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded border-2 border-white/20 mt-1 shrink-0 cursor-pointer hover:border-indigo-400 transition-colors" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-base font-medium truncate">{a.title}</div>
                  <div className="text-sm text-gray-400 mt-1">
                    {a.subject} · Due: {formatDate(a.dueDate)}
                  </div>
                </div>
                <span className="badge text-xs px-3 py-1 rounded-full shrink-0" style={{
                  background: a.priority === 'HIGH' ? 'rgba(239,68,68,0.15)' : a.priority === 'MEDIUM' ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.08)',
                  color: a.priority === 'HIGH' ? '#fca5a5' : a.priority === 'MEDIUM' ? '#fcd34d' : 'var(--text-muted)'
                }}>
                  {a.priority}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
