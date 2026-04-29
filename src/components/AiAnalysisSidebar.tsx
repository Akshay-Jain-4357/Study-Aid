'use client';

import { useState } from 'react';
import { BrainCircuit, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AiAnalysisSidebar({ noteId, title, subject }: { noteId: string, title: string, subject: string }) {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ noteId, title, subject }),
      });
      
      const data = await res.json();
      if (res.ok) {
        setAnalysis(data.summary);
      } else {
        setAnalysis("Failed to generate analysis. Please try again.");
      }
    } catch (err) {
      setAnalysis("Network error while reaching AI servers.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-b from-indigo-500/10 to-transparent border border-indigo-500/20 rounded-2xl p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl" />

      <div className="flex items-center gap-2 mb-4 relative z-10">
        <BrainCircuit size={20} className="text-indigo-400" />
        <h3 className="font-bold">AI Document Analysis</h3>
      </div>

      <AnimatePresence mode="wait">
        {!analysis && !loading ? (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="space-y-3 opacity-30">
              <div className="h-4 bg-white/20 rounded-md w-full" />
              <div className="h-4 bg-white/20 rounded-md w-[90%]" />
              <div className="h-4 bg-white/20 rounded-md w-[95%]" />
              <div className="h-4 bg-white/20 rounded-md w-[80%]" />
            </div>
            <button 
              onClick={handleGenerate}
              className="mt-6 w-full flex items-center justify-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-medium px-4 py-2.5 rounded-xl hover:bg-indigo-500/20 transition-colors"
            >
              <Sparkles size={16} /> Generate Full Analysis
            </button>
          </motion.div>
        ) : loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-8 flex flex-col items-center justify-center text-indigo-400"
          >
            <Loader2 size={32} className="animate-spin mb-4" />
            <p className="text-sm font-medium animate-pulse">Reading document...</p>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-gray-300 leading-relaxed space-y-3"
          >
            {analysis?.split('\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
