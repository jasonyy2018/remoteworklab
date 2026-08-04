import Image from 'next/image';
import { Star, CheckCircle, XCircle, ExternalLink, Award, Sparkles } from 'lucide-react';

export interface ProductItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  affiliateUrl: string;
  price: string;
  badge?: string | null;   // e.g. "EDITOR'S CHOICE", "BEST VALUE", "BUDGET PICK"
  bestFor?: string | null; // e.g. "Best for Solo Freelancers"
  prosJson: string;        // JSON array string
  consJson: string;        // JSON array string
  rating: number;
}

interface ProductComparisonProps {
  products: ProductItem[];
}

export default function ProductComparison({ products }: ProductComparisonProps) {
  if (!products || products.length === 0) return null;

  return (
    <div className="my-10 space-y-8">
      <div className="border-b border-slate-200 pb-3">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="h-6 w-1.5 rounded-full bg-teal-600"></span>
          Top Tested Recommendations & Breakdown
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Detailed side-by-side evaluation with Wirecutter-style categories and real-world pros/cons.
        </p>
      </div>

      {/* Comparison Table for Large Screens */}
      <div className="hidden lg:block overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-xs font-semibold uppercase text-slate-700">
            <tr>
              <th className="p-4">Product & Category</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Price</th>
              <th className="p-4">Key Pros</th>
              <th className="p-4">Key Cons</th>
              <th className="p-4 text-center">Exclusive Offer</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {products.map((item) => {
              const pros: string[] = JSON.parse(item.prosJson || '[]');
              const cons: string[] = JSON.parse(item.consJson || '[]');
              return (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-semibold text-slate-900 min-w-[200px]">
                    <div className="space-y-2">
                      {item.badge && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-amber-400 px-2 py-0.5 text-[10px] font-black uppercase text-slate-950 shadow-xs">
                          <Award className="h-3 w-3" />
                          {item.badge}
                        </span>
                      )}
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0 rounded-lg overflow-hidden border border-slate-200">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-base">{item.name}</div>
                          {item.bestFor && (
                            <div className="text-[11px] font-semibold text-teal-700">{item.bestFor}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 min-w-[100px]">
                    <div className="flex items-center gap-1 font-bold text-amber-500">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      {item.rating.toFixed(1)} / 5.0
                    </div>
                  </td>
                  <td className="p-4 font-medium text-teal-700 min-w-[110px]">{item.price}</td>
                  <td className="p-4 min-w-[200px]">
                    <ul className="space-y-1 text-xs text-slate-700">
                      {pros.map((p, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-4 min-w-[200px]">
                    <ul className="space-y-1 text-xs text-slate-600">
                      {cons.map((c, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <XCircle className="h-3.5 w-3.5 text-rose-400 shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-4 text-center min-w-[150px]">
                    <a
                      href={item.affiliateUrl}
                      target="_blank"
                      rel="nofollow sponsored"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-teal-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-teal-700 transition-colors"
                    >
                      Check Price
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Individual Cards for Mobile / Small Screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-6">
        {products.map((item) => {
          const pros: string[] = JSON.parse(item.prosJson || '[]');
          const cons: string[] = JSON.parse(item.consJson || '[]');
          return (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs relative"
            >
              <div>
                {item.badge && (
                  <div className="mb-3">
                    <span className="inline-flex items-center gap-1 rounded-md bg-amber-400 px-2.5 py-1 text-[10px] font-black uppercase text-slate-950 shadow-xs">
                      <Award className="h-3 w-3" />
                      {item.badge}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="relative h-14 w-14 shrink-0 rounded-xl overflow-hidden border border-slate-200">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{item.name}</h3>
                    {item.bestFor && (
                      <div className="text-xs font-semibold text-teal-700">{item.bestFor}</div>
                    )}
                    <div className="flex items-center gap-1 font-bold text-amber-500 text-xs mt-0.5">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {item.rating.toFixed(1)} / 5.0
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-xs text-slate-600 leading-relaxed">{item.description}</p>
                <div className="mt-2 text-sm font-semibold text-teal-700">Price: {item.price}</div>

                <div className="mt-4 space-y-2 border-t border-slate-100 pt-3">
                  <div className="text-xs font-bold text-slate-800">Key Pros:</div>
                  {pros.map((p, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 space-y-2">
                  <div className="text-xs font-bold text-slate-800">Key Cons:</div>
                  {cons.map((c, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
                      <XCircle className="h-3.5 w-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={item.affiliateUrl}
                target="_blank"
                rel="nofollow sponsored"
                className="mt-5 flex items-center justify-center gap-1.5 w-full rounded-xl bg-teal-600 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-teal-700 transition-colors"
              >
                View Current Price
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
