'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { UserButton, useUser, SignOutButton } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, BookOpen, BarChart3, Clock, Target, Users, Settings,
  LogOut, Menu, X, Bell, Search, Zap, Home, Trophy, Shield,
  CreditCard, Star, TrendingUp, MessageSquare, ChevronLeft,
  Lock, Store
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'Notes Vault', href: '/dashboard/notes', icon: BookOpen },
  { label: 'AI Tutor', href: '/dashboard/ai-tutor', icon: Brain, premium: false },
  { label: 'Study Planner', href: '/dashboard/planner', icon: Clock },
  { label: 'Assignments', href: '/dashboard/assignments', icon: Target },
  { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { label: 'Leaderboard', href: '/dashboard/leaderboard', icon: Trophy },
  { label: 'Collaborate', href: '/dashboard/collaborate', icon: Users, premium: true },
  { label: 'Marketplace', href: '/dashboard/marketplace', icon: Store, premium: false },
];

const BOTTOM_NAV = [
  { label: 'Upgrade Plan', href: '/pricing', icon: Zap },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

interface Stats {
  plan: string;
  credits: string;
  streak: number;
  xp: number;
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  stats: Stats | null;
}

function Sidebar({ open, onClose, stats }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useUser();
  const userName = user?.fullName || 'Student';

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: open ? 0 : undefined }}
        className={`sidebar ${open ? 'open' : ''}`}
        style={{ zIndex: 50 }}
      >
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
              <Brain size={17} color="white" />
            </div>
            <span className="font-bold text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Study<span className="gradient-text">Aid</span>
            </span>
          </Link>
          <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <X size={16} />
          </button>
        </div>

        <div className="glass-card p-3 mb-6 flex items-center gap-3" style={{ borderRadius: '12px' }}>
          <div className="flex-shrink-0">
            <UserButton appearance={{ elements: { avatarBox: "w-10 h-10 rounded-xl" } }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm truncate">{userName}</div>
            <div className="flex items-center gap-1.5">
              <span className="badge badge-primary text-xs" style={{ padding: '1px 8px', fontSize: '0.65rem' }}>
                {stats?.plan || 'FREE'}
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-1">
          <div className="text-xs font-semibold mb-2 px-2" style={{ color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Main Menu
          </div>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
                style={{
                  background: isActive ? 'rgba(99,102,241,0.12)' : undefined,
                  color: isActive ? '#a5b4fc' : undefined,
                }}
              >
                <item.icon size={17} />
                <span className="flex-1">{item.label}</span>
                {item.premium && (
                  <Lock size={12} style={{ color: '#f59e0b' }} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Streak card */}
        <div className="my-6 p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🔥</span>
            <span className="font-bold text-sm tracking-tight">{stats?.streak || 0} Day Streak!</span>
          </div>
          <p className="text-[10px] text-gray-400 leading-normal">Keep it going! Every day you learn is a step toward mastery.</p>
          <div className="h-1.5 w-full bg-white/5 rounded-full mt-3 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: stats?.streak ? '100%' : '10%' }}
              className="h-full bg-indigo-500" 
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          {BOTTOM_NAV.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              <item.icon size={17} />
              {item.label}
            </Link>
          ))}
          <SignOutButton>
            <button className="nav-link w-full text-left" style={{ color: '#ef4444' }}>
              <LogOut size={17} />
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </motion.aside>
    </>
  );
}

function TopBar({ onMenuClick, stats }: { onMenuClick: () => void, stats: Stats | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const isSubPage = pathname.split('/').length > 3;
  const pageTitle = NAV_ITEMS.find(n => n.href === pathname)?.label ?? 'Dashboard';
  
  const [showNotifs, setShowNotifs] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifs(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 px-6 h-16"
      style={{ background: 'rgba(8,8,16,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border-subtle)' }}>
      <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <Menu size={18} />
      </button>

      {isSubPage ? (
        <button onClick={() => router.back()} className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
          <ChevronLeft size={18} />
        </button>
      ) : null}

      <h1 className="font-bold text-lg flex-1">{pageTitle}</h1>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)', minWidth: 200 }}>
          <Search size={15} style={{ color: 'var(--text-muted)' }} />
          <input placeholder="Quick search…" className="bg-transparent text-sm outline-none flex-1" style={{ color: 'var(--text-secondary)' }} />
          <kbd className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--text-muted)' }}>⌘K</kbd>
        </div>

        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative p-2 rounded-xl transition-colors" 
            style={{ background: showNotifs ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)' }}
          >
            <Bell size={17} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#0a0a0a]" />
          </button>

          <AnimatePresence>
            {showNotifs && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-72 bg-black border border-white/10 rounded-xl shadow-2xl overflow-hidden"
              >
                <div className="p-3 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                  <span className="font-semibold text-sm">Notifications</span>
                  <button className="text-xs text-indigo-400 hover:text-indigo-300">Mark all read</button>
                </div>
                <div className="p-4 text-center">
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Bell size={16} className="text-gray-500" />
                  </div>
                  <p className="text-sm font-medium">You&apos;re all caught up!</p>
                  <p className="text-xs text-gray-500 mt-1">No new alerts right now.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
          <Brain size={15} style={{ color: '#a5b4fc' }} />
          <span className="text-xs font-semibold text-indigo-300">
            {stats?.credits || '0'} Credits
          </span>
        </div>

        <UserButton appearance={{ elements: { avatarBox: "w-8 h-8 rounded-full border border-white/10 shadow-lg" } }} />
      </div>
    </header>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/user/stats');
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {}
    }
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} stats={stats} />
      <div className="main-content">
        <TopBar onMenuClick={() => setSidebarOpen(true)} stats={stats} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
