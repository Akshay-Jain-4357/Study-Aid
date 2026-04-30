'use client';

import { motion } from 'framer-motion';
import { Users, Video, Plus, Link as LinkIcon, Share2, Lock, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function CollaboratePage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold mb-1">Study Rooms</h2>
          <p className="text-sm text-gray-400">Collaborate with peers, screen share, and discuss in real-time.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 self-start py-2 px-6 rounded-xl">
          <Plus size={16} /> Create Room
        </button>
      </motion.div>

      {/* Main Layout Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Rooms List - Empty State */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold flex items-center gap-2">
            <Users size={16} className="text-indigo-400" /> Active Rooms
          </h3>

          <div className="glass-card min-h-[400px] flex flex-col items-center justify-center text-center p-12">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
              <Video size={32} className="text-gray-500" />
            </div>
            <h4 className="text-xl font-bold mb-2 font-outfit">No active rooms found</h4>
            <p className="text-sm text-gray-400 max-w-sm mx-auto mb-8">
              There are no public study rooms active right now. Start your own room and invite your friends to collaborate.
            </p>
            <button className="btn-primary py-2.5 px-8 rounded-xl text-sm font-medium flex items-center gap-2">
              <Plus size={16} /> Start a New Room
            </button>
          </div>
        </div>

        {/* Friends Sidebar - Empty State */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            className="glass-card p-6">
            <h3 className="font-bold flex items-center justify-between mb-6">
              <span>Friends Activity</span>
              <button className="text-gray-400 hover:text-white"><Plus size={16} /></button>
            </h3>
            
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <Users size={20} className="text-gray-500" />
              </div>
              <p className="text-xs text-gray-400 mb-6">You haven't added any friends yet.</p>
              <button className="w-full py-2.5 rounded-xl border border-indigo-500/30 text-indigo-400 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-indigo-500/10 transition-colors">
                <LinkIcon size={14} /> Invite Friends
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="glass-card p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
            <h3 className="font-bold text-sm mb-2 text-indigo-300">Invite & Earn</h3>
            <p className="text-xs text-gray-400 mb-6">Share StudyAid with your batchmates and earn Pro rewards for every successful referral.</p>
            <div className="flex gap-2">
              <input type="text" readOnly value="studyaid.in/invite/user_123" className="input-field text-xs px-3 py-2 flex-1 bg-black/40 border-white/5" />
              <button className="w-10 flex items-center justify-center rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-colors">
                <Share2 size={14} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
