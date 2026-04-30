'use client';

import { motion } from 'framer-motion';
import { BarChart3, Lock } from 'lucide-react';
import Link from 'next/link';

export default function AnalyticsPage() {
  // Empty state since analytics requires weeks of data to generate
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold mb-1">Performance Analytics</h2>
          <p className="text-sm text-gray-400">AI-powered insights into your study habits</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-12 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6 border border-indigo-500/20 relative">
          <BarChart3 size={32} className="text-indigo-400" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center border border-gray-800">
            <Lock size={14} className="text-gray-400" />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-3 font-outfit">Not enough data yet</h3>
        <p className="text-sm text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
          Analytics require at least a few days of active study sessions, assignment completions, and notes interactions to generate meaningful AI insights.
        </p>
        
        <div className="flex gap-4">
          <Link href="/dashboard/upload" className="btn-primary py-2.5 px-6 rounded-xl text-sm font-medium">
            Upload Notes
          </Link>
          <Link href="/dashboard/planner" className="bg-white/5 hover:bg-white/10 transition-colors py-2.5 px-6 rounded-xl text-sm font-medium border border-white/10">
            Create Study Plan
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
