'use client';

import { motion } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import { User, Mail, CreditCard, Bell, Shield, LogOut } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useUser();

  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-xl font-bold mb-1">Account Settings</h2>
        <p className="text-sm text-gray-400">Manage your profile and preferences</p>
      </motion.div>

      <div className="grid md:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar Nav */}
        <div className="space-y-1">
          {[
            { id: 'profile', icon: User, label: 'Profile' },
            { id: 'billing', icon: CreditCard, label: 'Billing & Plan' },
            { id: 'notifications', icon: Bell, label: 'Notifications' },
            { id: 'security', icon: Shield, label: 'Security' },
          ].map(tab => (
            <button key={tab.id} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${tab.id === 'profile' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="font-bold mb-6 flex items-center gap-2"><User size={18} className="text-indigo-400"/> Profile Information</h3>
            
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-full bg-indigo-500/20 border-2 border-indigo-500/40 flex items-center justify-center text-2xl font-bold overflow-hidden">
                {user?.imageUrl ? <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" /> : user?.firstName?.charAt(0) || 'U'}
              </div>
              <div>
                <h4 className="font-bold text-lg">{user?.firstName} {user?.lastName}</h4>
                <p className="text-sm text-gray-400">{user?.primaryEmailAddress?.emailAddress}</p>
                <button className="mt-3 text-xs bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-lg font-medium transition-colors">Change Avatar</button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 font-medium ml-1">First Name</label>
                <input type="text" readOnly value={user?.firstName || ''} className="input-field w-full text-sm py-2" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 font-medium ml-1">Last Name</label>
                <input type="text" readOnly value={user?.lastName || ''} className="input-field w-full text-sm py-2" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs text-gray-400 font-medium ml-1">Email Address</label>
                <input type="email" readOnly value={user?.primaryEmailAddress?.emailAddress || ''} className="input-field w-full text-sm py-2 text-gray-400 bg-black/40 cursor-not-allowed" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
