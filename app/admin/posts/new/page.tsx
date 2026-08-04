import { prisma } from '@/lib/prisma';
import PostForm from '@/components/admin/PostForm';

export const revalidate = 0;

export default async function NewPostPage() {
  const [categories, authors] = await Promise.all([
    prisma.category.findMany(),
    prisma.author.findMany(),
  ]);

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900">Create & Publish New Article</h1>
        <p className="text-xs text-slate-500 mt-1">Markdown formatting with custom SEO metadata support</p>
      </div>

      <PostForm categories={categories} authors={authors} />
    </div>
  );
}
