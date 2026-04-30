'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Calendar, Target, Plus, CheckCircle, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const TIMER_MODES = [
  { label: 'Focus', minutes: 25, color: '#6366f1', desc: 'Deep work session' },
  { label: 'Short Break', minutes: 5, color: '#10b981', desc: 'Rest & recharge' },
  { label: 'Long Break', minutes: 15, color: '#06b6d4', desc: 'Extended rest' },
];

function PomodoroTimer() {
  const [mode, setMode] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_MODES[0].minutes * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const currentMode = TIMER_MODES[mode];
  const totalSeconds = currentMode.minutes * 60;
  const progress = (timeLeft / totalSeconds) * 100;
  const circumference = 2 * Math.PI * 90;
  const dashOffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setRunning(false);
          if (mode === 0) setSessions(s => s + 1);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, mode]);

  const switchMode = (idx: number) => {
    setMode(idx);
    setTimeLeft(TIMER_MODES[idx].minutes * 60);
    setRunning(false);
  };

  const reset = () => { setTimeLeft(currentMode.minutes * 60); setRunning(false); };

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const secs = String(timeLeft % 60).padStart(2, '0');

  return (
    <div className="glass-card p-6 flex flex-col items-center">
      <h3 className="font-bold mb-4">Pomodoro Timer</h3>
      <div className="flex gap-2 mb-8 w-full">
        {TIMER_MODES.map((m, i) => (
          <button key={m.label} onClick={() => switchMode(i)} className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{
              background: mode === i ? `${m.color}20` : 'rgba(255,255,255,0.04)',
              border: `1px solid ${mode === i ? `${m.color}40` : 'rgba(255,255,255,0.08)'}`,
              color: mode === i ? m.color : 'var(--text-muted)',
            }}>
            {m.label}
          </button>
        ))}
      </div>
      <div className="relative mb-8">
        <svg width="220" height="220" className="-rotate-90">
          <circle cx="110" cy="110" r="90" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
          <motion.circle
            cx="110" cy="110" r="90" fill="none"
            stroke={currentMode.color} strokeWidth="10" strokeLinecap="round"
            strokeDasharray={circumference} strokeDashoffset={dashOffset}
            style={{ filter: `drop-shadow(0 0 8px ${currentMode.color}80)` }}
            transition={{ duration: 0.5 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-black tabular-nums" style={{ fontFamily: 'Outfit', color: currentMode.color }}>
            {mins}:{secs}
          </div>
          <div className="text-xs mt-1.5" style={{ color: 'var(--text-muted)' }}>{currentMode.desc}</div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={reset} className="p-3 rounded-2xl hover:bg-white/10 transition-all" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <RotateCcw size={18} style={{ color: 'var(--text-muted)' }} />
        </button>
        <button onClick={() => setRunning(!running)} className="btn-primary px-10 py-3 flex items-center gap-2"
          style={{ background: running ? 'rgba(239,68,68,0.2)' : undefined, borderColor: running ? 'rgba(239,68,68,0.4)' : undefined }}>
          {running ? <Pause size={18} /> : <Play size={18} />}
          {running ? 'Pause' : 'Start'}
        </button>
      </div>
      <div className="mt-6 text-sm" style={{ color: 'var(--text-muted)' }}>
        🍅 {sessions} sessions completed today
      </div>
    </div>
  );
}

export default function PlannerPage() {
  const [assignments, setAssignments] = useState<any[]>([]);
  
  useEffect(() => {
    fetch('/api/dashboard').then(res => res.json()).then(data => setAssignments(data.assignments || []));
  }, []);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-xl font-bold mb-1">Study Planner</h2>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Pomodoro · Schedule · Tasks</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <PomodoroTimer />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold flex items-center gap-2"><Calendar size={18} className="text-indigo-400"/> Your Schedule & Tasks</h3>
            <button className="btn-primary py-1.5 px-3 rounded-lg text-xs font-medium flex items-center gap-1">
              <Plus size={14} /> Add Event
            </button>
          </div>

          {assignments.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
              <Clock size={32} className="text-gray-500 mb-4" />
              <h4 className="font-bold mb-1 text-lg">Your planner is empty</h4>
              <p className="text-sm text-gray-400">Add tasks or study sessions to start organizing your workflow.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {assignments.map(a => (
                <div key={a.id} className="flex items-center gap-4 p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                  <div className="w-16 text-right text-xs text-gray-400 shrink-0">{formatDate(a.dueDate)}</div>
                  <div className="w-3 h-3 rounded-full bg-indigo-500/20 border border-indigo-500 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{a.title}</p>
                    <p className="text-xs text-gray-400">{a.subject}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
