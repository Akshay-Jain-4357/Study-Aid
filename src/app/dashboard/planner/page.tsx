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
    <div className="glass-surface p-8 flex flex-col items-center rounded-3xl relative overflow-hidden"
      style={{
        background: 'var(--bg-glass-card)',
        borderColor: 'var(--border-subtle)'
      }}>
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(circle at 50% -20%, ${currentMode.color}80, transparent 70%)`
        }} />

      <h3 className="font-bold mb-6 text-sm uppercase tracking-wider relative z-10" style={{ color: 'var(--text-muted)' }}>Focus Timer</h3>
      <div className="flex gap-2 mb-10 w-full relative z-10 p-1.5 rounded-2xl" style={{ background: 'var(--bg-input)' }}>
        {TIMER_MODES.map((m, i) => (
          <button key={m.label} onClick={() => switchMode(i)} className="flex-1 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all"
            style={{
              background: mode === i ? `${m.color}15` : 'transparent',
              color: mode === i ? m.color : 'var(--text-muted)',
            }}>
            {m.label}
          </button>
        ))}
      </div>
      <div className="relative mb-10">
        <svg width="240" height="240" className="-rotate-90 drop-shadow-xl">
          <circle cx="120" cy="120" r="100" fill="none" stroke="var(--border-subtle)" strokeWidth="8" />
          <motion.circle
            cx="120" cy="120" r="100" fill="none"
            stroke={currentMode.color} strokeWidth="8" strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 100} 
            strokeDashoffset={(2 * Math.PI * 100) - (progress / 100) * (2 * Math.PI * 100)}
            style={{ filter: `drop-shadow(0 0 12px ${currentMode.color}80)` }}
            transition={{ duration: 1, ease: 'linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-6xl font-black tabular-nums tracking-tighter" style={{ fontFamily: 'Outfit', color: currentMode.color, filter: `drop-shadow(0 0 16px ${currentMode.color}60)` }}>
            {mins}:{secs}
          </div>
          <div className="text-xs mt-2 font-medium uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{currentMode.desc}</div>
        </div>
      </div>
      <div className="flex items-center gap-4 relative z-10 w-full px-6">
        <button onClick={reset} className="p-4 rounded-2xl transition-all shadow-sm border hover:scale-105" style={{ background: 'var(--bg-input)', borderColor: 'var(--border-strong)' }}>
          <RotateCcw size={20} style={{ color: 'var(--text-muted)' }} />
        </button>
        <button onClick={() => setRunning(!running)} className="flex-1 py-4 rounded-2xl flex items-center justify-center gap-3 font-bold transition-all hover:scale-[1.02]"
          style={{
            background: running ? 'rgba(239,68,68,0.1)' : 'var(--gradient-amber)',
            borderColor: running ? 'rgba(239,68,68,0.4)' : 'transparent',
            borderWidth: running ? 1 : 0,
            boxShadow: running ? 'none' : 'var(--shadow-amber-glow)',
            color: running ? '#ef4444' : '#000'
          }}>
          {running ? <Pause size={20} /> : <Play size={20} />}
          {running ? 'PAUSE TIMER' : 'START FOCUS'}
        </button>
      </div>
      <div className="mt-8 text-xs font-bold uppercase tracking-wider relative z-10 flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
        <Target size={14} style={{ color: currentMode.color }} />
        {sessions} sessions completed today
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
        <h2 className="text-2xl font-bold mb-1 flex items-center gap-2" style={{ fontFamily: "'Instrument Serif', serif" }}>
          <span className="gradient-text">Study Planner</span>
          <Calendar size={20} style={{ color: 'var(--amber-500)' }} />
        </h2>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Pomodoro · Schedule · Tasks</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 25 }}>
          <PomodoroTimer />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 25 }}
          className="glass-surface p-8 lg:col-span-2 rounded-3xl"
          style={{ background: 'var(--bg-glass-card)', borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold flex items-center gap-2 text-lg">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center border" style={{ background: 'var(--bg-hover)', borderColor: 'var(--border-teal-subtle)' }}>
                <Calendar size={16} style={{ color: 'var(--accent-secondary)' }}/>
              </div>
              Your Schedule & Tasks
            </h3>
            <button className="btn-primary py-2 px-4 rounded-xl text-xs font-bold flex items-center gap-1 shadow-lg hover:scale-105 transition-transform">
              <Plus size={14} /> Add Event
            </button>
          </div>

          {assignments.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-16 text-center border border-dashed rounded-3xl"
              style={{ borderColor: 'var(--border-default)', background: 'var(--bg-hover-light)' }}>
              <Clock size={40} className="mb-4 opacity-50" style={{ color: 'var(--text-muted)' }} />
              <h4 className="font-bold mb-2 text-lg">Your planner is empty</h4>
              <p className="text-sm max-w-sm" style={{ color: 'var(--text-secondary)' }}>Add tasks or study sessions to start organizing your workflow.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {assignments.map(a => (
                <motion.div key={a.id} className="flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer group hover:scale-[1.01]"
                  style={{ background: 'var(--bg-input)', borderColor: 'var(--border-strong)' }}
                  whileHover={{ borderColor: 'var(--border-teal-subtle)', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                >
                  <div className="w-16 text-right text-xs font-bold shrink-0" style={{ color: 'var(--text-muted)' }}>{formatDate(a.dueDate)}</div>
                  <div className="w-3 h-3 rounded-full shrink-0 shadow-sm" style={{ background: 'var(--accent-secondary)', opacity: 0.8 }} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{a.title}</p>
                    <p className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>{a.subject}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
