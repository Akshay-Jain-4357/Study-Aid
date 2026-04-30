'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Sparkles, TrendingUp, AlertCircle, Loader2 } from 'lucide-react';

export default function SmartInsights() {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInsight() {
      try {
        const res = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [
              { role: 'system', content: 'Generate a single, high-impact, one-sentence study tip for a university student. Make it specific and actionable. Keep it under 20 words.' },
              { role: 'user', content: 'Give me a study tip.' }
            ]
          })
        });
        const data = await res.json();
        if (res.ok) {
          setInsight(data.message.content.replace(/^"|"$/g, ''));
        }
      } catch (err) {
        // Silently fail if AI is not configured
      } finally {
        setLoading(false);
      }
    }
    fetchInsight();
  }, []);

  if (loading) return (
    <div className="glass-card p-4 flex items-center gap-3 animate-pulse">
      <Loader2 size={16} className="text-indigo-400 animate-spin" />
      <div className="h-4 w-48 bg-white/5 rounded" />
    </div>
  );

  if (!insight) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 border-indigo-500/20">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
          <Lightbulb size={16} className="text-indigo-400" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider font-bold text-indigo-400/60 mb-0.5">AI Study Insight</p>
          <p className="text-sm font-medium leading-relaxed">{insight}</p>
        </div>
      </div>
    </motion.div>
  );
}
