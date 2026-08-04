import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { Star, ExternalLink } from 'lucide-react';

export const revalidate = 0;

export default async function AdminProductsPage() {
  const products = await prisma.affiliateProduct.findMany({
    include: { post: true },
    orderBy: { updatedAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900">Affiliate Products Library</h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage product ratings, pros & cons, prices, and affiliate links (with rel="nofollow sponsored" attributes)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((prod) => {
          const pros: string[] = JSON.parse(prod.prosJson || '[]');
          const cons: string[] = JSON.parse(prod.consJson || '[]');
          return (
            <div
              key={prod.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 rounded-lg overflow-hidden border border-slate-200">
                    <Image
                      src={prod.imageUrl}
                      alt={prod.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{prod.name}</h3>
                    <div className="flex items-center gap-1 font-bold text-amber-500 text-xs">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {prod.rating.toFixed(1)}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{prod.description}</p>
                <div className="text-xs font-semibold text-teal-700">Price: {prod.price}</div>

                {prod.post && (
                  <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-2">
                    Linked Article: <span className="font-semibold text-slate-800">{prod.post.title}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <a
                  href={prod.affiliateUrl}
                  target="_blank"
                  rel="nofollow sponsored"
                  className="flex items-center justify-center gap-1.5 w-full rounded-xl bg-slate-900 py-2 text-xs font-semibold text-white hover:bg-teal-600 transition-colors"
                >
                  Test Affiliate Link
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
