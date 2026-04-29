'use client';

import { motion } from 'framer-motion';
import { Users, Video, Mic, MicOff, MessageSquare, Plus, Link as LinkIcon, Share2, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

const ROOMS = [
  { id: '1', name: 'DSA Final Exam Prep', members: 12, topic: 'Data Structures', active: true, tag: 'Public' },
  { id: '2', name: 'ML Assignment Group 4', members: 4, topic: 'Machine Learning', active: true, tag: 'Private' },
  { id: '3', name: 'OS Concepts Review', members: 8, topic: 'Operating Systems', active: false, tag: 'Public' },
];

const FRIENDS = [
  { name: 'Kavya S.', status: 'online', current: 'Studying DSA' },
  { name: 'Rohan D.', status: 'offline', current: 'Last seen 2h ago' },
  { name: 'Priya K.', status: 'in-room', current: 'In Room: DSA Final Exam Prep' },
];

export default function CollaboratePage() {
  const [micOn, setMicOn] = useState(false);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold mb-1">Study Rooms</h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Collaborate with peers, screen share, and discuss.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 self-start">
          <Plus size={16} /> Create Room
        </button>
      </motion.div>

      {/* Main Layout Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Rooms List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold flex items-center gap-2">
            <Users size={16} style={{ color: '#8b5cf6' }} /> Active Rooms
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            {ROOMS.map((room, i) => (
              <motion.div key={room.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="glass-card p-5 group cursor-pointer hover:border-indigo-500/30 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-sm mb-1">{room.name}</h4>
                    <span className="text-xs px-2 py-0.5 rounded-md" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}>
                      {room.topic}
                    </span>
                  </div>
                  <span className="badge" style={{
                    background: room.tag === 'Public' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                    color: room.tag === 'Public' ? '#10b981' : '#f59e0b',
                    fontSize: '0.65rem', padding: '2px 6px', border: 'none'
                  }}>{room.tag}</span>
                </div>

                <div className="flex items-center justify-between mt-4 border-t pt-3" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <div className="flex -space-x-2">
                    {Array(Math.min(minAmount(room.members), 4)).fill(0).map((_, idx) => (
                      <div key={idx} className="w-6 h-6 rounded-full border border-gray-800 bg-indigo-500/50 flex items-center justify-center text-[10px] font-bold">
                        {String.fromCharCode(65 + idx)}
                      </div>
                    ))}
                    {room.members > 4 && (
                      <div className="w-6 h-6 rounded-full border border-gray-800 bg-gray-800 flex items-center justify-center text-[10px] text-gray-400">
                        +{room.members - 4}
                      </div>
                    )}
                  </div>
                  <button className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Join Room
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Active Call UI Mockup */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="mt-8 glass-card overflow-hidden border-indigo-500/30">
            <div className="px-5 py-3 border-b border-white/5 flex justify-between items-center bg-indigo-500/5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="font-bold text-sm">Live: ML Assignment Group 4</span>
              </div>
              <div className="text-xs text-indigo-400">00:42:15</div>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3 bg-black/40 h-64">
              <div className="rounded-xl bg-gray-800/50 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center text-xl">A</div>
                </div>
                <div className="absolute bottom-2 left-2 text-xs bg-black/60 px-2 py-0.5 rounded">You</div>
                {!micOn && <div className="absolute top-2 right-2 text-red-400 bg-black/60 p-1 rounded-full"><MicOff size={12} /></div>}
              </div>
              <div className="rounded-xl bg-gray-800/50 flex items-center justify-center relative">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-xl">P</div>
                <div className="absolute bottom-2 left-2 text-xs bg-black/60 px-2 py-0.5 rounded">Priya K.</div>
              </div>
            </div>
            <div className="p-3 bg-gray-900/50 flex justify-center gap-3">
              <button 
                onClick={() => setMicOn(!micOn)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${micOn ? 'bg-white/10 hover:bg-white/20' : 'bg-red-500/20 hover:bg-red-500/30 text-red-500'}`}>
                {micOn ? <Mic size={18} /> : <MicOff size={18} />}
              </button>
              <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Video size={18} />
              </button>
              <button className="px-4 h-10 rounded-full bg-red-500 hover:bg-red-600 font-bold text-xs transition-colors">
                Leave
              </button>
            </div>
          </motion.div>
        </div>

        {/* Friends Sidebar */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="glass-card p-5">
            <h3 className="font-bold flex items-center justify-between mb-4">
              <span>Friends Activity</span>
              <button className="text-gray-400 hover:text-white"><Plus size={16} /></button>
            </h3>
            <div className="space-y-4">
              {FRIENDS.map((f, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold">
                        {f.name[0]}
                      </div>
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-gray-900"
                        style={{ background: f.status === 'online' ? '#10b981' : f.status === 'in-room' ? '#8b5cf6' : '#6b7280' }} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{f.name}</div>
                      <div className="text-[10px] text-gray-400">{f.current}</div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-white"><MessageSquare size={14} /></button>
                </div>
              ))}
            </div>
            
            <div className="mt-5 pt-4 border-t border-white/5">
              <button className="w-full py-2 rounded-lg border border-indigo-500/30 text-indigo-400 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-indigo-500/10 transition-colors">
                <LinkIcon size={14} /> Invite Friends
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="glass-card p-5 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
            <h3 className="font-bold text-sm mb-2 text-indigo-300">Invite & Earn</h3>
            <p className="text-xs text-gray-400 mb-4">Earn 1 month of Pro for every 3 friends you invite. You have 1 referral so far.</p>
            <div className="flex gap-2">
              <input type="text" readOnly value="studyaid.in/ref/aryan" className="input-field text-xs px-3 py-1.5 flex-1 bg-black/20" />
              <button className="w-8 flex items-center justify-center rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors">
                <Share2 size={12} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function minAmount(a: number) {
  return a;
}
