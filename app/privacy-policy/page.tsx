import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '隐私政策 (Privacy Policy)',
  description: 'RemoteWorkLab 隐私政策与数据保护声明。',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 space-y-8">
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900">隐私政策 (Privacy Policy)</h1>
        <p className="text-xs text-slate-500">最后更新日期：2026年1月1日</p>
      </div>

      <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-700 space-y-6">
        <p>
          RemoteWorkLab（以下简称“我们”）非常重视用户的隐私保护。本隐私政策阐明了您在使用本网站时，我们如何收集、使用和保护您的个人信息。
        </p>

        <h2 className="text-lg font-bold text-slate-900">1. 我们收集的信息</h2>
        <p>
          当您浏览本站或通过联系表单发送消息时，我们可能会收集以下信息：
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>联系表单中填写的姓名与电子邮箱地址；</li>
          <li>通过 Google Analytics 或匿名日志收集的访问 IP 地址、浏览器类型、页面停留时间与访问路径。</li>
        </ul>

        <h2 className="text-lg font-bold text-slate-900">2. Cookie 与 Google AdSense</h2>
        <p>
          本网站可能会使用 Cookie 来优化您的浏览体验。此外，第三方广告供应商（包括 Google AdSense）可能会根据您之前访问本网站或其他网站的情况，通过 Cookie 向您投放广告。您可以随时通过浏览器设置禁用 Cookie。
        </p>

        <h2 className="text-lg font-bold text-slate-900">3. 信息的使用与共享</h2>
        <p>
          我们绝不会将您的个人联系方式出售、出租或转让给任何第三方公司，除非法律另有要求。
        </p>
      </div>
    </div>
  );
}
