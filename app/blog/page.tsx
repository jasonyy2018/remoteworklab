import { prisma } from '@/lib/prisma';
import PostCard from '@/components/blog/PostCard';
import Pagination from '@/components/common/Pagination';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '所有文章与效率测评指南',
  description: '浏览 RemoteWorkLab 所有关于远程办公、软件测评、人体工学桌椅及自由职业的深度指南。',
};

export const revalidate = 3600;

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || '1', 10);
  const pageSize = 10;

  const [posts, totalPosts] = await Promise.all([
    prisma.post.findMany({
      where: { status: 'published' },
      orderBy: { publishedAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        category: true,
        author: true,
      },
    }),
    prisma.post.count({
      where: { status: 'published' },
    }),
  ]);

  const totalPages = Math.ceil(totalPosts / pageSize);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">所有文章与评测</h1>
        <p className="text-sm text-slate-600">
          共收录 {totalPosts} 篇独立评测与指南，助力全方位优化你的远程办公状态。
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="py-12 text-center text-slate-500 text-sm">暂无已发布的文章</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <Pagination currentPage={page} totalPages={totalPages} basePath="/blog" />
    </div>
  );
}
