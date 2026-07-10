'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UploadCloud, ArrowLeft, Loader2, File, CheckCircle } from 'lucide-react';

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title || !subject) {
      setError('Please fill in all required fields and select a file.');
      return;
    }

    setError('');
    setUploading(true);

    // Simulate file upload progress
    for (let i = 0; i <= 90; i += 10) {
      await new Promise(r => setTimeout(r, 100));
      setProgress(i);
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      formData.append('subject', subject);
      formData.append('isPublic', isPublic.toString());

      const res = await fetch('/api/notes/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Upload failed');
      }
      
      setProgress(100);
      setSuccess(true);
      
      setTimeout(() => {
        router.push('/dashboard/notes');
        router.refresh();
      }, 1500);

    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}>
        <Link href="/dashboard/notes" className="flex items-center gap-2 text-sm font-medium tracking-wide hover:text-amber-500 mb-10 transition-colors w-fit" style={{ color: 'var(--text-muted)' }}>
          <ArrowLeft size={16} /> Back to Vault
        </Link>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 20 }} className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-3 flex items-center gap-3" style={{ fontFamily: "'Instrument Serif', serif" }}>
          <span className="gradient-text">Upload Document</span>
          <UploadCloud size={28} style={{ color: 'var(--amber-500)' }} />
        </h1>
        <p className="text-base font-medium" style={{ color: 'var(--text-muted)' }}>Add materials to your vault. Our AI will automatically index them for semantic search.</p>
      </motion.div>

      {success ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-surface border rounded-3xl p-16 text-center shadow-lg"
          style={{ borderColor: 'var(--border-teal-subtle)', background: 'var(--bg-glass-card)' }}>
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 relative" style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-teal-subtle)' }}>
            <div className="absolute inset-0 bg-teal-500/10 rounded-2xl animate-pulse" />
            <CheckCircle size={40} style={{ color: 'var(--accent-secondary)' }} />
          </div>
          <h2 className="text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)', fontFamily: "'Instrument Serif', serif" }}>Upload Complete!</h2>
          <p className="text-base font-medium mb-8" style={{ color: 'var(--text-secondary)' }}>Your document is safely stored and indexed.</p>
          <Loader2 size={28} className="animate-spin mx-auto" style={{ color: 'var(--accent-secondary)' }} />
        </motion.div>
      ) : (
        <form onSubmit={handleUpload} className="space-y-8">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}

          {/* Drag & Drop Zone */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 25 }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed rounded-3xl p-14 text-center transition-all group relative overflow-hidden"
            style={{
              borderColor: file ? 'var(--amber-500)' : 'var(--border-strong)',
              background: file ? 'var(--bg-hover-strong)' : 'var(--bg-hover-light)',
            }}
          >
            {/* Ambient hover glow */}
            <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            {file ? (
              <div className="flex flex-col items-center relative z-10">
                <File size={48} className="mb-5 drop-shadow-lg" style={{ color: 'var(--accent-primary)' }} />
                <p className="font-bold mb-1 text-lg" style={{ color: 'var(--text-primary)' }}>{file.name}</p>
                <p className="text-xs font-medium uppercase tracking-wider mb-6" style={{ color: 'var(--text-muted)' }}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                <button type="button" onClick={() => setFile(null)} className="text-xs font-bold uppercase tracking-wider text-red-500 hover:text-red-400 transition-colors px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20">Remove file</button>
              </div>
            ) : (
              <div className="flex flex-col items-center relative z-10">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm border transition-transform group-hover:scale-110 group-hover:rotate-6"
                  style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
                  <UploadCloud size={28} style={{ color: 'var(--text-muted)' }} className="group-hover:text-amber-500 transition-colors" />
                </div>
                <p className="font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>Drag and drop your file here</p>
                <p className="text-sm font-medium mb-8" style={{ color: 'var(--text-muted)' }}>Supports PDF, DOCX, TXT, PNG, JPG (up to 50MB)</p>
                <label className="btn-primary px-6 py-3 rounded-xl text-sm font-bold cursor-pointer transition-transform hover:scale-105 shadow-lg">
                  Browse Files
                  <input type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                </label>
              </div>
            )}
          </motion.div>

          {/* Metadata Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 25 }}
            className="grid md:grid-cols-2 gap-8 glass-surface p-8 rounded-3xl border" style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-glass-card)' }}>
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Document Title <span className="text-red-400">*</span></label>
              <input 
                type="text" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Intro to Computer Networks Ch. 1" 
                className="w-full rounded-xl px-5 py-3 text-sm font-medium outline-none transition-all focus:shadow-[0_0_15px_rgba(232,168,50,0.15)] focus:border-amber-500/30 border"
                style={{ background: 'var(--bg-input)', borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
              />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Subject <span className="text-red-400">*</span></label>
              <input 
                type="text" 
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="e.g. Computer Science" 
                className="w-full rounded-xl px-5 py-3 text-sm font-medium outline-none transition-all focus:shadow-[0_0_15px_rgba(232,168,50,0.15)] focus:border-amber-500/30 border"
                style={{ background: 'var(--bg-input)', borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
              />
            </div>
            
            <div className="space-y-4 md:col-span-2 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Privacy Setting</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="radio" checked={!isPublic} onChange={() => setIsPublic(false)} name="privacy" className="accent-amber-500 w-4 h-4" />
                  <span className="text-sm font-medium transition-colors group-hover:text-amber-500" style={{ color: !isPublic ? 'var(--text-primary)' : 'var(--text-muted)' }}>Private (Only me)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="radio" checked={isPublic} onChange={() => setIsPublic(true)} name="privacy" className="accent-amber-500 w-4 h-4" />
                  <span className="text-sm font-medium transition-colors group-hover:text-amber-500" style={{ color: isPublic ? 'var(--text-primary)' : 'var(--text-muted)' }}>Public (Community can view)</span>
                </label>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-xs font-medium max-w-sm" style={{ color: 'var(--text-muted)' }}>By uploading, you confirm that you own the rights to distribute this material.</p>
            <button 
              type="submit" 
              disabled={uploading}
              className="btn-primary w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-lg"
            >
              {uploading ? (
                <><Loader2 size={18} className="animate-spin" /> {progress}%</>
              ) : (
                'Upload & Index Document'
              )}
            </button>
          </motion.div>
        </form>
      )}
    </div>
  );
}
