import type { User, Note, Assignment, Exam, StudySession, AnalyticsData, SubjectProgress, Competitor } from './types';

export const mockUser: User = {
  id: 'u1',
  name: 'Aryan Sharma',
  email: 'aryan@iitbombay.edu',
  plan: 'pro',
  role: 'student',
  college: 'IIT Bombay',
  semester: 5,
  branch: 'Computer Science',
  joinedAt: '2024-08-01',
  streak: 14,
  badges: ['🔥 7-Day Streak', '📚 100 Notes Read', '🏆 Top Scorer'],
};

export const mockNotes: Note[] = [
  { id: 'n1', title: 'Data Structures Complete Notes', subject: 'Computer Science', description: 'Comprehensive notes covering arrays, trees, graphs, DP.', fileType: 'pdf', uploadedBy: 'Prof. Mehta', uploadedAt: '2024-11-10', size: '4.2 MB', isPremium: false, downloads: 1240, rating: 4.8, tags: ['DSA', 'Arrays', 'Trees', 'DP'] },
  { id: 'n2', title: 'Thermodynamics Formula Sheet', subject: 'Physics', description: 'All important formulas and derivations.', fileType: 'pdf', uploadedBy: 'Priya K.', uploadedAt: '2024-11-08', size: '1.1 MB', isPremium: false, downloads: 876, rating: 4.6, tags: ['Physics', 'Thermodynamics', 'Formulas'] },
  { id: 'n3', title: 'Machine Learning Lecture Series', subject: 'Computer Science', description: 'Full lecture notes for ML course - Andrew Ng style.', fileType: 'pdf', uploadedBy: 'Study Aid Team', uploadedAt: '2024-11-05', size: '8.9 MB', isPremium: true, downloads: 3200, rating: 4.9, tags: ['ML', 'Neural Networks', 'Deep Learning'] },
  { id: 'n4', title: 'Organic Chemistry Reactions', subject: 'Chemistry', description: 'Name reactions, mechanisms, and reagents.', fileType: 'pdf', uploadedBy: 'Rohan D.', uploadedAt: '2024-11-03', size: '2.5 MB', isPremium: false, downloads: 654, rating: 4.5, tags: ['Chemistry', 'Organic', 'Reactions'] },
  { id: 'n5', title: 'Operating Systems PYQs 2019-2024', subject: 'Computer Science', description: '5 years of previous year questions with solutions.', fileType: 'pdf', uploadedBy: 'Study Aid Team', uploadedAt: '2024-10-28', size: '6.1 MB', isPremium: true, downloads: 2100, rating: 4.9, tags: ['OS', 'PYQ', 'Exam Prep'] },
  { id: 'n6', title: 'Calculus Made Simple', subject: 'Mathematics', description: 'Integration, differentiation, and limits explained simply.', fileType: 'pdf', uploadedBy: 'Kavya M.', uploadedAt: '2024-10-25', size: '3.3 MB', isPremium: false, downloads: 987, rating: 4.7, tags: ['Maths', 'Calculus', 'Integration'] },
];

export const mockAssignments: Assignment[] = [
  { id: 'a1', title: 'Binary Search Tree Implementation', subject: 'Data Structures', dueDate: '2024-11-20', status: 'pending', priority: 'high' },
  { id: 'a2', title: 'Physics Lab Report - Pendulum', subject: 'Physics', dueDate: '2024-11-18', status: 'submitted', priority: 'medium' },
  { id: 'a3', title: 'Essay: Impact of AI in Education', subject: 'English', dueDate: '2024-11-25', status: 'pending', priority: 'low' },
  { id: 'a4', title: 'SQL Database Design Project', subject: 'DBMS', dueDate: '2024-11-15', status: 'overdue', priority: 'high' },
  { id: 'a5', title: 'Linear Regression Mini Project', subject: 'Machine Learning', dueDate: '2024-12-01', status: 'pending', priority: 'medium' },
];

export const mockExams: Exam[] = [
  { id: 'e1', subject: 'Data Structures & Algorithms', date: '2024-11-22', time: '10:00 AM', venue: 'Hall B', type: 'internal', preparedness: 72 },
  { id: 'e2', subject: 'Machine Learning', date: '2024-11-28', time: '2:00 PM', venue: 'Hall A', type: 'external', preparedness: 55 },
  { id: 'e3', subject: 'Operating Systems', date: '2024-12-05', time: '11:00 AM', venue: 'Hall C', type: 'internal', preparedness: 88 },
  { id: 'e4', subject: 'Computer Networks', date: '2024-12-10', time: '9:00 AM', venue: 'Hall B', type: 'external', preparedness: 40 },
];

export const mockStudySessions: StudySession[] = [
  { id: 's1', subject: 'DSA', duration: 120, date: '2024-11-10', topic: 'Binary Trees', focusScore: 88 },
  { id: 's2', subject: 'ML', duration: 90, date: '2024-11-10', topic: 'Gradient Descent', focusScore: 75 },
  { id: 's3', subject: 'OS', duration: 60, date: '2024-11-09', topic: 'Scheduling', focusScore: 92 },
  { id: 's4', subject: 'Physics', duration: 45, date: '2024-11-09', topic: 'Waves', focusScore: 70 },
  { id: 's5', subject: 'DBMS', duration: 75, date: '2024-11-08', topic: 'Normalization', focusScore: 85 },
  { id: 's6', subject: 'Maths', duration: 55, date: '2024-11-08', topic: 'Integration', focusScore: 80 },
  { id: 's7', subject: 'DSA', duration: 100, date: '2024-11-07', topic: 'Graphs', focusScore: 91 },
];

export const mockAnalytics: AnalyticsData = {
  totalStudents: 42850,
  activeToday: 8430,
  revenue: 4250000,
  mrr: 1850000,
  churnRate: 3.2,
  retentionRate: 94.1,
  avgEngagementTime: 68,
  conversionRate: 12.4,
  cac: 420,
  ltv: 3600,
  nps: 67,
  weeklyGrowth: 8.3,
};

export const mockSubjectProgress: SubjectProgress[] = [
  { subject: 'Data Structures', progress: 78, grade: 'A', hoursStudied: 42, color: '#6366f1' },
  { subject: 'Machine Learning', progress: 62, grade: 'B+', hoursStudied: 28, color: '#8b5cf6' },
  { subject: 'Operating Systems', progress: 88, grade: 'A+', hoursStudied: 35, color: '#06b6d4' },
  { subject: 'Computer Networks', progress: 45, grade: 'B', hoursStudied: 18, color: '#f59e0b' },
  { subject: 'DBMS', progress: 91, grade: 'A+', hoursStudied: 40, color: '#10b981' },
  { subject: 'Physics', progress: 67, grade: 'B+', hoursStudied: 22, color: '#ef4444' },
];

export const weeklyStudyData = [
  { day: 'Mon', hours: 3.5 }, { day: 'Tue', hours: 5.0 }, { day: 'Wed', hours: 2.0 },
  { day: 'Thu', hours: 6.5 }, { day: 'Fri', hours: 4.0 }, { day: 'Sat', hours: 7.0 },
  { day: 'Sun', hours: 3.0 },
];

export const revenueChartData = [
  { month: 'Jun', revenue: 820000, users: 28000 },
  { month: 'Jul', revenue: 1050000, users: 31000 },
  { month: 'Aug', revenue: 1380000, users: 34500 },
  { month: 'Sep', revenue: 1720000, users: 37200 },
  { month: 'Oct', revenue: 2100000, users: 39800 },
  { month: 'Nov', revenue: 2650000, users: 42850 },
];

export const courseDemandsData = [
  { name: 'DSA', demand: 95 }, { name: 'Machine Learning', demand: 88 },
  { name: 'GATE Prep', demand: 82 }, { name: 'Web Dev', demand: 76 },
  { name: 'Cloud Computing', demand: 71 }, { name: 'Data Science', demand: 68 },
];

export const competitors: Competitor[] = [
  { name: 'Unacademy', focus: 'Video Lectures', pricing: '₹1,499/mo', ai: false, offline: true, security: 'Basic', weakness: 'No AI, No collaboration' },
  { name: 'Byju\'s', focus: 'School education', pricing: '₹2,000/mo', ai: false, offline: true, security: 'Basic', weakness: 'No college focus' },
  { name: 'Notion', focus: 'Notes only', pricing: '$16/mo', ai: true, offline: false, security: 'Medium', weakness: 'Not academic-specific' },
  { name: 'Study Aid', focus: 'Full Academic Suite', pricing: '₹299/mo', ai: true, offline: false, security: '🔒 Enterprise', weakness: '—' },
];

export const userPersonas = [
  { type: 'BTech Student', pain: 'Scattered notes, no revision plan', want: 'One-stop notes + AI tutor', icon: '👨‍💻' },
  { type: 'NEET/JEE Aspirant', pain: 'No quality PYQs, poor analytics', want: 'Exam-focused resources + tracking', icon: '🎯' },
  { type: 'MBA Student', pain: 'Case studies scattered, no curation', want: 'Curated premium content', icon: '📊' },
  { type: 'Faculty', pain: 'No easy content distribution', want: 'Upload & share notes securely', icon: '👩‍🏫' },
  { type: 'Working Professional', pain: 'Time-poor, needs summaries', want: 'AI summarized, quick access', icon: '💼' },
];
