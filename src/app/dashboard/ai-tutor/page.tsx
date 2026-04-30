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
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
      {isAI ? (
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--gradient-primary)' }}>
          <Brain size={16} color="white" />
        </div>
      ) : (
        <div className="avatar flex-shrink-0" style={{ width: 32, height: 32, fontSize: '0.7rem' }}>A</div>
      )}

      <div className={`max-w-[85%] ${isAI ? '' : 'flex flex-col items-end'}`}>
        <div className="px-4 py-3 rounded-2xl" style={{
            background: isAI ? 'rgba(15,15,25,0.8)' : 'rgba(99,102,241,0.2)',
            border: isAI ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(99,102,241,0.35)',
            borderRadius: isAI ? '4px 18px 18px 18px' : '18px 4px 18px 18px',
          }}>
          {isAI ? renderContent(msg.content) : <p className="text-sm">{msg.content}</p>}
        </div>
        {isAI && (
          <div className="flex items-center gap-1.5 mt-1.5 ml-1">
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
        className="glass-card p-4 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
            <Brain size={20} color="white" />
          </div>
          <div>
            <h2 className="font-bold text-sm">Study Aid AI Tutor</h2>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Online · Real-time Responses</span>
            </div>
          </div>
        </div>
        <button onClick={() => setMessages([{ id: '0', role: 'assistant', content: INITIAL_MSG, timestamp: new Date() }])}
          className="p-2 rounded-lg hover:bg-white/10 transition-all text-gray-400"><RefreshCw size={15} /></button>
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
          {STARTER_PROMPTS.map((p, i) => (
            <button key={i} onClick={() => sendMessage(p.text)} className="glass-card p-3 text-left hover:border-indigo-500/40 transition-all">
              <div className="flex items-center gap-2 mb-1">
                <p.icon size={13} className="text-indigo-400" />
                <span className="text-[10px] uppercase font-bold text-indigo-400/60">{p.category}</span>
              </div>
              <p className="text-xs text-gray-400">{p.text}</p>
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="glass-card p-3 flex items-end gap-3 rounded-2xl mb-4">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
          placeholder="Ask me anything..."
          className="flex-1 bg-transparent text-sm outline-none resize-none py-1"
          rows={1}
        />
        <button onClick={() => sendMessage(input)} disabled={!input.trim() || isTyping} className="btn-primary p-2.5 rounded-xl disabled:opacity-40">
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
