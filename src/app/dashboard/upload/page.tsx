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
      <Link href="/dashboard/notes" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors w-fit">
        <ArrowLeft size={16} /> Back to Vault
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Upload Document</h1>
        <p className="text-gray-400">Add materials to your vault. Our AI will automatically index them for semantic search.</p>
      </div>

      {success ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Upload Complete!</h2>
          <p className="text-emerald-200/60 mb-6">Your document is safely stored and indexed.</p>
          <Loader2 size={24} className="animate-spin text-emerald-500 mx-auto" />
        </motion.div>
      ) : (
        <form onSubmit={handleUpload} className="space-y-8">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}

          {/* Drag & Drop Zone */}
          <div 
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-colors ${file ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-white/10 hover:border-white/20 bg-white/[0.02]'}`}
          >
            {file ? (
              <div className="flex flex-col items-center">
                <File size={40} className="text-indigo-400 mb-4" />
                <p className="text-white font-medium mb-1">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                <button type="button" onClick={() => setFile(null)} className="text-xs text-red-400 mt-4 hover:underline">Remove file</button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
                  <UploadCloud size={24} className="text-gray-400" />
                </div>
                <p className="text-white font-medium mb-1">Drag and drop your file here</p>
                <p className="text-sm text-gray-500 mb-6">Supports PDF, DOCX, TXT, PNG, JPG (up to 50MB)</p>
                <label className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium cursor-pointer hover:bg-gray-200 transition-colors">
                  Browse Files
                  <input type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                </label>
              </div>
            )}
          </div>

          {/* Metadata Form */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Document Title <span className="text-red-400">*</span></label>
              <input 
                type="text" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Intro to Computer Networks Ch. 1" 
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Subject <span className="text-red-400">*</span></label>
              <input 
                type="text" 
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="e.g. Computer Science" 
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-300">Privacy Setting</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" checked={!isPublic} onChange={() => setIsPublic(false)} name="privacy" className="accent-indigo-500" />
                  <span className="text-sm text-gray-400">Private (Only me)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" checked={isPublic} onChange={() => setIsPublic(true)} name="privacy" className="accent-indigo-500" />
                  <span className="text-sm text-gray-400">Public (Community can view)</span>
                </label>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <p className="text-xs text-gray-500 max-w-sm">By uploading, you confirm that you own the rights to distribute this material.</p>
            <button 
              type="submit" 
              disabled={uploading}
              className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {uploading ? (
                <><Loader2 size={16} className="animate-spin" /> {progress}%</>
              ) : (
                'Upload & Index Document'
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
