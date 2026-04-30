'use client';

import { motion } from 'framer-motion';
import { Trophy, Medal, Star, Flame, Crown, TrendingUp, Award, Lock } from 'lucide-react';
import { useUser } from '@clerk/nextjs';

export default function LeaderboardPage() {
  const { user } = useUser();
  const firstName = user?.firstName || 'Student';

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-xl font-bold mb-1">Global Leaderboard</h2>
        <p className="text-sm text-gray-400">Compete with students across the platform · Rankings update daily</p>
      </motion.div>

      {/* Podium - Empty State */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass-card p-12 flex flex-col items-center justify-center text-center">
        <div className="relative mb-8">
           <Trophy size={48} className="text-gray-500 opacity-20" />
           <div className="absolute inset-0 flex items-center justify-center">
              <Lock size={20} className="text-gray-400" />
           </div>
        </div>
        <h3 className="text-2xl font-bold mb-3 font-outfit">Rankings are Calculating</h3>
        <p className="text-sm text-gray-400 max-w-sm mx-auto mb-8">
          The global leaderboard resets every 24 hours. Start studying, uploading notes, and completing tasks to earn points and climb the ranks!
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-2xl">
          <div className="stat-card p-4">
            <div className="text-2xl font-black text-indigo-400">0</div>
            <div className="text-xs text-gray-500">Your Rank</div>
          </div>
          <div className="stat-card p-4">
            <div className="text-2xl font-black text-emerald-400">0</div>
            <div className="text-xs text-gray-500">XP Points</div>
          </div>
          <div className="stat-card p-4 col-span-2 sm:col-span-1">
            <div className="text-2xl font-black text-orange-400">0</div>
            <div className="text-xs text-gray-500">Study Streak</div>
          </div>
        </div>
      </motion.div>

      {/* Placeholder Rankings */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="glass-card overflow-hidden opacity-50">
        <div className="px-5 py-4 border-b border-white/5">
          <h3 className="font-bold">Recent Activity</h3>
        </div>
        <div className="p-12 text-center">
           <p className="text-sm text-gray-500 italic">"The best way to predict the future is to create it."</p>
           <p className="text-xs text-gray-600 mt-2">— Abraham Lincoln</p>
        </div>
      </motion.div>
    </div>
  );
}
