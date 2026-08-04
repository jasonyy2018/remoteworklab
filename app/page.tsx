import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import PostCard from '@/components/blog/PostCard';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Laptop, Monitor } from 'lucide-react';

export const revalidate = 3600; // ISR 1 hour

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    where: { status: 'published' },
    orderBy: { publishedAt: 'desc' },
    take: 9,
    include: {
      category: true,
      author: true,
    },
  });

  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { posts: true },
      },
    },
  });

  const featuredPost = posts[0];
  const recentPosts = posts.slice(1);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 pt-16 pb-20 text-white shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/40 via-slate-900 to-slate-950"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-semibold text-teal-300 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-teal-400" />
              Independent · Hands-On Tested · Productivity Focused
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white leading-tight">
              Master Your <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">Remote Work Stack</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Unbiased software reviews, ergonomic hardware buyer guides, and freelance growth strategies designed for digital nomads and home-based professionals.
            </p>

            {/* Feature Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-teal-400" />
                100% Independent Reviews
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-teal-400" />
                No Fluff, Data Driven
              </div>
              <div className="flex items-center gap-1.5">
                <Laptop className="h-4 w-4 text-teal-400" />
                Hardware & SaaS Covered
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Featured Post (Hero Card) */}
        {featuredPost && (
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="h-6 w-1.5 rounded-full bg-teal-600"></span>
                Featured Lead Article
              </h2>
              <span className="text-xs font-semibold text-teal-600">Editor's Pick</span>
            </div>
            <PostCard post={featuredPost} featured={true} />
          </section>
        )}

        {/* Category Grid Section */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Explore Topics by Category</h2>
            <p className="text-xs text-slate-500">Discover hand-picked resources for your remote work journey</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all hover:-translate-y-1 hover:border-teal-500/50 hover:shadow-md"
              >
                <div className="space-y-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                    <Monitor className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-semibold text-slate-400 group-hover:text-teal-600">
                  <span>{cat._count.posts} {cat._count.posts === 1 ? 'Article' : 'Articles'}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Latest Articles Grid */}
        {recentPosts.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="h-6 w-1.5 rounded-full bg-teal-600"></span>
                Latest Reviews & Guides
              </h2>
              <Link
                href="/blog"
                className="flex items-center gap-1 text-xs font-semibold text-teal-600 hover:text-teal-700"
              >
                View All Articles ({posts.length})
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
