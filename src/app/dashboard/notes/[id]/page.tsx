import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, FileText, Share2, BrainCircuit } from 'lucide-react';
import { auth } from '@clerk/nextjs/server';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client } from '@/lib/s3';
import AiAnalysisSidebar from '@/components/AiAnalysisSidebar';

const prisma = new PrismaClient();

export default async function NoteViewerPage({ params }: { params: { id: string } }) {
  const { userId } = await auth();
  const { id } = await params;

  if (!userId) return notFound();

  const note = await prisma.note.findUnique({
    where: { id },
    include: { uploader: { select: { fullName: true } } }
  });

  if (!note) return notFound();

  // Ensure user has permission (uploader or it is public)
  if (note.uploaderId !== userId && !note.isPublic) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
        <p className="text-gray-400">You do not have permission to view this document.</p>
        <Link href="/dashboard/notes" className="mt-6 text-indigo-400 hover:underline">Return to Vault</Link>
      </div>
    );
  }

  let viewUrl = note.documentUrl;

  // Transform raw S3 links into secure, temporary Presigned URLs for DRM viewing
  if (note.documentUrl.includes('amazonaws.com') && process.env.AWS_ACCESS_KEY_ID) {
    try {
      const urlParts = note.documentUrl.split('.amazonaws.com/');
      if (urlParts.length === 2) {
        const s3Key = decodeURIComponent(urlParts[1]);
        const bucketName = process.env.AWS_S3_BUCKET_NAME || 'study-aid-vault-2026';
        
        const command = new GetObjectCommand({
          Bucket: bucketName,
          Key: s3Key,
        });

        // Generate a 60-minute presigned URL to enforce streaming-only access
        viewUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
      }
    } catch (err) {
      console.error("Failed to generate presigned URL", err);
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      <Link href="/dashboard/notes" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors w-fit mb-4">
        <ArrowLeft size={16} /> Back to Vault
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/[0.02] border border-white/10 p-6 rounded-2xl">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center border border-indigo-500/30">
            <FileText size={24} className="text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-1">{note.title}</h1>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <span>Subject: {note.subject}</span>
              <span>•</span>
              <span>Uploaded by {note.uploader?.fullName || 'Anonymous'}</span>
              <span>•</span>
              <span>{new Date(note.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">
            <Share2 size={16} /> Share Note
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[700px]">
          <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-300">Document Viewer</span>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
          </div>
          
          {/* Real Document Iframe */}
          <div className="flex-1 w-full h-full bg-[#1e1e1e]">
            <iframe 
              src={`${viewUrl}#toolbar=0&navpanes=0&scrollbar=0`} 
              className="w-full h-full border-0"
              title={note.title}
            />
          </div>
        </div>

        <div className="space-y-6">
          <AiAnalysisSidebar noteId={note.id} title={note.title} subject={note.subject} />

          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
            <h3 className="font-bold mb-4">Document Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Visibility</span>
                <span className="font-medium text-white">{note.isPublic ? 'Public' : 'Private'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Premium Locked</span>
                <span className="font-medium text-white">{note.isPremium ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Downloads</span>
                <span className="font-medium text-white">{note.downloads}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
