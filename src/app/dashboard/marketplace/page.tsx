'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Star, Search, PlusCircle, Store, Lock } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function MarketplacePage() {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="flex flex-col sm:flex-row justify-between items-center gap-4 p-8 rounded-3xl border relative overflow-hidden group" style={{ background: 'var(--bg-hover-strong)', borderColor: 'var(--border-amber-medium)' }}>
        <div className="absolute inset-0 bg-amber-500/5 transition-opacity opacity-0 group-hover:opacity-100" />
        <div className="flex-1 text-center sm:text-left relative z-10">
          <span className="badge badge-primary mb-4">Creator Economy</span>
          <h2 className="text-4xl font-bold mb-2" style={{ fontFamily: "'Instrument Serif', serif", color: 'var(--amber-400)' }}>The Student Marketplace</h2>
          <p className="text-sm font-medium max-w-lg mb-8 leading-relaxed mx-auto sm:mx-0" style={{ color: 'var(--text-secondary)' }}>
            The authentic peer-to-peer ecosystem. Buy and sell premium study materials, notes, and expert mentorship.
          </p>
          <button className="btn-primary px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg hover:scale-105 transition-transform flex items-center gap-2 mx-auto sm:mx-0">
            <PlusCircle size={16} /> Become a Creator
          </button>
        </div>
        <div className="hidden md:block w-48 h-48 relative z-10">
           <div className="absolute inset-0 rounded-full blur-3xl opacity-50" style={{ background: 'var(--gradient-amber)' }} />
           <div className="absolute inset-0 flex items-center justify-center text-[5rem] drop-shadow-2xl filter hover:scale-110 transition-transform cursor-pointer">🛍️</div>
        </div>
      </motion.div>

      {/* Nav & Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none pb-2 sm:pb-0">
          {['All', 'Notes Packs', 'Mentorship', 'Video Courses', 'Toolkits'].map((f, i) => (
            <motion.button 
              key={f} 
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + (i * 0.05), type: 'spring', stiffness: 300, damping: 25 }}
              onClick={() => setActiveFilter(f)}
              className="whitespace-nowrap px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border shadow-sm"
              style={{
                background: activeFilter === f ? 'var(--text-primary)' : 'var(--bg-input)',
                borderColor: activeFilter === f ? 'var(--text-primary)' : 'var(--border-strong)',
                color: activeFilter === f ? 'var(--bg-base)' : 'var(--text-muted)'
              }}>
              {f}
            </motion.button>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-3 w-full sm:w-64 px-5 py-3 rounded-xl border transition-all" style={{ background: 'var(--bg-input)', borderColor: 'var(--border-strong)' }}>
          <Search size={16} style={{ color: 'var(--text-muted)' }} />
          <input placeholder="Search marketplace..." className="bg-transparent border-none outline-none text-sm font-medium w-full placeholder:text-white/20" style={{ color: 'var(--text-primary)' }} />
        </motion.div>
      </div>

      {/* Empty State Grid */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 25 }}
        className="glass-surface min-h-[400px] flex flex-col items-center justify-center text-center p-12 rounded-3xl" style={{ background: 'var(--bg-glass-card)', borderColor: 'var(--border-subtle)' }}>
        <div className="w-24 h-24 rounded-[2rem] flex items-center justify-center mb-8 border relative shadow-lg" style={{ background: 'var(--bg-hover)', borderColor: 'var(--border-strong)' }}>
          <Store size={40} style={{ color: 'var(--text-muted)' }} />
          <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-xl flex items-center justify-center border shadow-sm" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-strong)' }}>
            <Lock size={16} style={{ color: 'var(--text-muted)' }} />
          </div>
        </div>
        <h3 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Instrument Serif', serif", color: 'var(--text-primary)' }}>Marketplace is Opening Soon</h3>
        <p className="text-sm font-medium max-w-md mx-auto mb-10 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          We are currently onboarding top student creators. No public listings are available yet. Start building your personal vault first!
        </p>
        <div className="flex gap-4">
          <Link href="/dashboard/upload" className="btn-primary py-3 px-8 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:scale-105 transition-transform">
             Upload Your First Note
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
