'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden"
      style={{
        background: 'var(--bg-hover-light)',
        border: '1px solid var(--border-subtle)',
      }}
      whileHover={{
        scale: 1.08,
        borderColor: isDark ? 'rgba(232, 168, 50, 0.3)' : 'rgba(200, 136, 32, 0.3)',
        boxShadow: isDark
          ? '0 0 16px rgba(232, 168, 50, 0.12)'
          : '0 0 16px rgba(200, 136, 32, 0.1)',
      }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {/* Moon icon (dark mode) */}
      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 1 : 0,
          opacity: isDark ? 1 : 0,
          rotate: isDark ? 0 : -90,
          y: isDark ? 0 : 8,
        }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon size={16} className="text-[var(--text-primary)]" />
      </motion.div>

      {/* Sun icon (light mode) */}
      <motion.div
        initial={false}
        animate={{
          scale: !isDark ? 1 : 0,
          opacity: !isDark ? 1 : 0,
          rotate: !isDark ? 0 : 90,
          y: !isDark ? 0 : -8,
        }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun size={18} className="text-[var(--amber-600)]" />
      </motion.div>

      {/* Subtle glow ring on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{
          background: isDark
            ? 'radial-gradient(circle at center, rgba(232,168,50,0.08) 0%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(200,136,32,0.06) 0%, transparent 70%)',
        }}
        initial={false}
        animate={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}
