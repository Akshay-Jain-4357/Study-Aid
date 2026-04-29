import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
}

export function formatCurrency(amount: number, currency = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export const SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology',
  'Computer Science', 'English', 'History', 'Economics',
  'Data Structures', 'Algorithms', 'Machine Learning',
  'Operating Systems', 'DBMS', 'Networks',
];

export const PLAN_FEATURES = {
  free: ['5 Note uploads/month', 'Basic AI Tutor (10 queries/day)', 'Study Planner', 'Basic Analytics', '5GB Storage'],
  pro: ['Unlimited Notes', 'Unlimited AI Tutor', 'Advanced Analytics', 'Priority Support', '50GB Storage', 'PYQ Access', 'Collaboration'],
  elite: ['Everything in Pro', 'Personal AI Mentor', 'Study War Room', 'Exclusive Resources', '200GB Storage', 'Stream-only PDFs', 'DRM Protection', 'Campus Ambassador'],
};
