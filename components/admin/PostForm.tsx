'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { slugify } from '@/lib/utils';
import { Save, Sparkles } from 'lucide-react';

interface Category {
  id: string;
  name: string;
}

interface Author {
  id: string;
  name: string;
}

interface PostFormProps {
  categories: Category[];
  authors: Author[];
  initialData?: any;
}

export default function PostForm({ categories, authors, initialData }: PostFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || '');
  const [metaDescription, setMetaDescription] = useState(initialData?.metaDescription || '');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || categories[0]?.id || '');
  const [authorId, setAuthorId] = useState(initialData?.authorId || authors[0]?.id || '');
  const [status, setStatus] = useState(initialData?.status || 'published');
  const [isReview, setIsReview] = useState(initialData?.isReview || false);
  const [faqsJson, setFaqsJson] = useState(initialData?.faqsJson || '[]');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!initialData) {
      setSlug(slugify(val) || 'post-slug');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          seoTitle,
          metaDescription,
          seoDescription: metaDescription,
          content,
          excerpt,
          coverImage,
          categoryId,
          authorId,
          status,
          isReview,
          faqsJson,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save post');
      }

      router.push('/admin/posts');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      {error && (
        <div className="rounded-xl bg-rose-50 border border-rose-200 p-4 text-xs font-medium text-rose-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Fields */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3">
              Basic Information
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Article Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={handleTitleChange}
                placeholder="e.g. Best Time Tracking Apps for Freelancers in 2026"
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                URL Slug
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="best-time-tracking-apps"
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-teal-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Cover Image URL</label>
              <input
                type="url"
                required
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Excerpt</label>
              <textarea
                rows={3}
                required
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief summary of the article key takeaways..."
                className="w-full rounded-xl border border-slate-300 p-3 text-sm text-slate-900 focus:border-teal-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Markdown Content Editor */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900">Markdown Content</h3>
              <span className="text-xs text-slate-400">Supports GFM tables & HTML</span>
            </div>
            <textarea
              rows={16}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type your markdown article body here..."
              className="w-full rounded-xl border border-slate-300 p-4 text-sm font-mono text-slate-900 focus:border-teal-500 focus:outline-none"
            />
          </div>

          {/* FAQ JSON */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3">
              FAQ Items (JSON Array Format)
            </h3>
            <textarea
              rows={5}
              value={faqsJson}
              onChange={(e) => setFaqsJson(e.target.value)}
              placeholder='[{"question":"Question?","answer":"Answer..."}]'
              className="w-full rounded-xl border border-slate-300 p-3 text-xs font-mono text-slate-900 focus:border-teal-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          
          {/* Publish & Status */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3">Publish Settings</h3>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-teal-500 focus:outline-none"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-teal-500 focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Author</label>
              <select
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-teal-500 focus:outline-none"
              >
                {authors.map((aut) => (
                  <option key={aut.id} value={aut.id}>
                    {aut.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="isReview"
                checked={isReview}
                onChange={(e) => setIsReview(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              <label htmlFor="isReview" className="text-xs font-medium text-slate-700">
                Mark as Product Review (Renders Comparison Component)
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-teal-700 transition-colors disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {loading ? 'Saving...' : 'Save & Publish Post'}
            </button>
          </div>

          {/* SEO Optimization */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-teal-600" />
              SEO Customization
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Custom SEO Title</label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Leave blank to use main title"
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs text-slate-900 focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Meta Description</label>
              <textarea
                rows={3}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Snippet for search engine results..."
                className="w-full rounded-xl border border-slate-300 p-3 text-xs text-slate-900 focus:border-teal-500 focus:outline-none"
              />
            </div>
          </div>

        </div>

      </div>
    </form>
  );
}
