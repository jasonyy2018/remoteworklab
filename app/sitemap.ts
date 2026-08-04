import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://remoteworklab.com';

  // 1. Static routes
  const routes = ['', '/blog', '/about', '/contact', '/disclosure', '/privacy-policy'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Dynamic Post URLs
  const posts = await prisma.post.findMany({
    where: { status: 'published' },
    select: { slug: true, updatedAt: true },
  });

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 3. Dynamic Category URLs
  const categories = await prisma.category.findMany({
    select: { slug: true, updatedAt: true },
  });

  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: cat.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...routes, ...postUrls, ...categoryUrls];
}
