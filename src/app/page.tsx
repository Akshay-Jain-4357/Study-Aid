'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth, UserButton } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, BookOpen, BarChart3, Shield, Clock, Target, Menu, X, ArrowRight,
  MessageSquare, ChevronRight, Search, Upload, Lock, FileText, CheckCircle
} from 'lucide-react';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const FEATURES = [
  { icon: Brain, title: 'AI Tutor', desc: 'Interact with course material instantly using context-aware AI. Ask questions and get answers directly from your documents.', color: '#ededed' },
  { icon: BookOpen, title: 'Notes Vault', desc: 'Store, search, and organize all your academic documents securely in the cloud.', color: '#ededed' },
  { icon: BarChart3, title: 'Analytics', desc: 'Track your study patterns and performance over time with precision data.', color: '#ededed' },
  { icon: Clock, title: 'Smart Planner', desc: 'Organize your revision schedules and assignment deadlines automatically.', color: '#ededed' },
  { icon: Shield, title: 'Enterprise Security', desc: 'Your data is encrypted and completely private. Built on FAANG-grade infrastructure.', color: '#ededed' },
  { icon: Target, title: 'Assignment Tracking', desc: 'Never miss a deadline with automated priorities and task management.', color: '#ededed' },
];

const WORKFLOW = [
  { title: 'Upload Material', desc: 'Drag and drop your PDFs, DOCX, or images into the secure vault.', icon: Upload },
  { title: 'AI Processing', desc: 'Our engine indexes your text and prepares it for semantic search.', icon: Brain },
  { title: 'Search & Learn', desc: 'Ask the AI tutor anything about your documents and learn faster.', icon: Search },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isLoaded, userId } = useAuth();
  const isSignedIn = isLoaded && !!userId;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20">
      {/* Sticky Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b"
        style={{
          background: scrolled ? 'rgba(0,0,0,0.8)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderColor: scrolled ? 'rgba(255,255,255,0.08)' : 'transparent',
        }}
      >
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center">
              <Brain size={18} className="text-black" />
            </div>
            <span className="font-semibold tracking-tight text-lg">StudyAid</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
            {isSignedIn && (
              <>
                <Link href="/dashboard/notes" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Notes</Link>
                <Link href="/dashboard" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Dashboard</Link>
              </>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {!isSignedIn ? (
              <>
                <Link href="/auth/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Sign In</Link>
                <Link href="/auth/signup" className="text-sm font-medium bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">Get Started</Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className="text-sm font-medium bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">Go to Dashboard</Link>
                <div className="border-l border-white/10 pl-4 h-6 flex items-center">
                  <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-8 h-8 rounded-md" } }} />
                </div>
              </div>
            )}
          </div>

          <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black border-b border-white/10 px-6 py-4"
            >
              <div className="flex flex-col gap-4">
                {NAV_LINKS.map((link) => (
                  <Link key={link.label} href={link.href} className="text-sm font-medium text-gray-300">{link.label}</Link>
                ))}
                {isSignedIn && (
                  <>
                    <Link href="/dashboard/notes" className="text-sm font-medium text-gray-300">Notes</Link>
                    <Link href="/dashboard" className="text-sm font-medium text-gray-300">Dashboard</Link>
                  </>
                )}
                <div className="h-px bg-white/10 my-2" />
                {!isSignedIn ? (
                  <>
                    <Link href="/auth/login" className="text-sm font-medium text-gray-300">Sign In</Link>
                    <Link href="/auth/signup" className="text-sm font-medium text-white">Get Started</Link>
                  </>
                ) : (
                  <Link href="/dashboard" className="text-sm font-medium text-white">Go to Dashboard</Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 text-center max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-gray-300 mb-8">
            <Lock size={12} /> Privacy-First Architecture
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            The operating system <br className="hidden md:block" />
            <span className="text-gray-400">for rigorous study.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            A unified environment for notes, assignments, and AI-assisted learning. Built on enterprise-grade infrastructure to guarantee security, speed, and focus.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {!isSignedIn ? (
              <Link href="/auth/signup" className="w-full sm:w-auto bg-white text-black font-medium text-sm px-8 py-3.5 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                Start Building Your Vault <ArrowRight size={16} />
              </Link>
            ) : (
              <Link href="/dashboard" className="w-full sm:w-auto bg-white text-black font-medium text-sm px-8 py-3.5 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                Enter Dashboard <ArrowRight size={16} />
              </Link>
            )}
            <Link href="#features" className="w-full sm:w-auto bg-transparent border border-white/10 text-white font-medium text-sm px-8 py-3.5 rounded-lg hover:bg-white/5 transition-colors text-center">
              Explore Platform
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Trust / Security Section */}
      <section className="py-12 border-y border-white/10 bg-white/[0.02]">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-6">Built on Industry Standards</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale">
            {['Next.js', 'PostgreSQL', 'Stripe', 'React', 'Tailwind'].map(tech => (
              <span key={tech} className="font-bold text-lg md:text-xl tracking-tight">{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Workflow */}
      <section id="about" className="py-32 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">A systemic approach to learning.</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">No chaos. No distractions. Just a clean pipeline from raw material to deep understanding.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-y-1/2" />
          
          {WORKFLOW.map((step, i) => (
            <div key={step.title} className="relative z-10 bg-black border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-6">
                <step.icon size={20} className="text-gray-300" />
              </div>
              <h3 className="text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6 bg-white/[0.01] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Engineered for focus.</h2>
            <p className="text-gray-400 text-lg max-w-2xl">Every module is designed to eliminate friction and keep you in the flow state.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-black border border-white/10 p-8 rounded-2xl hover:border-white/20 transition-colors group">
                <f.icon size={24} className="mb-6 text-gray-400 group-hover:text-white transition-colors" />
                <h3 className="text-lg font-bold mb-3">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clean Footer */}
      <footer className="border-t border-white/10 py-16 px-6 bg-black">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded bg-white flex items-center justify-center">
                <Brain size={14} className="text-black" />
              </div>
              <span className="font-semibold tracking-tight text-sm">StudyAid</span>
            </div>
            <p className="text-sm text-gray-500 max-w-xs">The authentic, database-driven operating system for modern students.</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm mb-4">Product</h4>
            <ul className="space-y-3">
              <li><Link href="#features" className="text-sm text-gray-500 hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="text-sm text-gray-500 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/dashboard/notes" className="text-sm text-gray-500 hover:text-white transition-colors">Notes</Link></li>
              <li><Link href="/dashboard" className="text-sm text-gray-500 hover:text-white transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-gray-500 hover:text-white transition-colors">About</Link></li>
              <li><Link href="/careers" className="text-sm text-gray-500 hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="text-sm text-gray-500 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-500 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Legal & Support</h4>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-500 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/refunds" className="text-sm text-gray-500 hover:text-white transition-colors">Refund Policy</Link></li>
              <li><Link href="/help" className="text-sm text-gray-500 hover:text-white transition-colors">Help Center</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} Study Aid. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="https://linkedin.com" className="hover:text-gray-300">LinkedIn</Link>
            <Link href="https://x.com" className="hover:text-gray-300">X</Link>
            <Link href="https://github.com" className="hover:text-gray-300">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
