import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { formatDate, calculateReadingTime } from '@/lib/utils';

export interface PostCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    coverImage: string;
    publishedAt: Date | string;
    content: string;
    category: {
      name: string;
      slug: string;
    };
    author: {
      name: string;
      avatar: string;
    };
  };
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const readTime = calculateReadingTime(post.content);

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
        featured ? 'md:flex-row md:items-stretch' : ''
      }`}
    >
      {/* Cover Image */}
      <div
        className={`relative overflow-hidden bg-slate-100 ${
          featured ? 'h-64 md:h-auto md:w-1/2' : 'h-52 w-full'
        }`}
      >
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Link
            href={`/category/${post.category.slug}`}
            className="rounded-full bg-teal-600/90 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-xs hover:bg-teal-700 transition-colors"
          >
            {post.category.name}
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className={`flex flex-1 flex-col justify-between p-6 ${featured ? 'md:w-1/2' : ''}`}>
        <div className="space-y-3">
          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              约 {readTime} 分钟阅读
            </span>
          </div>

          {/* Title */}
          <h2
            className={`font-bold text-slate-900 leading-snug group-hover:text-teal-600 transition-colors ${
              featured ? 'text-xl md:text-2xl' : 'text-lg line-clamp-2'
            }`}
          >
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>

          {/* Excerpt */}
          <p className="text-xs leading-relaxed text-slate-600 line-clamp-3">
            {post.excerpt}
          </p>
        </div>

        {/* Card Footer: Author & Read More */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2">
            <div className="relative h-7 w-7 overflow-hidden rounded-full border border-slate-200">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xs font-medium text-slate-700">{post.author.name}</span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="flex items-center gap-1 text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors"
          >
            阅读全文
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
