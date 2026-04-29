'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Lock, Shield, CreditCard, ChevronRight, Check } from 'lucide-react';
import { mockUser } from '@/lib/mockData';

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'plan', label: 'Subscription', icon: CreditCard },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-xl font-bold mb-1">Settings</h2>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Manage your account, subscription, and preferences.</p>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          className="space-y-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left"
              style={{
                background: activeTab === tab.id ? 'rgba(99,102,241,0.1)' : 'transparent',
                color: activeTab === tab.id ? '#a5b4fc' : 'var(--text-secondary)',
              }}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="md:col-span-3 glass-card p-6">
          
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h3 className="font-bold text-lg mb-4">Profile Information</h3>
              
              <div className="flex items-center gap-4 border-b border-gray-800 pb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl font-bold">
                  {mockUser.name[0]}
                </div>
                <div>
                  <button className="px-3 py-1.5 rounded-lg border border-gray-700 text-sm font-medium hover:bg-white/5 transition-colors">
                    Change Avatar
                  </button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Full Name</label>
                  <input className="input-field" defaultValue={mockUser.name} />
                </div>
                <div>
                  <label className="form-label">Email</label>
                  <input className="input-field" defaultValue={mockUser.email} disabled />
                </div>
                <div>
                  <label className="form-label">College/University</label>
                  <input className="input-field" defaultValue={mockUser.college} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="form-label">Semester</label>
                    <input className="input-field" defaultValue={mockUser.semester} type="number" />
                  </div>
                  <div>
                    <label className="form-label">Branch</label>
                    <input className="input-field" defaultValue={mockUser.branch} />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button className="btn-primary">Save Changes</button>
              </div>
            </div>
          )}

          {activeTab === 'plan' && (
            <div className="space-y-6">
              <h3 className="font-bold text-lg mb-4">Subscription Plan</h3>
              
              <div className="p-5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 flex flex-col sm:flex-row shadow-[0_0_20px_rgba(99,102,241,0.1)] gap-4 sm:items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-lg text-indigo-400 capitalize">{mockUser.plan} Plan</span>
                    <span className="badge badge-primary text-[10px]">Active</span>
                  </div>
                  <p className="text-sm text-gray-400">Renews on Nov 25, 2024</p>
                </div>
                <div className="flex gap-2">
                  <button className="btn-secondary text-sm px-4">Cancel</button>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-sm px-4 py-2 rounded-md transition-colors">
                    Upgrade to Elite
                  </button>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold text-sm mb-3">Billing History</h4>
                <div className="border border-gray-800 rounded-lg overflow-hidden divide-y divide-gray-800">
                  {[
                    { date: 'Oct 25, 2024', amount: '₹99', invoice: '#INV-0012' },
                    { date: 'Sep 25, 2024', amount: '₹99', invoice: '#INV-0011' },
                    { date: 'Aug 25, 2024', amount: '₹0', invoice: 'Free Trial' },
                  ].map((inv, i) => (
                    <div key={i} className="flex items-center justify-between p-3 text-sm">
                      <div className="text-gray-300">{inv.date}</div>
                      <div className="text-gray-400">{inv.amount}</div>
                      <button className="text-indigo-400 hover:text-indigo-300">Receipt</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="font-bold text-lg mb-4">Notification Preferences</h3>
              
              <div className="space-y-4">
                {[
                  { title: 'Assignment Reminders', desc: 'Get notified 24h before an assignment is due', checked: true },
                  { title: 'Exam Countdown', desc: 'Daily alerts when an exam is less than 7 days away', checked: true },
                  { title: 'Study Streak Alerts', desc: 'Reminders to keep your streak alive', checked: true },
                  { title: 'Marketing Emails', desc: 'Offers, new features, and updates', checked: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-start justify-between p-4 rounded-xl border border-gray-800">
                    <div>
                      <div className="font-semibold text-sm mb-1">{item.title}</div>
                      <div className="text-xs text-gray-400">{item.desc}</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={item.checked} />
                      <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="font-bold text-lg mb-4">Security Settings</h3>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-gray-800 flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-sm mb-1">Password</div>
                    <div className="text-xs text-gray-400">Last changed 3 months ago</div>
                  </div>
                  <button className="btn-secondary text-sm">Update</button>
                </div>

                <div className="p-4 rounded-xl border border-gray-800 flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-sm flex items-center gap-2 mb-1">
                      Two-Factor Authentication (2FA)
                      <span className="badge badge-success text-[10px]">Enabled</span>
                    </div>
                    <div className="text-xs text-gray-400">Authenticator App configured</div>
                  </div>
                  <button className="btn-secondary text-sm">Manage</button>
                </div>
                
                <div className="p-4 rounded-xl border border-red-900/30 bg-red-900/10 mt-8">
                  <div className="font-semibold text-sm text-red-400 mb-1">Danger Zone</div>
                  <div className="text-xs text-gray-400 mb-3">Permanently delete your account and all study data.</div>
                  <button className="px-4 py-2 bg-red-500/20 text-red-500 rounded border border-red-500/30 text-sm font-semibold hover:bg-red-500/30 transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
