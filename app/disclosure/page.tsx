import { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: '联盟营销免责声明 (Affiliate Disclosure)',
  description: 'RemoteWorkLab 联盟营销透明度声明与承诺。',
};

export default function DisclosurePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 space-y-8">
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-teal-600 font-semibold text-xs uppercase tracking-wider">
          <ShieldCheck className="h-4 w-4" />
          Transparency Commitment
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">联盟营销免责声明 (Affiliate Disclosure)</h1>
        <p className="text-xs text-slate-500">最后更新日期：2026年1月1日</p>
      </div>

      <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-700 space-y-6">
        <p>
          在 RemoteWorkLab，我们致力于保持 100% 的透明度。本声明旨在向所有读者说明本网站的商业化变现模式与推荐链接政策。
        </p>

        <h2 className="text-lg font-bold text-slate-900">1. 什么是联盟链接？</h2>
        <p>
          本网站的文章与对比表格中包含部分“联盟营销链接”（Affiliate Links）。这意味着，当您点击这些链接并跳转至第三方软件服务商或 Amazon 等电商平台购买产品时，第三方平台可能会向我们支付微薄的推广佣金（Commission）。
        </p>

        <h2 className="text-lg font-bold text-slate-900">2. 这会增加您的购买成本吗？</h2>
        <p>
          <strong>绝对不会。</strong> 通过我们的联盟链接购买，您支付的价格与直接访问官网完全相同，甚至在某些情况下，通过我们的专属合作链接还能享有独家折扣或延长免费试用期。
        </p>

        <h2 className="text-lg font-bold text-slate-900">3. 我们的独立测评原则</h2>
        <p>
          我们绝不会因为更高的佣金比例而夸大某个差劲产品的优点，也绝不会为了推广而推荐我们未曾测试或不认可的产品。所有评分（1-5星）与 Pros & Cons 均基于真实的评测体验。
        </p>

        <h2 className="text-lg font-bold text-slate-900">4. Amazon 关联声明</h2>
        <p>
          RemoteWorkLab 参与了 Amazon Services LLC Associates Program 联盟计划，这是一个专为网站通过宣传和链接到 Amazon.com 提供广告费用赚取渠道而设计的联盟广告计划。
        </p>
      </div>
    </div>
  );
}
