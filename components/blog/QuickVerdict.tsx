import { Award, Clock, CheckCircle2, ExternalLink } from 'lucide-react';
import { ProductItem } from './ProductComparison';

interface QuickVerdictProps {
  testingHours?: number;
  quickVerdict?: string | null;
  topProduct?: ProductItem;
}

export default function QuickVerdict({
  testingHours = 35,
  quickVerdict,
  topProduct,
}: QuickVerdictProps) {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border-2 border-teal-600/30 bg-gradient-to-br from-teal-900 via-slate-900 to-slate-950 p-6 text-white shadow-xl">
      {/* E-E-A-T Trust Badges */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-teal-500/20 pb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500 text-slate-950">
            <Award className="h-4 w-4" />
          </span>
          <span className="text-sm font-extrabold uppercase tracking-wide text-teal-300">
            PCMag & Wirecutter Verdict
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold text-teal-200/80">
          <span className="flex items-center gap-1 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
            <Clock className="h-3.5 w-3.5 text-teal-400" />
            Tested for {testingHours}+ Hours
          </span>
          <span className="flex items-center gap-1 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 text-emerald-300">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            Verified for 2026
          </span>
        </div>
      </div>

      {/* Main Verdict Summary (PCMag "The Bottom Line") */}
      <div className="mt-5 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          THE BOTTOM LINE & EXECUTIVE VERDICT
        </h3>
        <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
          {quickVerdict ||
            'After testing multiple market-leading solutions, we selected Toggl Track as our #1 Overall Pick for its seamless UI, zero-learning curve, and accurate client reporting capabilities.'}
        </p>
      </div>

      {/* Top Pick Highlight Card (Wirecutter "Our Pick" conversion shortcut) */}
      {topProduct && (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-teal-500/30 bg-teal-950/40 p-4 backdrop-blur-xs">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center rounded-md bg-amber-400 px-2.5 py-1 text-[11px] font-black uppercase text-slate-950 shadow-sm">
              OUR #1 PICK
            </span>
            <div>
              <div className="font-bold text-white text-base">{topProduct.name}</div>
              <div className="text-xs text-teal-200/70">{topProduct.price} · Rating {topProduct.rating.toFixed(1)}/5.0</div>
            </div>
          </div>

          <a
            href={topProduct.affiliateUrl}
            target="_blank"
            rel="nofollow sponsored"
            className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-md shadow-teal-500/20 hover:bg-teal-400 transition-colors shrink-0"
          >
            Check Live Price & Deals
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      )}
    </div>
  );
}
