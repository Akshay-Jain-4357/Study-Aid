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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-8 rounded-3xl border border-indigo-500/20">
        <div className="flex-1 text-center sm:text-left">
          <span className="badge badge-primary mb-3">Creator Economy</span>
          <h2 className="text-3xl font-black mb-2" style={{ fontFamily: 'Outfit' }}>The Student Marketplace</h2>
          <p className="text-sm text-indigo-200 max-w-lg mb-6 leading-relaxed mx-auto sm:mx-0">
            The authentic peer-to-peer ecosystem. Buy and sell premium study materials, notes, and expert mentorship.
          </p>
          <button className="btn-primary text-sm px-8 py-2.5 shadow-lg shadow-indigo-500/20 flex items-center gap-2 mx-auto sm:mx-0">
            <PlusCircle size={16} /> Become a Creator
          </button>
        </div>
        <div className="hidden md:block w-48 h-48 relative">
           <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full" />
           <div className="absolute inset-0 flex items-center justify-center text-6xl">🛍️</div>
        </div>
      </motion.div>

      {/* Nav & Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none">
          {['All', 'Notes Packs', 'Mentorship', 'Video Courses', 'Toolkits'].map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeFilter === f ? 'bg-white text-black' : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/5'}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 w-full sm:w-64 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
          <Search size={16} className="text-white/40" />
          <input placeholder="Search marketplace..." className="bg-transparent border-none outline-none text-sm w-full" />
        </div>
      </div>

      {/* Empty State Grid */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        className="glass-card min-h-[400px] flex flex-col items-center justify-center text-center p-12">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 relative">
          <Store size={32} className="text-gray-400" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-black rounded-full flex items-center justify-center border border-white/10">
            <Lock size={14} className="text-gray-500" />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-3 font-outfit">Marketplace is Opening Soon</h3>
        <p className="text-sm text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
          We are currently onboarding top student creators. No public listings are available yet. Start building your personal vault first!
        </p>
        <div className="flex gap-4">
          <Link href="/dashboard/upload" className="btn-primary py-2.5 px-6 rounded-xl text-sm font-medium flex items-center gap-2">
             Upload Your First Note
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
