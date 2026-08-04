import { prisma } from '@/lib/prisma';
import IndexNowForm from '@/components/admin/IndexNowForm';
import { Zap, Key, ExternalLink, Sparkles } from 'lucide-react';

export const revalidate = 0;

export default async function AdminIndexNowPage() {
  const publishedPosts = await prisma.post.findMany({
    where: { status: 'published' },
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      updatedAt: true,
      category: { select: { name: true, slug: true } },
    },
  });

  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      updatedAt: true,
    },
  });

  const baseUrl = process.env.NEXTAUTH_URL || 'https://remoteworklab.com';
  const key = '623afdf3999e4bcda312762da4ceab56';
  const keyUrl = `${baseUrl}/${key}.txt`;

  // Filter recently updated posts (last 7 days)
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const recentlyUpdatedSlugs = publishedPosts
    .filter((p) => new Date(p.updatedAt) >= sevenDaysAgo)
    .map((p) => p.slug);

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-teal-600 font-bold text-xs uppercase tracking-wider">
            <Zap className="h-4 w-4" />
            Instant Search Engine Indexing
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">IndexNow Auto-Detection & Submission</h1>
          <p className="text-xs text-slate-500 mt-1">
            Automatically identifies newly created or recently modified pages and submits them for priority search indexation.
          </p>
        </div>
      </div>

      {/* Key Status Panel */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <Key className="h-4 w-4 text-teal-600" />
          IndexNow Key & Verification Status
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-500 font-medium block">API Key String</span>
            <span className="font-mono font-bold text-slate-900 break-all">{key}</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-500 font-medium block">Verification File Path</span>
            <a
              href={keyUrl}
              target="_blank"
              className="font-mono text-teal-600 hover:underline flex items-center gap-1 font-semibold truncate"
            >
              /{key}.txt
              <ExternalLink className="h-3 w-3 shrink-0" />
            </a>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-500 font-medium block">Status</span>
            <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[10px] mt-0.5">
              ● Active & Configured
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Form Component */}
      <IndexNowForm
        publishedPosts={publishedPosts}
        categories={categories}
        recentlyUpdatedSlugs={recentlyUpdatedSlugs}
        baseUrl={baseUrl}
      />
    </div>
  );
}
