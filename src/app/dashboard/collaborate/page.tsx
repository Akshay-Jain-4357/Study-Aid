'use client';

import { motion } from 'framer-motion';
import { Users, Video, Plus, Link as LinkIcon, Share2, Lock, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function CollaboratePage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-1 flex items-center gap-2" style={{ fontFamily: "'Instrument Serif', serif" }}>
            <span className="gradient-text">Study Rooms</span>
            <Users size={20} style={{ color: 'var(--amber-500)' }} />
          </h2>
          <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Collaborate with peers, screen share, and discuss in real-time.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 self-start py-3 px-8 rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg hover:scale-105 transition-transform">
          <Plus size={16} /> Create Room
        </button>
      </motion.div>

      {/* Main Layout Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Rooms List - Empty State */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center border" style={{ background: 'var(--bg-hover)', borderColor: 'var(--border-teal-subtle)' }}>
              <Users size={16} style={{ color: 'var(--accent-secondary)' }}/>
            </div>
            Active Rooms
          </h3>

          <div className="glass-surface min-h-[400px] flex flex-col items-center justify-center text-center p-12 rounded-3xl" style={{ background: 'var(--bg-glass-card)', borderColor: 'var(--border-subtle)' }}>
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 border relative" style={{ background: 'var(--bg-hover)', borderColor: 'var(--border-strong)' }}>
              <Video size={36} style={{ color: 'var(--text-muted)' }} />
              <div className="absolute inset-0 bg-amber-500/5 rounded-3xl animate-pulse pointer-events-none" />
            </div>
            <h4 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Instrument Serif', serif", color: 'var(--text-primary)' }}>No active rooms found</h4>
            <p className="text-sm font-medium max-w-sm mx-auto mb-10 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              There are no public study rooms active right now. Start your own room and invite your friends to collaborate.
            </p>
            <button className="btn-primary py-3 px-8 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:scale-105 transition-transform">
              <Plus size={16} /> Start a New Room
            </button>
          </div>
        </div>

        {/* Friends Sidebar - Empty State */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 25 }}
            className="glass-surface p-8 rounded-3xl" style={{ background: 'var(--bg-glass-card)', borderColor: 'var(--border-subtle)' }}>
            <h3 className="font-bold text-sm uppercase tracking-wider flex items-center justify-between mb-8" style={{ color: 'var(--text-primary)' }}>
              <span>Friends Activity</span>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center border transition-colors hover:border-amber-500/50 hover:text-amber-500" style={{ background: 'var(--bg-hover)', borderColor: 'var(--border-strong)', color: 'var(--text-muted)' }}><Plus size={14} /></button>
            </h3>
            
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-strong)' }}>
                <Users size={24} style={{ color: 'var(--text-muted)' }} />
              </div>
              <p className="text-sm font-medium mb-8" style={{ color: 'var(--text-muted)' }}>You haven't added any friends yet.</p>
              <button className="w-full py-3 rounded-xl border border-dashed transition-all hover:border-amber-500 hover:text-amber-500 hover:bg-amber-500/5 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider" style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}>
                <LinkIcon size={14} /> Invite Friends
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 25 }}
            className="glass-surface p-8 rounded-3xl border relative overflow-hidden group" style={{ background: 'var(--bg-hover-strong)', borderColor: 'var(--border-amber-medium)' }}>
            <div className="absolute inset-0 bg-amber-500/5 transition-opacity opacity-0 group-hover:opacity-100" />
            <h3 className="font-bold text-sm uppercase tracking-wider mb-3 relative z-10" style={{ color: 'var(--amber-400)' }}>Invite & Earn</h3>
            <p className="text-xs font-medium mb-8 leading-relaxed relative z-10" style={{ color: 'var(--text-secondary)' }}>Share StudyAid with your batchmates and earn Pro rewards for every successful referral.</p>
            <div className="flex gap-3 relative z-10">
              <input type="text" readOnly value="studyaid.in/invite/user_123" className="w-full rounded-xl px-4 py-3 text-xs font-medium outline-none border cursor-text" style={{ background: 'var(--bg-input)', borderColor: 'var(--border-strong)', color: 'var(--text-muted)' }} />
              <button className="w-12 shrink-0 flex items-center justify-center rounded-xl transition-transform hover:scale-105 shadow-md" style={{ background: 'var(--gradient-amber)', color: '#000' }}>
                <Share2 size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
