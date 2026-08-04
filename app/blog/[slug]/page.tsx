import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import { formatDate, calculateReadingTime } from '@/lib/utils';
import AffiliateDisclaimer from '@/components/blog/AffiliateDisclaimer';
import AuthorCard from '@/components/blog/AuthorCard';
import MDXContent from '@/components/blog/MDXContent';
import ProductComparison from '@/components/blog/ProductComparison';
import QuickVerdict from '@/components/blog/QuickVerdict';
import FAQAccordion from '@/components/blog/FAQAccordion';
import RelatedPosts from '@/components/blog/RelatedPosts';
import AdPlaceholder from '@/components/common/AdPlaceholder';
import JsonLd from '@/components/seo/JsonLd';

export const revalidate = 3600;

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { category: true, author: true },
  });

  if (!post) {
    return { title: 'Article Not Found' };
  }

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.metaDescription || post.excerpt;
  const url = `${process.env.NEXTAUTH_URL || 'https://remoteworklab.com'}/blog/${post.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: post.publishedAt.toISOString(),
      authors: [post.author.name],
      images: [{ url: post.coverImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post.coverImage],
    },
  };
}

export default async function PostDetailPage({ params }: PostPageProps) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      category: true,
      author: true,
      products: {
        orderBy: { rating: 'desc' },
      },
    },
  });

  if (!post || post.status !== 'published') {
    notFound();
  }

  // Related posts (3 posts in same category)
  const relatedPosts = await prisma.post.findMany({
    where: {
      categoryId: post.categoryId,
      id: { not: post.id },
      status: 'published',
    },
    take: 3,
    orderBy: { publishedAt: 'desc' },
    include: { category: true, author: true },
  });

  const readTime = calculateReadingTime(post.content);
  const faqs = post.faqsJson ? JSON.parse(post.faqsJson) : [];
  const baseUrl = process.env.NEXTAUTH_URL || 'https://remoteworklab.com';
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  const topProduct = post.products && post.products.length > 0 ? (post.products[0] as any) : undefined;

  const breadcrumbs = [
    { name: 'Home', item: baseUrl },
    { name: post.category.name, item: `${baseUrl}/category/${post.category.slug}` },
    { name: post.title, item: postUrl },
  ];

  return (
    <>
      <JsonLd
        type={post.isReview ? 'ProductReview' : 'Article'}
        url={postUrl}
        title={post.seoTitle || post.title}
        description={post.metaDescription || post.excerpt}
        imageUrl={post.coverImage}
        publishedAt={post.publishedAt.toISOString()}
        updatedAt={post.updatedAt.toISOString()}
        authorName={post.author.name}
        faqs={faqs}
        products={post.products as any}
        breadcrumbs={breadcrumbs}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-teal-600">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/category/${post.category.slug}`} className="hover:text-teal-600">
            {post.category.name}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-400 line-clamp-1">{post.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Article Body */}
          <main className="lg:col-span-8 space-y-8">
            
            {/* Header */}
            <header className="space-y-4">
              <Link
                href={`/category/${post.category.slug}`}
                className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800 hover:bg-teal-200 transition-colors"
              >
                {post.category.name}
              </Link>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 border-b border-slate-200 pb-4 text-xs font-medium text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-slate-400" />
                  {readTime} min read
                </span>
              </div>
            </header>

            {/* Affiliate Disclaimer Banner */}
            <AffiliateDisclaimer />

            {/* PCMag & Wirecutter Style Quick Verdict Box */}
            <QuickVerdict
              testingHours={post.testingHours}
              quickVerdict={post.quickVerdict}
              topProduct={topProduct}
            />

            {/* Author Card Header */}
            <AuthorCard author={post.author} />

            {/* Cover Image */}
            <div className="relative h-72 sm:h-96 w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* AdSense In-Article Slot 1 */}
            <AdPlaceholder slotName="In-Article Ad Placement #1" variant="in-article" />

            {/* Markdown Content */}
            <MDXContent content={post.content} />

            {/* Product Comparison Section for Reviews */}
            {post.products && post.products.length > 0 && (
              <ProductComparison products={post.products as any} />
            )}

            {/* AdSense In-Article Slot 2 */}
            <AdPlaceholder slotName="In-Article Ad Placement #2" variant="in-article" />

            {/* FAQ Accordion Component */}
            {faqs.length > 0 && <FAQAccordion faqs={faqs} />}

            {/* Repeated Author Card at Bottom */}
            <AuthorCard author={post.author} />

            {/* Related Posts */}
            <RelatedPosts posts={relatedPosts} />
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Sidebar Author Info Box */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 text-sm">
                About RemoteWorkLab
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                RemoteWorkLab tests top-tier productivity tools and home office equipment for remote professionals, digital nomads, and independent creators.
              </p>
            </div>

            {/* Sidebar AdSense Slot */}
            <AdPlaceholder slotName="Sidebar Sticky Ad Placement" variant="sidebar" />
          </aside>

        </div>
      </div>
    </>
  );
}
