import { prisma } from '@/lib/prisma';
import PostCard from '@/components/blog/PostCard';
import Pagination from '@/components/common/Pagination';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${category.name} - Topic Guide`,
    description: category.description || `Browse all reviews and guides in the ${category.name} category.`,
  };
}

export const revalidate = 3600;

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || '1', 10);
  const pageSize = 10;

  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) {
    notFound();
  }

  const [posts, totalPosts] = await Promise.all([
    prisma.post.findMany({
      where: {
        categoryId: category.id,
        status: 'published',
      },
      orderBy: { publishedAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        category: true,
        author: true,
      },
    }),
    prisma.post.count({
      where: {
        categoryId: category.id,
        status: 'published',
      },
    }),
  ]);

  const totalPages = Math.ceil(totalPosts / pageSize);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="text-xs font-semibold uppercase tracking-wider text-teal-600">
          CATEGORY TOPIC
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{category.name}</h1>
        {category.description && (
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            {category.description}
          </p>
        )}
      </div>

      {posts.length === 0 ? (
        <div className="py-12 text-center text-slate-500 text-sm">No articles published in this category yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath={`/category/${category.slug}`}
      />
    </div>
  );
}
