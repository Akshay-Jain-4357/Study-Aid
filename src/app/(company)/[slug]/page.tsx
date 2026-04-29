import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function CompanyPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  const validSlugs: Record<string, string> = {
    'about': 'About Us',
    'careers': 'Careers',
    'blog': 'Blog',
    'contact': 'Contact Support',
    'privacy': 'Privacy Policy',
    'terms': 'Terms of Service',
    'refunds': 'Refund Policy',
    'help': 'Help Center'
  };

  if (!validSlugs[slug]) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6">
        <Clock size={32} className="text-gray-400" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight mb-4">{validSlugs[slug]}</h1>
      <p className="text-gray-400 max-w-md mb-8">
        We are currently drafting the final legal and operational details for this section. This page will be available in the upcoming Phase 2 release.
      </p>
      <Link href="/" className="bg-white text-black font-medium px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-colors">
        <ArrowLeft size={16} /> Return Home
      </Link>
    </div>
  );
}
