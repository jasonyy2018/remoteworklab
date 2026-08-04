import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import Image from 'next/image';

interface MDXContentProps {
  content: string;
}

export default function MDXContent({ content }: MDXContentProps) {
  return (
    <article className="prose prose-slate prose-teal max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-teal-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-sm">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          img: ({ src, alt }) => {
            if (!src || typeof src !== 'string') return null;
            return (
              <span className="my-6 block overflow-hidden rounded-xl border border-slate-200">
                <Image
                  src={src}
                  alt={alt || 'Article Image'}
                  width={1200}
                  height={675}
                  className="w-full object-cover"
                />
                {alt && (
                  <span className="block text-center text-xs text-slate-500 mt-2 italic">
                    {alt}
                  </span>
                )}
              </span>
            );
          },
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="bg-slate-100 p-3 font-bold text-slate-800 border-b border-slate-200">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="p-3 border-b border-slate-100 text-slate-700">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
