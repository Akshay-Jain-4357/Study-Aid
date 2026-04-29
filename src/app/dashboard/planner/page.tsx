'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Coffee, Target, BookOpen, CheckCircle, Plus, Trash2, Calendar } from 'lucide-react';
import { mockExams, mockAssignments } from '@/lib/mockData';
import { formatDate } from '@/lib/utils';

const TIMER_MODES = [
  { label: 'Focus', minutes: 25, color: '#6366f1', desc: 'Deep work session' },
  { label: 'Short Break', minutes: 5, color: '#10b981', desc: 'Rest & recharge' },
  { label: 'Long Break', minutes: 15, color: '#06b6d4', desc: 'Extended rest' },
];

const WEEK_GOALS = [
  { subject: 'Data Structures', target: 10, done: 7, color: '#6366f1' },
  { subject: 'Machine Learning', target: 8, done: 4, color: '#8b5cf6' },
  { subject: 'Computer Networks', target: 6, done: 1.5, color: '#ef4444' },
  { subject: 'OS', target: 5, done: 5, color: '#10b981' },
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

      {/* Mode Selector */}
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

      {/* SVG Circle Timer */}
      <div className="relative mb-8">
        <svg width="220" height="220" className="-rotate-90">
          <circle cx="110" cy="110" r="90" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
          <motion.circle
            cx="110" cy="110" r="90" fill="none"
            stroke={currentMode.color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
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

      {/* Controls */}
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
  const [goals, setGoals] = useState(WEEK_GOALS);
  const [newGoal, setNewGoal] = useState('');

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-xl font-bold mb-1">Study Planner</h2>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Pomodoro · Goals · Exam Countdown · Schedule</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Timer */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <PomodoroTimer />
        </motion.div>

        {/* Upcoming Exams */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="glass-card p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Calendar size={16} style={{ color: '#f59e0b' }} />
            Upcoming Exams
          </h3>
          <div className="space-y-3">
            {mockExams.map((exam) => {
              const days = Math.ceil((new Date(exam.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
              const urgency = days <= 7 ? '#ef4444' : days <= 14 ? '#f59e0b' : '#10b981';
              return (
                <div key={exam.id} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-start justify-between mb-1.5">
                    <span className="text-sm font-semibold">{exam.subject}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${urgency}20`, color: urgency }}>
                      {days}d left
                    </span>
                  </div>
                  <div className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
                    {formatDate(exam.date)} · {exam.time} · {exam.venue}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Preparedness</span>
                    <span className="text-xs font-bold" style={{ color: urgency }}>{exam.preparedness}%</span>
                  </div>
                  <div className="progress-bar mt-1.5">
                    <div className="progress-fill" style={{ width: `${exam.preparedness}%`, background: urgency }} />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Weekly Goals */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass-card p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Target size={16} style={{ color: '#6366f1' }} />
            Weekly Study Goals
          </h3>
          <div className="space-y-4">
            {goals.map((g) => (
              <div key={g.subject}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: g.color }} />
                    {g.subject}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {g.done}h / {g.target}h
                  </span>
                </div>
                <div className="progress-bar">
                  <motion.div className="progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (g.done / g.target) * 100)}%` }}
                    transition={{ duration: 0.8 }}
                    style={{ background: g.done >= g.target ? '#10b981' : g.color }} />
                </div>
                {g.done >= g.target && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400">
                    <CheckCircle size={11} /> Goal achieved!
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex gap-2">
              <input
                value={newGoal}
                onChange={e => setNewGoal(e.target.value)}
                placeholder="Add subject..."
                className="input-field flex-1 text-sm"
                style={{ padding: '0.5rem 0.75rem', borderRadius: '10px' }}
              />
              <button className="btn-primary" style={{ padding: '0.5rem 0.75rem', borderRadius: '10px' }}>
                <Plus size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Study Schedule */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        className="glass-card p-6">
        <h3 className="font-bold mb-5">Today&apos;s Schedule</h3>
        <div className="relative">
          <div className="absolute left-16 top-0 bottom-0 w-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <div className="space-y-3">
            {[
              { time: '09:00', subject: 'DSA — Binary Trees', duration: '2h', status: 'done', color: '#10b981' },
              { time: '11:00', subject: 'Short Break + Review', duration: '30m', status: 'done', color: '#06b6d4' },
              { time: '11:30', subject: 'Machine Learning — Gradient Descent', duration: '1.5h', status: 'current', color: '#6366f1' },
              { time: '13:00', subject: 'Lunch Break', duration: '1h', status: 'upcoming', color: '#f59e0b' },
              { time: '14:00', subject: 'Computer Networks — TCP/IP', duration: '2h', status: 'upcoming', color: '#ef4444' },
              { time: '16:00', subject: 'OS Revision', duration: '1h', status: 'upcoming', color: '#8b5cf6' },
            ].map((slot, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-14 text-right text-xs flex-shrink-0" style={{ color: 'var(--text-muted)' }}>{slot.time}</div>
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-3 h-3 rounded-full" style={{
                    background: slot.status === 'done' ? '#10b981' : slot.status === 'current' ? slot.color : 'rgba(255,255,255,0.15)',
                    border: slot.status === 'current' ? `2px solid ${slot.color}` : 'none',
                    boxShadow: slot.status === 'current' ? `0 0 12px ${slot.color}80` : 'none',
                  }} />
                </div>
                <div className={`flex-1 flex items-center justify-between px-4 py-3 rounded-xl ${slot.status === 'current' ? 'border' : ''}`}
                  style={{
                    background: slot.status === 'current' ? `${slot.color}10` : slot.status === 'done' ? 'rgba(16,185,129,0.05)' : 'rgba(255,255,255,0.03)',
                    border: slot.status === 'current' ? `1px solid ${slot.color}30` : '1px solid rgba(255,255,255,0.04)',
                  }}>
                  <span className="text-sm font-medium" style={{ color: slot.status === 'done' ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: slot.status === 'done' ? 'line-through' : 'none' }}>
                    {slot.subject}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{slot.duration}</span>
                    {slot.status === 'done' && <CheckCircle size={13} style={{ color: '#10b981' }} />}
                    {slot.status === 'current' && <span className="badge" style={{ background: `${slot.color}20`, color: slot.color, border: `1px solid ${slot.color}30`, padding: '1px 8px', fontSize: '0.7rem', textTransform: 'none', letterSpacing: 'normal' }}>Now</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
