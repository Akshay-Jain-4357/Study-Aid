'use client';

import { motion } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import { User, Mail, CreditCard, Bell, Shield, LogOut } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useUser();

  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
        <h2 className="text-2xl font-bold mb-1 flex items-center gap-2" style={{ fontFamily: "'Instrument Serif', serif" }}>
          <span className="gradient-text">Account Settings</span>
        </h2>
        <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Manage your profile and preferences</p>
      </motion.div>

      <div className="grid md:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar Nav */}
        <div className="space-y-2">
          {[
            { id: 'profile', icon: User, label: 'Profile' },
            { id: 'billing', icon: CreditCard, label: 'Billing & Plan' },
            { id: 'notifications', icon: Bell, label: 'Notifications' },
            { id: 'security', icon: Shield, label: 'Security' },
          ].map((tab, i) => (
            <motion.button 
              key={tab.id} 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 25 }}
              className="w-full flex items-center gap-3 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all border"
              style={{
                background: tab.id === 'profile' ? 'var(--bg-hover-strong)' : 'transparent',
                borderColor: tab.id === 'profile' ? 'var(--border-amber-medium)' : 'transparent',
                color: tab.id === 'profile' ? 'var(--amber-400)' : 'var(--text-muted)'
              }}
            >
              <tab.icon size={16} /> {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 25 }} className="space-y-6">
          <div className="glass-surface p-8 rounded-3xl" style={{ background: 'var(--bg-glass-card)', borderColor: 'var(--border-subtle)' }}>
            <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center border" style={{ background: 'var(--bg-hover)', borderColor: 'var(--border-teal-subtle)' }}>
                <User size={16} style={{ color: 'var(--accent-secondary)' }}/>
              </div>
              Profile Information
            </h3>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10 pb-10 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="w-24 h-24 rounded-3xl flex items-center justify-center text-3xl font-bold overflow-hidden shadow-lg border" style={{ background: 'var(--bg-hover-strong)', borderColor: 'var(--border-amber-medium)', color: 'var(--amber-500)' }}>
                {user?.imageUrl ? <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" /> : user?.firstName?.charAt(0) || 'U'}
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)', fontFamily: "'Instrument Serif', serif" }}>{user?.firstName} {user?.lastName}</h4>
                <p className="text-sm font-medium mb-4" style={{ color: 'var(--text-muted)' }}>{user?.primaryEmailAddress?.emailAddress}</p>
                <button className="text-xs px-4 py-2 rounded-xl font-bold uppercase tracking-wider transition-all border hover:scale-105" style={{ background: 'var(--bg-input)', borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}>Change Avatar</button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider ml-1" style={{ color: 'var(--text-muted)' }}>First Name</label>
                <input type="text" readOnly value={user?.firstName || ''} className="w-full rounded-xl px-5 py-3 text-sm font-medium outline-none transition-all border" style={{ background: 'var(--bg-input)', borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider ml-1" style={{ color: 'var(--text-muted)' }}>Last Name</label>
                <input type="text" readOnly value={user?.lastName || ''} className="w-full rounded-xl px-5 py-3 text-sm font-medium outline-none transition-all border" style={{ background: 'var(--bg-input)', borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider ml-1" style={{ color: 'var(--text-muted)' }}>Email Address</label>
                <input type="email" readOnly value={user?.primaryEmailAddress?.emailAddress || ''} className="w-full rounded-xl px-5 py-3 text-sm font-medium outline-none transition-all border cursor-not-allowed opacity-50" style={{ background: 'var(--bg-input)', borderColor: 'var(--border-strong)', color: 'var(--text-muted)' }} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
