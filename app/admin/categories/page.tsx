import { prisma } from '@/lib/prisma';
import { FolderTree } from 'lucide-react';

export const revalidate = 0;

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { posts: true },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900">分类管理</h1>
        <p className="text-xs text-slate-500 mt-1">网站的核心内容板块设置</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
              <FolderTree className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900">{cat.name}</h3>
              <p className="text-xs text-slate-500 font-mono">Slug: {cat.slug}</p>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">{cat.description}</p>
              <div className="pt-2 text-[11px] font-semibold text-teal-600">
                包含 {cat._count.posts} 篇文章
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
