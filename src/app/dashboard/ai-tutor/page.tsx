'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Send, Sparkles, RefreshCw, Copy, ThumbsUp, ThumbsDown, Zap, BookOpen, HelpCircle, Lightbulb, ChevronRight } from 'lucide-react';
import type { AIMessage } from '@/lib/types';

const STARTER_PROMPTS = [
  { icon: BookOpen, text: 'Explain binary search trees simply', category: 'Explain' },
  { icon: HelpCircle, text: 'Generate 5 MCQs on OS Scheduling', category: 'Quiz' },
  { icon: Lightbulb, text: 'How should I prepare for GATE 2025?', category: 'Strategy' },
  { icon: Zap, text: 'What are the key differences between TCP and UDP?', category: 'Concepts' },
  { icon: Sparkles, text: 'Summarize the OSI model in 7 bullet points', category: 'Summary' },
  { icon: Brain, text: 'Create a 7-day ML study roadmap', category: 'Roadmap' },
];

const MOCK_RESPONSES: Record<string, string> = {
  default: `I'm your **Study Aid AI Tutor** — powered by GPT-4 and fine-tuned for academic excellence. 🎓

I can help you with:
- **📖 Concept Explanations** — Any topic, simplified step by step
- **🧠 Quiz Generation** — MCQs, short answers, PYQ-style questions
- **📅 Study Roadmaps** — Personalized to your exam schedule
- **✍️ Viva Prep** — Common interview & viva questions with answers
- **📊 Topic Summaries** — Key points, formulas, diagrams in text

What would you like to learn today?`,
  bst: `## Binary Search Trees (BST) — Simplified 🌳

A **Binary Search Tree** is a tree where:
- Every node has **at most 2 children** (left and right)
- **Left child** always has a value **less than the parent**
- **Right child** always has a value **greater than the parent**

### Why It Matters:
BSTs allow **O(log n)** search, insert, and delete operations on average.

### Example:
\`\`\`
        50
       /  \\
      30   70
     /  \\   \\
   20   40   80
\`\`\`

Searching for 40:
1. Start at 50 → 40 < 50 → go left
2. Reach 30 → 40 > 30 → go right  
3. Reach 40 → **FOUND** ✅

### Key Operations:
| Operation | Avg Time | Worst Case |
|-----------|----------|------------|
| Search    | O(log n) | O(n)       |
| Insert    | O(log n) | O(n)       |
| Delete    | O(log n) | O(n)       |

Worst case O(n) happens when BST degenerates into a **linked list** (sorted input).

**🔥 Exam Tip:** Always mention AVL Trees or Red-Black Trees as balanced BST alternatives!`,
  quiz: `## OS Scheduling — 5 MCQs 📝

**Q1.** Which scheduling algorithm has the minimum average waiting time?
- A) FCFS  
- B) Round Robin  
- C) **SJF (Shortest Job First)** ✅  
- D) Priority Scheduling

**Q2.** What is a convoy effect?
- A) When long processes are starved  
- **B) When short processes wait behind a long CPU-bound process** ✅  
- C) Priority inversion  
- D) Deadlock scenario

**Q3.** Round Robin with time quantum = ∞ becomes:
- A) SJF  
- B) Priority  
- **C) FCFS** ✅  
- D) SRTF

**Q4.** Which algorithm can cause starvation?
- A) Round Robin  
- B) FCFS  
- **C) Priority Scheduling** ✅  
- D) Multilevel Feedback Queue

**Q5.** In preemptive SJF, a process is replaced when:
- **A) A new shorter process arrives** ✅  
- B) Time quantum expires  
- C) Process becomes I/O bound  
- D) Priority increases

**Score: ?/5** — Reply with your answers and I'll check them! 🎯`,
};

function getAIResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('binary search') || lower.includes('bst')) return MOCK_RESPONSES.bst;
  if (lower.includes('quiz') || lower.includes('mcq') || lower.includes('question')) return MOCK_RESPONSES.quiz;
  return MOCK_RESPONSES.default;
}

function MessageBubble({ msg }: { msg: AIMessage }) {
  const [copied, setCopied] = useState(false);
  const isAI = msg.role === 'assistant';

  const handleCopy = () => {
    navigator.clipboard.writeText(msg.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple markdown-ish renderer
  const renderContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h3 key={i} className="text-base font-bold mt-3 mb-1">{line.slice(3)}</h3>;
      if (line.startsWith('### ')) return <h4 key={i} className="text-sm font-bold mt-2 mb-0.5 text-indigo-300">{line.slice(4)}</h4>;
      if (line.startsWith('- **')) return <li key={i} className="ml-4 text-sm" style={{ color: 'var(--text-secondary)' }} dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong style="color:white">$1</strong>') }} />;
      if (line.startsWith('- ')) return <li key={i} className="ml-4 text-sm" style={{ color: 'var(--text-secondary)' }}>{line.slice(2)}</li>;
      if (line.startsWith('**')) return <p key={i} className="text-sm font-semibold mt-1" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
      if (line.startsWith('|')) return <p key={i} className="text-sm font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>{line}</p>;
      if (line.startsWith('```')) return null;
      if (line.trim() === '') return <div key={i} className="h-1" />;
      return <p key={i} className="text-sm leading-relaxed" style={{ color: line.startsWith('🔥') ? '#fcd34d' : 'var(--text-secondary)' }} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong style="color:white">$1</strong>') }} />;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isAI ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {isAI ? (
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--gradient-primary)' }}>
          <Brain size={16} color="white" />
        </div>
      ) : (
        <div className="avatar flex-shrink-0" style={{ width: 32, height: 32, fontSize: '0.7rem' }}>A</div>
      )}

      <div className={`max-w-[85%] ${isAI ? '' : 'flex flex-col items-end'}`}>
        <div
          className="px-4 py-3 rounded-2xl"
          style={{
            background: isAI ? 'rgba(15,15,25,0.8)' : 'rgba(99,102,241,0.2)',
            border: isAI ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(99,102,241,0.35)',
            borderRadius: isAI ? '4px 18px 18px 18px' : '18px 4px 18px 18px',
          }}
        >
          {isAI ? renderContent(msg.content) : (
            <p className="text-sm">{msg.content}</p>
          )}
        </div>

        {isAI && (
          <div className="flex items-center gap-1.5 mt-1.5 ml-1">
            <button onClick={handleCopy} className="p-1 rounded hover:bg-white/10 transition-all text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
              <Copy size={11} /> {copied ? 'Copied' : 'Copy'}
            </button>
            <button className="p-1 rounded hover:bg-white/10 transition-all" style={{ color: 'var(--text-muted)' }}><ThumbsUp size={11} /></button>
            <button className="p-1 rounded hover:bg-white/10 transition-all" style={{ color: 'var(--text-muted)' }}><ThumbsDown size={11} /></button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function AITutorPage() {
  const [messages, setMessages] = useState<AIMessage[]>([
    { id: '0', role: 'assistant', content: MOCK_RESPONSES.default, timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: AIMessage = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));
    const aiResponse = getAIResponse(text);
    const aiMsg: AIMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: aiResponse, timestamp: new Date() };
    setIsTyping(false);
    setMessages(prev => [...prev, aiMsg]);
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
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>GPT-4 Turbo · Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge badge-success">∞ Credits</span>
          <button
            onClick={() => setMessages([{ id: '0', role: 'assistant', content: MOCK_RESPONSES.default, timestamp: new Date() }])}
            className="p-2 rounded-lg hover:bg-white/10 transition-all"
            title="New Chat"
          >
            <RefreshCw size={15} style={{ color: 'var(--text-muted)' }} />
          </button>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--gradient-primary)' }}>
              <Brain size={16} color="white" />
            </div>
            <div className="px-4 py-3 rounded-2xl" style={{ background: 'rgba(15,15,25,0.8)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px 18px 18px 18px' }}>
              <div className="flex gap-1 items-center h-5">
                {[0, 1, 2].map(i => (
                  <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-400"
                    animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Starter Prompts */}
      {messages.length <= 1 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
          {STARTER_PROMPTS.map((p, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => sendMessage(p.text)}
              className="glass-card p-3 text-left hover:border-indigo-500/40 transition-all group"
              style={{ borderRadius: '12px' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <p.icon size={13} style={{ color: '#a5b4fc' }} />
                <span className="text-xs text-indigo-400 font-semibold">{p.category}</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{p.text}</p>
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Input */}
      <div className="glass-card p-3 flex items-end gap-3" style={{ borderRadius: '16px' }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
          placeholder="Ask me anything — concepts, quizzes, roadmaps, PYQs..."
          className="flex-1 bg-transparent text-sm outline-none resize-none"
          style={{ color: 'var(--text-primary)', minHeight: 40, maxHeight: 120, lineHeight: 1.6 }}
          rows={1}
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || isTyping}
          className="btn-primary p-2.5 flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ borderRadius: '10px', padding: '0.6rem' }}
        >
          <Send size={16} />
        </button>
      </div>
      <p className="text-center text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
        AI can make mistakes. Verify important information. · <span className="text-indigo-400">Pro Plan</span>
      </p>
    </div>
  );
}
