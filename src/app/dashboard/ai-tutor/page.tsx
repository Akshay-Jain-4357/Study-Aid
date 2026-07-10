'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Send, Sparkles, RefreshCw, Copy, ThumbsUp, ThumbsDown, Zap, BookOpen, HelpCircle, Lightbulb, AlertTriangle } from 'lucide-react';
import type { AIMessage } from '@/lib/types';

const STARTER_PROMPTS = [
  { icon: BookOpen, text: 'Explain binary search trees simply', category: 'Explain' },
  { icon: HelpCircle, text: 'Generate 5 MCQs on OS Scheduling', category: 'Quiz' },
  { icon: Lightbulb, text: 'How should I prepare for GATE 2025?', category: 'Strategy' },
  { icon: Zap, text: 'What are the key differences between TCP and UDP?', category: 'Concepts' },
  { icon: Sparkles, text: 'Summarize the OSI model in 7 bullet points', category: 'Summary' },
  { icon: Brain, text: 'Create a 7-day ML study roadmap', category: 'Roadmap' },
];

const INITIAL_MSG = "I'm your **Study Aid AI Tutor** — powered by GPT-4 and fine-tuned for academic excellence. 🎓\n\nI can help you with concept explanations, quiz generation, study roadmaps, and more. What would you like to learn today?";

function MessageBubble({ msg }: { msg: AIMessage }) {
  const [copied, setCopied] = useState(false);
  const isAI = msg.role === 'assistant';

  const handleCopy = () => {
    navigator.clipboard.writeText(msg.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h3 key={i} className="text-base font-bold mt-3 mb-1">{line.slice(3)}</h3>;
      if (line.startsWith('### ')) return <h4 key={i} className="text-sm font-bold mt-2 mb-0.5 text-indigo-300">{line.slice(4)}</h4>;
      if (line.startsWith('- **')) return <li key={i} className="ml-4 text-sm" style={{ color: 'var(--text-secondary)' }} dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong style="color:white">$1</strong>') }} />;
      if (line.startsWith('- ')) return <li key={i} className="ml-4 text-sm" style={{ color: 'var(--text-secondary)' }}>{line.slice(2)}</li>;
      if (line.startsWith('**')) return <p key={i} className="text-sm font-semibold mt-1" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
      if (line.trim() === '') return <div key={i} className="h-1" />;
      return <p key={i} className="text-sm leading-relaxed" style={{ color: line.startsWith('🔥') ? '#fcd34d' : 'var(--text-secondary)' }} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong style="color:white">$1</strong>') }} />;
    });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }} className={`flex gap-3 ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
      {isAI ? (
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg" style={{ background: 'var(--gradient-primary)' }}>
          <Brain size={16} color="white" />
        </div>
      ) : (
        <div className="w-8 h-8 rounded-xl flex flex-shrink-0 items-center justify-center font-bold text-xs shadow-lg" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'var(--text-primary)' }}>You</div>
      )}

      <div className={`max-w-[85%] ${isAI ? '' : 'flex flex-col items-end'}`}>
        <div className="px-5 py-4 rounded-2xl shadow-sm" style={{
            background: isAI ? 'var(--bg-glass-card)' : 'rgba(232, 168, 50, 0.1)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: isAI ? '1px solid var(--border-subtle)' : '1px solid rgba(232, 168, 50, 0.25)',
            borderRadius: isAI ? '4px 20px 20px 20px' : '20px 4px 20px 20px',
            color: 'var(--text-primary)'
          }}>
          {isAI ? renderContent(msg.content) : <p className="text-sm font-medium">{msg.content}</p>}
        </div>
        {isAI && (
          <div className="flex items-center gap-1.5 mt-2 ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={handleCopy} className="p-1 rounded hover:bg-white/10 transition-all text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
              <Copy size={11} /> {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function AITutorPage() {
  const [messages, setMessages] = useState<AIMessage[]>([
    { id: '0', role: 'assistant', content: INITIAL_MSG, timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;
    setError(null);
    const userMsg: AIMessage = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })) 
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get AI response');
      }

      const aiMsg: AIMessage = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: data.message.content, 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err: any) {
      setError(err.message);
      // Remove the last user message if it failed? No, keep it so they can try again
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)]">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="glass-surface p-4 mb-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <motion.div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg relative" style={{ background: 'var(--gradient-primary)' }}
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <Brain size={20} color="white" />
            <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 hover:opacity-100 transition-opacity" />
          </motion.div>
          <div>
            <h2 className="font-bold text-sm">Study Aid AI Tutor</h2>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Online · GPT-4</span>
            </div>
          </div>
        </div>
        <motion.button onClick={() => setMessages([{ id: '0', role: 'assistant', content: INITIAL_MSG, timestamp: new Date() }])}
          className="p-2 rounded-xl transition-all"
          style={{ background: 'var(--bg-hover)', color: 'var(--text-muted)' }}
          whileHover={{ scale: 1.05, background: 'var(--bg-hover-strong)', color: 'var(--text-primary)' }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw size={15} />
        </motion.button>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-4 scrollbar-none">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--gradient-primary)' }}><Brain size={16} color="white" /></div>
            <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 flex gap-1 items-center">
              {[0, 1, 2].map(i => <motion.div key={i} className="w-1 h-1 rounded-full bg-indigo-400" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }} />)}
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-center p-4">
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-xl text-xs flex items-center gap-2">
              <AlertTriangle size={14} /> {error}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Starter Prompts */}
      {messages.length <= 1 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {STARTER_PROMPTS.map((p, i) => (
            <motion.button
              key={i} onClick={() => sendMessage(p.text)}
              className="glass-surface p-4 text-left group"
              whileHover={{ scale: 1.02, borderColor: 'var(--border-amber-subtle)', boxShadow: 'var(--shadow-amber-glow)' }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <p.icon size={14} style={{ color: 'var(--accent-primary)' }} />
                <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--text-muted)' }}>{p.category}</span>
              </div>
              <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{p.text}</p>
            </motion.button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="glass-surface-heavy p-2 pl-4 flex items-end gap-3 rounded-2xl mb-4 relative shadow-lg">
        {/* Animated focus glow */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 opacity-0 focus-within:opacity-100"
          style={{ boxShadow: '0 0 0 1px var(--amber-500), 0 0 20px rgba(232,168,50,0.1)' }} />
        
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
          placeholder="Ask me anything..."
          className="flex-1 bg-transparent text-sm font-medium outline-none resize-none py-3 relative z-10"
          style={{ color: 'var(--text-primary)' }}
          rows={1}
        />
        <motion.button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || isTyping}
          className="p-3 rounded-xl relative z-10 text-black font-bold disabled:opacity-50"
          style={{ background: 'var(--gradient-amber)' }}
          whileHover={{ scale: input.trim() && !isTyping ? 1.05 : 1 }}
          whileTap={{ scale: input.trim() && !isTyping ? 0.95 : 1 }}
        >
          <Send size={18} />
        </motion.button>
      </div>
    </div>
  );
}
