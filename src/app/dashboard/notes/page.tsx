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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-1">Notes Vault</h2>
          <p className="text-sm text-gray-400">
            Secure, searchable, and AI-indexed study materials.
          </p>
        </div>
        <Link href="/dashboard/upload" className="btn-primary flex items-center gap-2 self-start bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 font-medium text-sm transition-colors">
          <Upload size={16} /> Upload Notes
        </Link>
      </motion.div>

      {/* Search & Filters */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-black/50 border border-white/10">
          <Search size={16} className="text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search documents by title or subject..."
            className="bg-transparent text-sm outline-none flex-1 text-white placeholder:text-gray-600"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(v => v === 'grid' ? 'list' : 'grid')}
            className="p-2.5 rounded-lg bg-black/50 border border-white/10 text-gray-400 hover:text-white transition-colors"
          >
            {viewMode === 'grid' ? <List size={16} /> : <Grid size={16} />}
          </button>
        </div>
      </motion.div>

      {/* Main Content Area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 text-gray-500">
          <Loader2 size={32} className="animate-spin mb-4" />
          <p className="text-sm">Loading your vault...</p>
        </div>
      ) : notes.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
            <BookX size={32} className="text-gray-500" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No notes uploaded yet.</h3>
          <p className="text-sm text-gray-500 max-w-sm mb-6">
            Your vault is completely empty. Upload PDFs, Word documents, or images to let the AI start indexing your study material.
          </p>
          <Link href="/dashboard/upload" className="bg-white text-black px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
            Upload First Note
          </Link>
        </motion.div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <Search size={32} className="mx-auto mb-4 opacity-50" />
          <p className="text-sm">No notes match your search.</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-4' : 'flex flex-col gap-4'}>
          {filtered.map((note) => (
            <Link href={`/dashboard/notes/${note.id}`} key={note.id} className="bg-black border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all cursor-pointer group block">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                  <FileText size={18} className="text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm mb-1 truncate text-white group-hover:text-indigo-300 transition-colors">{note.title}</h3>
                  <p className="text-xs text-gray-500 mb-3 truncate">{note.subject}</p>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                    <span className="text-xs text-gray-500">{new Date(note.createdAt).toLocaleDateString()}</span>
                    <span className="text-xs font-medium text-white bg-white/10 px-3 py-1.5 rounded-md hover:bg-white/20 transition-colors">
                      View
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
