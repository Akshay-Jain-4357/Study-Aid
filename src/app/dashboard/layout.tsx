'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { UserButton, useUser, SignOutButton } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';
import {
  Brain, BookOpen, BarChart3, Clock, Target, Users, Settings,
  LogOut, Menu, X, Bell, Search, Zap, Home, Trophy, Shield,
  CreditCard, Star, TrendingUp, MessageSquare, ChevronLeft,
  Lock, Store, Sun, Moon, Sparkles
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
      >
        {/* Brand Logo */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center relative overflow-hidden"
              style={{ background: 'var(--gradient-brand)' }}>
              <Brain size={18} className="text-white relative z-10" />
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="font-bold text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Study<span className="gradient-text">Aid</span>
            </span>
          </Link>
          <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            style={{ background: 'rgba(99,102,241,0.08)' }}>
            <X size={16} />
          </button>
        </div>

        {/* User Card */}
        <div className="glass-card p-3 mb-6 flex items-center gap-3" style={{ borderRadius: 'var(--radius-lg)' }}>
          <div className="flex-shrink-0">
            <UserButton appearance={{ elements: { avatarBox: "w-10 h-10 rounded-xl" } }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm truncate">{userName}</div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="badge badge-primary text-xs" style={{ padding: '1px 8px', fontSize: '0.6rem' }}>
                {stats?.plan || 'FREE'}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-0.5 overflow-y-auto">
          <div className="text-[10px] font-bold mb-2 px-3 uppercase tracking-[0.1em]"
            style={{ color: 'var(--text-muted)' }}>
            Main Menu
          </div>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                <motion.div
                  className="flex items-center justify-center w-8 h-8 rounded-lg"
                  style={{
                    background: isActive ? 'rgba(99,102,241,0.15)' : 'transparent',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon size={17} style={{ color: isActive ? 'var(--accent-primary)' : undefined }} />
                </motion.div>
                <span className="flex-1">{item.label}</span>
                {item.premium && (
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <Lock size={12} style={{ color: 'var(--accent-warning)' }} />
                  </motion.div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Streak Card */}
        <div className="my-4 p-4 rounded-2xl relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.08) 50%, rgba(6,182,212,0.06) 100%)',
            border: '1px solid rgba(99,102,241,0.2)',
          }}>
          {/* Animated shimmer overlay */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="w-full h-full animate-shimmer"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
              }} />
          </div>
          <div className="flex items-center gap-2 mb-2 relative z-10">
            <motion.span
              className="text-xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            >
              🔥
            </motion.span>
            <span className="font-bold text-sm tracking-tight">{stats?.streak || 0} Day Streak!</span>
          </div>
          <p className="text-[10px] leading-normal relative z-10" style={{ color: 'var(--text-muted)' }}>
            Keep it going! Every day counts toward mastery.
          </p>
          <div className="h-1.5 w-full rounded-full mt-3 overflow-hidden relative z-10"
            style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: stats?.streak ? '100%' : '10%' }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{ background: 'var(--gradient-brand)' }}
            />
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="flex flex-col gap-0.5 pt-2" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          {BOTTOM_NAV.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              <item.icon size={17} />
              {item.label}
            </Link>
          ))}
          <SignOutButton>
            <button className="nav-link w-full text-left" style={{ color: 'var(--accent-danger)' }}>
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
  const { theme, toggleTheme } = useTheme();
  const isSubPage = pathname.split('/').length > 3;
  const pageTitle = NAV_ITEMS.find(n => n.href === pathname)?.label ?? 'Dashboard';

  const [showNotifs, setShowNotifs] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
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
      style={{
        background: 'var(--topbar-bg)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid var(--border-subtle)',
        transition: 'background 0.4s ease',
      }}>
      <button onClick={onMenuClick}
        className="lg:hidden p-2 rounded-xl transition-all hover:scale-105"
        style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid var(--border-subtle)' }}>
        <Menu size={18} />
      </button>

      {isSubPage ? (
        <motion.button
          onClick={() => router.back()}
          className="p-2 rounded-xl transition-all"
          style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-default)' }}
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft size={18} />
        </motion.button>
      ) : null}

      <h1 className="font-bold text-lg flex-1 gradient-text" style={{ fontFamily: 'Outfit' }}>{pageTitle}</h1>

      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <motion.div
          className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{
            background: searchFocused ? 'rgba(99,102,241,0.08)' : 'var(--bg-card)',
            border: `1px solid ${searchFocused ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
            boxShadow: searchFocused ? '0 0 20px rgba(99,102,241,0.1)' : 'none',
            minWidth: 220,
            transition: 'all 0.3s ease',
          }}
        >
          <Search size={15} style={{ color: searchFocused ? 'var(--accent-primary)' : 'var(--text-muted)' }} />
          <input
            placeholder="Quick search…"
            className="bg-transparent text-sm outline-none flex-1"
            style={{ color: 'var(--text-primary)' }}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <kbd className="text-xs px-1.5 py-0.5 rounded-md font-mono"
            style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)', border: '1px solid var(--border-subtle)' }}>
            ⌘K
          </kbd>
        </motion.div>

        {/* Theme Toggle */}
        <motion.button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl transition-all relative overflow-hidden"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <AnimatePresence mode="wait">
            {theme === 'dark' ? (
              <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Sun size={16} style={{ color: 'var(--accent-warning)' }} />
              </motion.div>
            ) : (
              <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Moon size={16} style={{ color: 'var(--accent-secondary)' }} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <motion.button
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative p-2.5 rounded-xl transition-all"
            style={{
              background: showNotifs ? 'rgba(99,102,241,0.12)' : 'var(--bg-card)',
              border: `1px solid ${showNotifs ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
          >
            <Bell size={16} />
            <motion.span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
              style={{
                background: 'var(--gradient-brand)',
                boxShadow: '0 0 6px rgba(99,102,241,0.6)',
              }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>

          <AnimatePresence>
            {showNotifs && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="absolute right-0 mt-2 w-80 rounded-2xl shadow-2xl overflow-hidden"
                style={{
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid var(--border-default)',
                }}
              >
                <div className="p-3.5 flex justify-between items-center"
                  style={{ borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-hover)' }}>
                  <span className="font-semibold text-sm">Notifications</span>
                  <button className="text-xs font-medium" style={{ color: 'var(--accent-primary)' }}>Mark all read</button>
                </div>
                <div className="p-6 text-center">
                  <motion.div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
                    style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)' }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Bell size={18} style={{ color: 'var(--text-muted)' }} />
                  </motion.div>
                  <p className="text-sm font-medium">You&apos;re all caught up!</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>No new alerts right now.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Credits Badge */}
        <motion.div
          className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl"
          style={{
            background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.2)',
          }}
          whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(99,102,241,0.15)' }}
        >
          <Sparkles size={14} style={{ color: 'var(--accent-primary)' }} />
          <span className="text-xs font-bold" style={{ color: 'var(--accent-primary)' }}>
            {stats?.credits || '0'} Credits
          </span>
        </motion.div>

        {/* Avatar */}
        <UserButton appearance={{
          elements: {
            avatarBox: "w-8 h-8 rounded-xl border border-[rgba(99,102,241,0.2)] shadow-lg ring-2 ring-[rgba(99,102,241,0.1)]"
          }
        }} />
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
    <div className="min-h-screen relative" style={{ background: 'var(--bg-base)' }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} stats={stats} />
      <div className="main-content">
        <TopBar onMenuClick={() => setSidebarOpen(true)} stats={stats} />
        <main className="p-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
