'use client';

import { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, RefreshCw, FileText, Link2, Sparkles, Clock, Layers, Globe } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface PublishedPost {
  id: string;
  title: string;
  slug: string;
  updatedAt: Date | string;
  category: { name: string; slug: string };
}

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  updatedAt: Date | string;
}

interface IndexNowFormProps {
  publishedPosts: PublishedPost[];
  categories: CategoryItem[];
  recentlyUpdatedSlugs: string[];
  initialBaseUrl: string;
}

export default function IndexNowForm({
  publishedPosts,
  categories,
  recentlyUpdatedSlugs,
  initialBaseUrl,
}: IndexNowFormProps) {
  const [baseUrl, setBaseUrl] = useState<string>(initialBaseUrl);
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [selectedCategorySlugs, setSelectedCategorySlugs] = useState<string[]>([]);
  const [includeHomepage, setIncludeHomepage] = useState<boolean>(true);
  const [customUrls, setCustomUrls] = useState<string>('');

  const [submitting, setSubmitting] = useState(false);
  const [resultData, setResultData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Client-side domain auto-detection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const host = window.location.host;
      if (!host.includes('localhost') && !host.includes('127.0.0.1')) {
        setBaseUrl(`${window.location.protocol}//${host}`);
      }
    }
  }, []);

  // Auto-select recently updated URLs on initial load
  useEffect(() => {
    if (recentlyUpdatedSlugs.length > 0) {
      setSelectedSlugs(recentlyUpdatedSlugs);
    } else if (publishedPosts.length > 0) {
      setSelectedSlugs([publishedPosts[0].slug]);
    }
  }, [recentlyUpdatedSlugs, publishedPosts]);

  const cleanBaseUrl = (url: string) => {
    return url.replace(/\/+$/, '');
  };

  const currentBaseUrl = cleanBaseUrl(baseUrl);

  const toggleSelectPost = (slug: string) => {
    if (selectedSlugs.includes(slug)) {
      setSelectedSlugs(selectedSlugs.filter((s) => s !== slug));
    } else {
      setSelectedSlugs([...selectedSlugs, slug]);
    }
  };

  const toggleSelectCategory = (slug: string) => {
    if (selectedCategorySlugs.includes(slug)) {
      setSelectedCategorySlugs(selectedCategorySlugs.filter((s) => s !== slug));
    } else {
      setSelectedCategorySlugs([...selectedCategorySlugs, slug]);
    }
  };

  const selectAutoDetectedUpdated = () => {
    setSelectedSlugs(recentlyUpdatedSlugs.length > 0 ? recentlyUpdatedSlugs : publishedPosts.map((p) => p.slug));
    setSelectedCategorySlugs(categories.map((c) => c.slug));
    setIncludeHomepage(true);
  };

  const selectAll = () => {
    if (selectedSlugs.length === publishedPosts.length) {
      setSelectedSlugs([]);
    } else {
      setSelectedSlugs(publishedPosts.map((p) => p.slug));
    }
  };

  // Calculate live preview list of resolved URLs
  const getResolvedUrls = () => {
    const urls: string[] = [];

    if (includeHomepage) {
      urls.push(currentBaseUrl);
    }

    selectedCategorySlugs.forEach((catSlug) => {
      urls.push(`${currentBaseUrl}/category/${catSlug}`);
    });

    selectedSlugs.forEach((slug) => {
      urls.push(`${currentBaseUrl}/blog/${slug}`);
    });

    const manualUrls = customUrls
      .split('\n')
      .map((u) => u.trim())
      .filter((u) => u.length > 0);

    manualUrls.forEach((u) => {
      urls.push(u);
    });

    return Array.from(new Set(urls));
  };

  const resolvedUrls = getResolvedUrls();

  const handleSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');
    setResultData(null);

    if (resolvedUrls.length === 0) {
      setErrorMsg('Please select at least one URL or enter a custom URL to submit.');
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/admin/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls: resolvedUrls }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      setResultData(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error executing submission request');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmission} className="space-y-6">

      {/* Target Domain Input Setting */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-teal-600 shrink-0" />
          <div>
            <label className="block text-xs font-bold text-slate-900">Target Production Domain URL</label>
            <span className="text-[11px] text-slate-500">Domain used for indexation links & IndexNow API host</span>
          </div>
        </div>
        <input
          type="text"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          placeholder="https://remoteworklab.com"
          className="w-full sm:w-80 rounded-xl border border-slate-300 px-3.5 py-2 text-xs font-mono font-bold text-slate-900 focus:border-teal-500 focus:outline-none"
        />
      </div>
      
      {/* Auto-Detection Smart Banner */}
      <div className="rounded-2xl border border-teal-200 bg-gradient-to-r from-teal-50 to-emerald-50 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-teal-800 font-bold text-sm">
            <Sparkles className="h-4 w-4 text-teal-600" />
            Auto-Detected Recently Modified Pages
          </div>
          <p className="text-xs text-slate-600">
            Identified <span className="font-bold text-teal-700">{recentlyUpdatedSlugs.length} recently updated articles</span> ready for instant IndexNow search engine push.
          </p>
        </div>

        <button
          type="button"
          onClick={selectAutoDetectedUpdated}
          className="inline-flex items-center gap-1.5 rounded-xl bg-teal-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-teal-700 transition-colors shrink-0"
        >
          <Clock className="h-3.5 w-3.5" />
          Auto-Select All Changed URLs
        </button>
      </div>

      {/* Response Feedback Banners */}
      {resultData && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 space-y-3">
          <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            {resultData.message}
          </div>

          <div className="space-y-1 text-xs text-emerald-800 font-mono">
            <div className="font-semibold text-emerald-950 mb-1">Endpoints Response:</div>
            {resultData.results?.map((res: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between border-b border-emerald-200/60 pb-1">
                <span>{res.target}</span>
                <span className="font-bold">
                  {res.ok ? `Status ${res.status} (Accepted)` : `Error: ${res.error}`}
                </span>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-emerald-700 pt-2 border-t border-emerald-200/80">
            Submitted URLs List ({resultData.submittedUrls?.length}):
            <ul className="list-disc pl-4 mt-1 space-y-0.5 font-mono max-h-40 overflow-y-auto">
              {resultData.submittedUrls?.map((url: string, i: number) => (
                <li key={i}>{url}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
          {errorMsg}
        </div>
      )}

      {/* Live Detected URLs Summary Box */}
      <div className="rounded-2xl border border-slate-200 bg-slate-900 text-white p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold flex items-center gap-1.5">
            <Layers className="h-4 w-4" />
            Live Submission Queue ({resolvedUrls.length} URLs identified)
          </span>
          <span className="text-[10px] text-slate-400">Ready to push</span>
        </div>
        <div className="max-h-36 overflow-y-auto space-y-1 font-mono text-xs text-slate-300 pr-2">
          {resolvedUrls.length === 0 ? (
            <span className="text-slate-500 italic">No URLs selected yet</span>
          ) : (
            resolvedUrls.map((url, i) => (
              <div key={i} className="flex items-center gap-2 truncate">
                <span className="text-teal-400 text-[10px] font-bold">[{i + 1}]</span>
                <span className="truncate">{url}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Published Articles Select Panel */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-teal-600" />
            <h3 className="font-bold text-slate-900 text-sm">
              Articles Directory & Change Detection ({selectedSlugs.length} selected)
            </h3>
          </div>
          <button
            type="button"
            onClick={selectAll}
            className="text-xs font-semibold text-teal-600 hover:text-teal-700"
          >
            {selectedSlugs.length === publishedPosts.length ? 'Deselect All' : 'Select All Articles'}
          </button>
        </div>

        <div className="max-h-64 overflow-y-auto space-y-2 pr-2">
          {publishedPosts.map((post) => {
            const isChecked = selectedSlugs.includes(post.slug);
            const isRecentlyUpdated = recentlyUpdatedSlugs.includes(post.slug);
            return (
              <label
                key={post.id}
                className={`flex items-center justify-between p-3 rounded-xl border transition-colors cursor-pointer text-xs ${
                  isChecked
                    ? 'border-teal-500 bg-teal-50/50'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleSelectPost(post.slug)}
                    className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                  />
                  <div>
                    <div className="font-semibold text-slate-900 flex items-center gap-2">
                      {post.title}
                      {isRecentlyUpdated && (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-extrabold text-emerald-800 uppercase">
                          Recent Update
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">{currentBaseUrl}/blog/{post.slug}</div>
                  </div>
                </div>
                <div className="text-right text-[11px] text-slate-400">
                  <span className="font-medium text-teal-700 mr-2">{post.category.name}</span>
                  {formatDate(post.updatedAt)}
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Category Hubs & Static Pages Select */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3 flex items-center gap-2">
          <Layers className="h-4 w-4 text-teal-600" />
          Core Pages & Category Hubs
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
            <input
              type="checkbox"
              checked={includeHomepage}
              onChange={(e) => setIncludeHomepage(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
            />
            <div>
              <div className="font-bold text-slate-900">Homepage</div>
              <div className="text-[10px] text-slate-500 font-mono">{currentBaseUrl}/</div>
            </div>
          </label>

          {categories.map((cat) => {
            const isCatChecked = selectedCategorySlugs.includes(cat.slug);
            return (
              <label
                key={cat.id}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-colors cursor-pointer ${
                  isCatChecked ? 'border-teal-500 bg-teal-50/50' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isCatChecked}
                  onChange={() => toggleSelectCategory(cat.slug)}
                  className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                />
                <div>
                  <div className="font-bold text-slate-900">{cat.name} Hub</div>
                  <div className="text-[10px] text-slate-500 font-mono">{currentBaseUrl}/category/{cat.slug}</div>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Manual Custom URLs Entry */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Link2 className="h-4 w-4 text-teal-600" />
          <h3 className="font-bold text-slate-900 text-sm">
            Manual Custom URLs (One URL per line)
          </h3>
        </div>

        <textarea
          rows={3}
          value={customUrls}
          onChange={(e) => setCustomUrls(e.target.value)}
          placeholder={`${currentBaseUrl}/about\n${currentBaseUrl}/contact`}
          className="w-full rounded-xl border border-slate-300 p-3 text-xs font-mono text-slate-900 focus:border-teal-500 focus:outline-none"
        />
      </div>

      {/* Submit Action Button */}
      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-3.5 text-xs font-bold text-white shadow-md hover:bg-teal-700 transition-colors disabled:opacity-50"
      >
        {submitting ? (
          <>
            <RefreshCw className="h-4 w-4 animate-spin" />
            Pushing Identified URLs to IndexNow...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Push Identified {resolvedUrls.length} URL(s) to IndexNow
          </>
        )}
      </button>
    </form>
  );
}
