import { Info } from 'lucide-react';
import Link from 'next/link';

export default function AffiliateDisclaimer() {
  return (
    <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200/80 bg-amber-50/70 p-4 text-xs leading-relaxed text-amber-900 shadow-sm">
      <Info className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
      <div>
        <span className="font-semibold text-amber-950">联盟营销免责声明：</span>
        本文包含联盟营销链接。如果您通过本站的推荐链接购买相关工具或服务，我们可能会获得微薄的佣金收入，这绝对不会增加您的购买成本。这能帮助我们维持网站的运营与优质测评内容的持续输出。{' '}
        <Link href="/disclosure" className="font-medium underline hover:text-amber-700">
          了解更多透明度承诺
        </Link>
        。
      </div>
    </div>
  );
}
