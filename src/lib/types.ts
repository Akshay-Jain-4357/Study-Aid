export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'elite';
  role: 'student' | 'faculty' | 'admin';
  college?: string;
  semester?: number;
  branch?: string;
  joinedAt: string;
  streak: number;
  badges: string[];
}

export interface Note {
  id: string;
  title: string;
  subject: string;
  description: string;
  fileUrl?: string;
  fileType: 'pdf' | 'doc' | 'image' | 'video';
  uploadedBy: string;
  uploadedAt: string;
  size: string;
  isPremium: boolean;
  downloads: number;
  rating: number;
  tags: string[];
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  grade?: string;
}

export interface Exam {
  id: string;
  subject: string;
  date: string;
  time: string;
  venue?: string;
  type: 'internal' | 'external' | 'quiz' | 'viva';
  syllabus?: string[];
  preparedness: number;
}

export interface StudySession {
  id: string;
  subject: string;
  duration: number;
  date: string;
  topic?: string;
  focusScore: number;
}

export interface AnalyticsData {
  totalStudents: number;
  activeToday: number;
  revenue: number;
  mrr: number;
  churnRate: number;
  retentionRate: number;
  avgEngagementTime: number;
  conversionRate: number;
  cac: number;
  ltv: number;
  nps: number;
  weeklyGrowth: number;
}

export interface Plan {
  id: 'free' | 'pro' | 'elite';
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  color: string;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
  isPremium?: boolean;
}

export interface SubjectProgress {
  subject: string;
  progress: number;
  grade: string;
  hoursStudied: number;
  color: string;
}

export interface MarketData {
  tam: string;
  sam: string;
  som: string;
  growth: string;
  targetYear: number;
}

export interface Competitor {
  name: string;
  focus: string;
  pricing: string;
  ai: boolean;
  offline: boolean;
  security: string;
  weakness: string;
}
