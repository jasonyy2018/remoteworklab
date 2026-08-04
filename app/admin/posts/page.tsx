import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Eye, Edit3 } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const revalidate = 0;

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { updatedAt: 'desc' },
    include: { category: true, author: true },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">文章管理</h1>
          <p className="text-xs text-slate-500 mt-1">共 {posts.length} 篇文章</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-1.5 rounded-xl bg-teal-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-teal-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          新建文章
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50 font-semibold uppercase text-slate-700">
            <tr>
              <th className="p-4">文章标题</th>
              <th className="p-4">Slug</th>
              <th className="p-4">分类</th>
              <th className="p-4">类型</th>
              <th className="p-4">状态</th>
              <th className="p-4">发布日期</th>
              <th className="p-4 text-center">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-900 max-w-xs truncate">{post.title}</td>
                <td className="p-4 font-mono text-slate-500 max-w-xs truncate">{post.slug}</td>
                <td className="p-4 font-medium text-teal-700">{post.category.name}</td>
                <td className="p-4">
                  {post.isReview ? (
                    <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                      评测类
                    </span>
                  ) : (
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                      常规文章
                    </span>
                  )}
                </td>
                <td className="p-4">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      post.status === 'published'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {post.status === 'published' ? '已发布' : '草稿'}
                  </span>
                </td>
                <td className="p-4 text-slate-500">{formatDate(post.publishedAt)}</td>
                <td className="p-4 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="text-slate-500 hover:text-teal-600"
                      title="前台预览"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <span className="text-slate-300">|</span>
                    <span className="text-xs text-slate-400 font-mono">ID:{post.id.slice(0, 5)}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
