'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';

export default function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState('FEATURE');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { isLoaded, userId } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;
    
    setStatus('loading');
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, message })
      });
      
      if (!res.ok) throw new Error('Failed to submit');
      
      setStatus('success');
      setTimeout(() => {
        setIsOpen(false);
        setStatus('idle');
        setMessage('');
      }, 2000);
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-white text-black p-3.5 rounded-full shadow-[0_8px_30px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform z-50 flex items-center justify-center"
        title="Leave Feedback"
      >
        <MessageSquare size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0a0a0a] border border-white/10 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative"
            >
              <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                <X size={20} />
              </button>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Feedback</h3>
                <p className="text-xs text-gray-400 mb-6">Help us improve the StudyAid experience.</p>
                
                {status === 'success' ? (
                  <div className="py-12 text-center">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Send size={20} className="text-emerald-400" />
                    </div>
                    <p className="font-medium text-white">Thank you!</p>
                    <p className="text-xs text-gray-400">Your feedback has been received.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {!userId && (
                      <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-xs text-gray-300 mb-4">
                        You are submitting this feedback anonymously.
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-2">
                      {['FEATURE', 'BUG', 'RATE', 'CONTACT'].map(t => (
                        <button 
                          key={t}
                          type="button"
                          onClick={() => setType(t)}
                          className={`py-2 text-xs font-medium rounded-lg border transition-colors ${type === t ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'}`}
                        >
                          {t.charAt(0) + t.slice(1).toLowerCase()}
                        </button>
                      ))}
                    </div>

                    <textarea
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Tell us what's on your mind..."
                      required
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-white/30 resize-none transition-colors"
                    />

                    {status === 'error' && <p className="text-xs text-red-400">Failed to submit feedback. Try again.</p>}

                    <button 
                      type="submit" 
                      disabled={status === 'loading'}
                      className="w-full bg-white text-black py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : 'Submit Feedback'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
