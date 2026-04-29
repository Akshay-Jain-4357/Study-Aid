'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Star, StarHalf, Play, FileText, ChevronRight, Download, Search, Filter } from 'lucide-react';
import { useState } from 'react';

const MARKETPLACE_ITEMS = [
  { id: '1', title: 'Complete Web Dev Bootcamp Notes', author: 'Akshay S.', type: 'Notes Pack', price: 499, rating: 4.9, reviews: 1240, cover: 'bg-gradient-to-br from-indigo-500 to-purple-600', hue: 'indigo' },
  { id: '2', title: '1-on-1 System Design Mock Interview', author: 'Priya M. (SDE 2)', type: 'Mentorship', price: 1499, rating: 5.0, reviews: 85, cover: 'bg-gradient-to-br from-emerald-500 to-teal-600', hue: 'emerald' },
  { id: '3', title: 'GATE CS 2025: Ultimate Cheat Sheets', author: 'Topper Air 42', type: 'Exam Pack', price: 299, rating: 4.8, reviews: 890, cover: 'bg-gradient-to-br from-orange-500 to-red-600', hue: 'orange' },
  { id: '4', title: 'Resume Review & Career Roadmap', author: 'Rahul D.', type: 'Service', price: 899, rating: 4.7, reviews: 420, cover: 'bg-gradient-to-br from-blue-500 to-cyan-600', hue: 'blue' },
  { id: '5', title: 'Mastering Dynamic Programming', author: 'CodeWizard', type: 'Video Course', price: 799, rating: 4.9, reviews: 2150, cover: 'bg-gradient-to-br from-pink-500 to-rose-600', hue: 'pink' },
  { id: '6', title: 'MBA Financial Accounting Templates', author: 'IIM Alpha', type: 'Toolkit', price: 399, rating: 4.6, reviews: 310, cover: 'bg-gradient-to-br from-yellow-500 to-amber-600', hue: 'yellow' },
];

export default function MarketplacePage() {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-8 rounded-3xl border border-indigo-500/20">
        <div className="flex-1">
          <span className="badge badge-primary mb-3">Creator Economy</span>
          <h2 className="text-3xl font-black mb-2" style={{ fontFamily: 'Outfit' }}>The Student Marketplace</h2>
          <p className="text-sm text-indigo-200 max-w-lg mb-6 leading-relaxed">
            Buy and sell premium notes, exam packs, video courses, and 1-on-1 mentorship. Top creators make over ₹50k/month passively.
          </p>
          <button className="btn-primary text-sm px-6 py-2 shadow-lg shadow-indigo-500/20">Become a Creator</button>
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

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MARKETPLACE_ITEMS.map((item, i) => (
          <motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
            className="group glass-card overflow-hidden cursor-pointer hover:border-white/20 transition-all hover:shadow-[0_8px_30px_rgba(255,255,255,0.05)]">
            {/* Thumbnail */}
            <div className={`h-40 w-full ${item.cover} p-4 flex flex-col justify-between relative`}>
              <div className="flex justify-between items-start">
                <span className="px-2 py-1 bg-black/40 backdrop-blur-md rounded-md text-[10px] font-bold uppercase tracking-wider text-white">
                  {item.type}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ShoppingCart size={14} className="text-white" />
                </div>
              </div>
              <div className="text-white font-black text-xl leading-tight w-4/5 shadow-sm" style={{ fontFamily: 'Outfit' }}>
                {item.title}
              </div>
            </div>

            {/* Details */}
            <div className="p-5">
              <div className="flex justify-between items-center mb-3">
                <div className="text-xs font-semibold text-white/50">By {item.author}</div>
                <div className="flex items-center gap-1 text-xs text-yellow-500 font-bold">
                  <Star size={12} fill="currentColor" /> {item.rating} <span className="text-white/30 font-normal">({item.reviews})</span>
                </div>
              </div>
              <div className="flex justify-between items-end mt-4">
                <div className="text-2xl font-black" style={{ fontFamily: 'Outfit' }}>₹{item.price}</div>
                <button className={`text-sm font-bold bg-${item.hue}-500/10 text-${item.hue}-400 px-4 py-2 rounded-lg hover:bg-${item.hue}-500/20 transition-colors`}>
                  Buy Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
