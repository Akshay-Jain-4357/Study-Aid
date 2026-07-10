'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { UserButton, useUser, SignOutButton } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from '@/components/ThemeProvider';
import {
  Brain, BookOpen, BarChart3, Clock, Target, Users, Settings,
  LogOut, Menu, X, Bell, Search, Zap, Home, Trophy, Shield,
  CreditCard, Star, TrendingUp, MessageSquare, ChevronLeft,
  Lock, Store, Sun, Moon, Sparkles, PanelLeftClose, PanelLeftOpen
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
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  stats: Stats | null;
}

function Sidebar({ open, onClose, isCollapsed, onToggleCollapse, stats }: SidebarProps) {
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
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden"
            onClick={onClose}
            style={{
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: open ? 0 : undefined }}
        className={`sidebar ${open ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}
        style={{
          background: 'var(--sidebar-bg)',
          backdropFilter: 'blur(var(--glass-blur-heavy))',
          WebkitBackdropFilter: 'blur(var(--glass-blur-heavy))',
        }}
      >
        {/* Ambient glow — decorative */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 w-full h-48"
          style={{
            background: 'radial-gradient(ellipse at 30% 0%, rgba(232,168,50,0.06) 0%, transparent 70%)',
          }}
        />

        {/* Brand Logo */}
        <div className="flex items-center justify-between mb-8 relative z-10">
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              className="w-9 h-9 rounded-xl flex items-center justify-center relative overflow-hidden flex-shrink-0"
              style={{ background: 'var(--gradient-amber)' }}
              whileHover={{ scale: 1.08, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <span className="text-[#0A0A0C] font-bold text-sm relative z-10" style={{ fontFamily: "'Instrument Serif', serif" }}>S</span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
            <span className="font-bold text-lg hide-on-collapse" style={{ fontFamily: "'Satoshi', sans-serif" }}>
              Study<span className="gradient-text">Aid</span>
            </span>
          </Link>
          <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            style={{ background: 'var(--bg-hover-strong)' }}>
            <X size={16} />
          </button>
        </div>

        {/* User Card */}
        <motion.div
          className="glass-card p-3 mb-6 flex items-center gap-3 relative z-10 hide-on-collapse"
          style={{
            borderRadius: 'var(--radius-lg)',
            background: 'var(--bg-glass-card)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
          whileHover={{
            borderColor: 'var(--border-amber-subtle)',
            boxShadow: '0 0 20px rgba(232, 168, 50, 0.06)',
          }}
          transition={{ duration: 0.3 }}
        >
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
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-0.5 overflow-y-auto relative z-10">
          <div className="text-[10px] font-bold mb-2 px-3 uppercase tracking-[0.1em] hide-on-collapse"
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
                onClick={() => onClose()}
              >
                <motion.div
                  className="flex items-center justify-center w-8 h-8 rounded-lg relative"
                  style={{
                    background: isActive ? 'var(--bg-hover-strong)' : 'transparent',
                  }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <item.icon
                    size={17}
                    style={{
                      color: isActive ? 'var(--accent-primary)' : undefined,
                      filter: isActive ? 'drop-shadow(0 0 6px rgba(232, 168, 50, 0.4))' : 'none',
                      transition: 'filter 0.3s, color 0.3s',
                    }}
                  />
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

        {/* Bottom Nav */}
        <div className="flex flex-col gap-0.5 pt-2 relative z-10" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          {BOTTOM_NAV.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              <item.icon size={17} />
              {item.label}
            </Link>
          ))}
          <SignOutButton>
            <button className="nav-link w-full text-left" style={{ color: 'var(--accent-danger)' }}>
              <LogOut size={17} />
              <span>Sign Out</span>
            </button>
          </SignOutButton>
          
          <button 
            onClick={onToggleCollapse}
            className="nav-link w-full text-left hidden lg:flex mt-2" 
            style={{ color: 'var(--text-muted)' }}
          >
            {isCollapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}
            <span>{isCollapsed ? 'Expand' : 'Collapse'}</span>
          </button>
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
  const [searchFocused, setSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Scroll-reactive topbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        background: scrolled ? 'var(--topbar-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(var(--glass-blur-heavy))' : 'blur(8px)',
        WebkitBackdropFilter: scrolled ? 'blur(var(--glass-blur-heavy))' : 'blur(8px)',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
        boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
      }}>
      <button onClick={onMenuClick}
        className="lg:hidden p-2 rounded-xl transition-all hover:scale-105"
        style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)' }}>
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

      <h1 className="font-bold text-lg flex-1 gradient-text" style={{ fontFamily: "'Satoshi', sans-serif" }}>{pageTitle}</h1>

      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <motion.div
          className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{
            background: searchFocused ? 'var(--bg-hover)' : 'var(--bg-card)',
            border: `1px solid ${searchFocused ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
            boxShadow: searchFocused ? 'var(--shadow-amber-glow)' : 'none',
            minWidth: 220,
            transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
          animate={{
            scale: searchFocused ? 1.02 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
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

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <motion.button
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative p-2.5 rounded-xl transition-all"
            style={{
              background: showNotifs ? 'var(--bg-hover-strong)' : 'var(--bg-card)',
              border: `1px solid ${showNotifs ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
          >
            <Bell size={16} />
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
                  background: 'var(--glass-bg-heavy)',
                  backdropFilter: 'blur(var(--glass-blur-heavy))',
                  WebkitBackdropFilter: 'blur(var(--glass-blur-heavy))',
                  border: '1px solid var(--border-default)',
                  boxShadow: 'var(--shadow-xl)',
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

        {/* Theme Toggle */}
        <div className="hidden sm:block">
          <ThemeToggle />
        </div>

        {/* Streak Badge */}
        <motion.div
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl cursor-pointer"
          style={{
            background: 'var(--bg-hover-strong)',
            border: '1px solid var(--border-amber-subtle)',
          }}
          whileHover={{ scale: 1.05, boxShadow: 'var(--shadow-amber-glow)', borderColor: 'rgba(232, 168, 50, 0.4)' }}
          title={`${stats?.streak || 0} Day Streak!`}
        >
          <motion.span
            className="text-[14px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
          >
            🔥
          </motion.span>
          <span className="text-xs font-bold tracking-wide" style={{ color: 'var(--accent-warning)' }}>
            {stats?.streak || 0}
          </span>
        </motion.div>

        {/* Credits Badge */}
        <motion.div
          className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl"
          style={{
            background: 'var(--bg-hover-strong)',
            border: '1px solid var(--border-amber-subtle)',
          }}
          whileHover={{ scale: 1.03, boxShadow: 'var(--shadow-amber-glow)' }}
        >
          <Sparkles size={14} style={{ color: 'var(--accent-primary)' }} />
          <span className="text-xs font-bold" style={{ color: 'var(--accent-primary)' }}>
            {stats?.credits || '0'} Credits
          </span>
        </motion.div>

        {/* Avatar */}
        <UserButton appearance={{
          elements: {
            avatarBox: "w-8 h-8 rounded-xl border border-[var(--border-amber-subtle)] shadow-lg ring-2 ring-[var(--bg-hover-strong)]"
          }
        }} />
      </div>
    </header>
  );
}

// Page transition variants
const pageTransition = {
  initial: { opacity: 0, y: 16, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: 'blur(2px)',
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const pathname = usePathname();

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

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen relative" style={{ background: 'var(--bg-base)' }}>
      <Sidebar 
        open={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        stats={stats} 
      />
      <div className={`main-content ${isCollapsed ? 'collapsed' : ''}`}>
        <TopBar onMenuClick={() => setSidebarOpen(true)} stats={stats} />
        <main className="p-6 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              variants={pageTransition}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
