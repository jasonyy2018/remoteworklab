'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { slugify } from '@/lib/utils';
import { Save, Eye, Sparkles } from 'lucide-react';

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
        throw new Error(data.error || '保存失败');
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
              文章基础信息
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">文章标题</label>
              <input
                type="text"
                required
                value={title}
                onChange={handleTitleChange}
                placeholder="例如：2026年最佳自由职业时间追踪软件测评"
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                URL Slug (自动拼音/英文)
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
              <label className="block text-xs font-medium text-slate-700 mb-1">封面图 URL</label>
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
              <label className="block text-xs font-medium text-slate-700 mb-1">文章摘要 (Excerpt)</label>
              <textarea
                rows={3}
                required
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="简要概括文章主要观点与核心结论..."
                className="w-full rounded-xl border border-slate-300 p-3 text-sm text-slate-900 focus:border-teal-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Markdown Content Editor */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900">Markdown 正文内容</h3>
              <span className="text-xs text-slate-400">支持 GFM 表格与 HTML</span>
            </div>
            <textarea
              rows={16}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="在此输入 Markdown 格式的文章正文..."
              className="w-full rounded-xl border border-slate-300 p-4 text-sm font-mono text-slate-900 focus:border-teal-500 focus:outline-none"
            />
          </div>

          {/* FAQ JSON */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3">
              FAQ 常见问答对 (JSON 格式)
            </h3>
            <textarea
              rows={5}
              value={faqsJson}
              onChange={(e) => setFaqsJson(e.target.value)}
              placeholder='[{"question":"问题？","answer":"回答..."}]'
              className="w-full rounded-xl border border-slate-300 p-3 text-xs font-mono text-slate-900 focus:border-teal-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          
          {/* Publish & Status */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3">发布设置</h3>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">发布状态</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-teal-500 focus:outline-none"
              >
                <option value="published">已发布 (Published)</option>
                <option value="draft">草稿 (Draft)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">文章分类</label>
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
              <label className="block text-xs font-medium text-slate-700 mb-1">署名作者</label>
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
                标记为产品评测文章（自动渲染对比表格）
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-teal-700 transition-colors disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {loading ? '正在保存...' : '保存并发布文章'}
            </button>
          </div>

          {/* SEO Optimization */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-teal-600" />
              SEO 字段自定义
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">SEO Title (自定义标题)</label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="留空则自动使用文章标题"
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs text-slate-900 focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Meta Description (描述)</label>
              <textarea
                rows={3}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="用于 Google 搜索结果摘要..."
                className="w-full rounded-xl border border-slate-300 p-3 text-xs text-slate-900 focus:border-teal-500 focus:outline-none"
              />
            </div>
          </div>

        </div>

      </div>
    </form>
  );
}
