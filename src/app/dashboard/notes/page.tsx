'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Search, Upload, Download, Star, Lock, Eye, BookOpen,
  Grid, List, FileText, Loader2, BookX
} from 'lucide-react';
import { useAuth } from '@clerk/nextjs';

export default function NotesPage() {
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    async function fetchNotes() {
      try {
        const res = await fetch('/api/notes');
        if (res.ok) {
          const data = await res.json();
          setNotes(data);
        }
      } catch (error) {
        console.error("Failed to fetch notes", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNotes();
  }, []);

  const filtered = notes.filter((n) => {
    return n.title.toLowerCase().includes(search.toLowerCase()) ||
           n.subject.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-1 flex items-center gap-2" style={{ fontFamily: "'Instrument Serif', serif" }}>
            <span className="gradient-text">Notes Vault</span>
            <BookOpen size={20} style={{ color: 'var(--amber-500)' }} />
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Secure, searchable, and AI-indexed study materials.
          </p>
        </div>
        <Link href="/dashboard/upload" className="btn-primary flex items-center gap-2 self-start px-4 py-2 rounded-xl font-medium text-sm transition-all shadow-lg hover:scale-105">
          <Upload size={16} /> Upload Notes
        </Link>
      </motion.div>

      {/* Search & Filters */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 20 }}
        className="glass-surface p-3 rounded-2xl flex flex-col sm:flex-row gap-3 shadow-sm border" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="flex-1 flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all focus-within:shadow-[0_0_15px_rgba(232,168,50,0.15)] focus-within:border-amber-500/30"
          style={{ background: 'var(--bg-input)', borderColor: 'var(--border-strong)' }}>
          <Search size={18} style={{ color: 'var(--text-muted)' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search documents by title or subject..."
            className="bg-transparent text-sm font-medium outline-none flex-1 placeholder:opacity-50"
            style={{ color: 'var(--text-primary)' }}
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(v => v === 'grid' ? 'list' : 'grid')}
            className="p-3 rounded-xl border transition-all hover:scale-105"
            style={{
              background: 'var(--bg-input)',
              borderColor: 'var(--border-strong)',
              color: 'var(--text-muted)'
            }}
          >
            {viewMode === 'grid' ? <List size={18} /> : <Grid size={18} />}
          </button>
        </div>
      </motion.div>

      {/* Main Content Area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32" style={{ color: 'var(--text-muted)' }}>
          <Loader2 size={32} className="animate-spin mb-4" />
          <p className="text-sm font-medium">Loading your vault...</p>
        </div>
      ) : notes.length === 0 ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="flex flex-col items-center justify-center py-32 text-center border border-dashed rounded-3xl"
          style={{ borderColor: 'var(--border-default)', background: 'var(--bg-glass-card)' }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border shadow-sm relative"
            style={{ background: 'var(--bg-hover-strong)', borderColor: 'var(--border-strong)' }}>
            <div className="absolute inset-0 bg-amber-500/10 rounded-2xl animate-pulse" />
            <BookX size={32} style={{ color: 'var(--text-muted)' }} />
          </div>
          <h3 className="text-lg font-bold mb-2">No notes uploaded yet.</h3>
          <p className="text-sm max-w-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
            Your vault is completely empty. Upload PDFs, Word documents, or images to let the AI start indexing your study material.
          </p>
          <Link href="/dashboard/upload" className="btn-primary px-6 py-2.5 rounded-xl text-sm font-medium transition-transform hover:scale-105">
            Upload First Note
          </Link>
        </motion.div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20" style={{ color: 'var(--text-muted)' }}>
          <Search size={32} className="mx-auto mb-4 opacity-50" />
          <p className="text-sm font-medium">No notes match your search.</p>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
          }}
          className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-4' : 'flex flex-col gap-4'}
        >
          {filtered.map((note) => (
            <Link href={`/dashboard/notes/${note.id}`} key={note.id}>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } }
                }}
                className="glass-card p-5 cursor-pointer group block h-full flex flex-col justify-between"
                whileHover={{ y: -4, borderColor: 'var(--border-strong)', boxShadow: 'var(--shadow-amber-glow)' }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 transition-transform group-hover:rotate-6 group-hover:scale-110"
                    style={{ background: 'var(--bg-hover-light)', borderColor: 'var(--border-amber-subtle)' }}>
                    <FileText size={18} style={{ color: 'var(--accent-primary)' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm mb-1 truncate group-hover:text-amber-500 transition-colors" style={{ color: 'var(--text-primary)' }}>{note.title}</h3>
                    <p className="text-[11px] font-medium mb-3 truncate" style={{ color: 'var(--text-muted)' }}>{note.subject}</p>
                    
                    <div className="flex items-center justify-between mt-5 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                      <span className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>
                        {new Date(note.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors group-hover:bg-amber-500/10 group-hover:text-amber-500"
                        style={{ background: 'var(--bg-hover)', color: 'var(--text-secondary)' }}>
                        View
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
}
