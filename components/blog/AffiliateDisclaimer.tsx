import { Info } from 'lucide-react';
import Link from 'next/link';

export default function AffiliateDisclaimer() {
  return (
    <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200/80 bg-amber-50/70 p-4 text-xs leading-relaxed text-amber-900 shadow-sm">
      <Info className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
      <div>
        <span className="font-semibold text-amber-950">Affiliate Disclosure:</span>
        This article contains affiliate links. If you make a purchase through our recommended links, we may earn a small commission at no additional cost to you. This helps fund our independent testing operations.{' '}
        <Link href="/disclosure" className="font-medium underline hover:text-amber-700">
          Learn more about our transparency policy
        </Link>
        .
      </div>
    </div>
  );
}
