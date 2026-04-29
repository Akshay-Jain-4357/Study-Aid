'use client';

import { SignUp } from "@clerk/nextjs";
import { motion } from 'framer-motion';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden grid-bg" style={{ background: 'var(--bg-base)' }}>
      {/* Background Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full blur-[100px] opacity-15" style={{ background: '#6366f1' }} />
        <div className="absolute bottom-1/4 right-1/3 w-56 h-56 rounded-full blur-[80px] opacity-10" style={{ background: '#06b6d4' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <SignUp
          appearance={{
            elements: {
              card: "bg-[#0f0f19]/80 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-2xl",
              headerTitle: "text-white font-bold font-outfit",
              headerSubtitle: "text-white/50",
              socialButtonsBlockButton: "border-white/10 bg-white/5 hover:bg-white/10 text-white",
              socialButtonsBlockButtonText: "text-white font-semibold",
              dividerLine: "bg-white/10",
              dividerText: "text-white/40 context-bg-transparent",
              formFieldLabel: "text-white/60 font-semibold uppercase tracking-wider text-xs",
              formFieldInput: "bg-white/5 border border-white/10 text-white rounded-xl focus:border-indigo-500/50 focus:ring focus:ring-indigo-500/20",
              formButtonPrimary: "bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 shadow-lg text-white font-bold rounded-xl",
              footerActionText: "text-white/50",
              footerActionLink: "text-indigo-400 font-semibold hover:text-indigo-300"
            }
          }}
          routing="hash"
          fallbackRedirectUrl="/dashboard"
        />
      </motion.div>
    </div>
  );
}
