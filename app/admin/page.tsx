import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { FileText, FolderTree, ShoppingBag, Plus, Eye } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [postCount, categoryCount, productCount, recentPosts] = await Promise.all([
    prisma.post.count(),
    prisma.category.count(),
    prisma.affiliateProduct.count(),
    prisma.post.findMany({
      take: 5,
      orderBy: { updatedAt: 'desc' },
      include: { category: true, author: true },
    }),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-xs text-slate-500 mt-1">Manage articles, categories, and affiliate review products</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-1.5 rounded-xl bg-teal-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-teal-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Create New Post
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500">Total Articles</div>
            <div className="text-2xl font-extrabold text-slate-900">{postCount}</div>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <FolderTree className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500">Categories</div>
            <div className="text-2xl font-extrabold text-slate-900">{categoryCount}</div>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500">Affiliate Products</div>
            <div className="text-2xl font-extrabold text-slate-900">{productCount}</div>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Recently Updated Articles</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50 font-semibold uppercase text-slate-700">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Status</th>
                <th className="p-3">Last Modified</th>
                <th className="p-3 text-center">Preview</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentPosts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">{post.title}</td>
                  <td className="p-3 font-medium text-teal-700">{post.category.name}</td>
                  <td className="p-3">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        post.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {post.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="p-3 text-slate-500">{formatDate(post.updatedAt)}</td>
                  <td className="p-3 text-center">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-teal-600 hover:underline"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
