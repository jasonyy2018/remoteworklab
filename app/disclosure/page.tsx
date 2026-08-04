import { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description: 'RemoteWorkLab affiliate disclosure and editorial transparency policy.',
};

export default function DisclosurePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 space-y-8">
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-teal-600 font-semibold text-xs uppercase tracking-wider">
          <ShieldCheck className="h-4 w-4" />
          Transparency Commitment
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Affiliate Disclosure</h1>
        <p className="text-xs text-slate-500">Last updated: January 1, 2026</p>
      </div>

      <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-700 space-y-6">
        <p>
          At RemoteWorkLab, we believe in 100% transparency. This document explains how our site generates revenue and how we handle affiliate links across our content.
        </p>

        <h2 className="text-lg font-bold text-slate-900">1. What Are Affiliate Links?</h2>
        <p>
          Articles and comparison tables on RemoteWorkLab contain affiliate links. When you click on these links and purchase software, subscriptions, or hardware on third-party merchant sites (such as Amazon or software partner sites), we may earn a referral commission.
        </p>

        <h2 className="text-lg font-bold text-slate-900">2. Does This Increase Your Cost?</h2>
        <p>
          <strong>No, absolutely not.</strong> Purchasing through our affiliate links costs you the exact same price as visiting the vendor directly. In many cases, our partnership links may grant access to exclusive discounts or extended free trials.
        </p>

        <h2 className="text-lg font-bold text-slate-900">3. Our Editorial Independence</h2>
        <p>
          Commission rates never influence our product ratings, pros/cons, or editorial opinions. We never recommend products we haven't tested or wouldn't use ourselves.
        </p>

        <h2 className="text-lg font-bold text-slate-900">4. Amazon Associate Program Declaration</h2>
        <p>
          RemoteWorkLab is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
        </p>
      </div>
    </div>
  );
}
