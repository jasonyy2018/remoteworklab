import Image from 'next/image';
import { Metadata } from 'next';
import { Target, Heart, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: '关于我们 (About Us)',
  description: '了解 RemoteWorkLab 的创办初衷、团队背书与远程办公效率工具测评理念。',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          关于 RemoteWorkLab
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          帮助数字游民、自由职业者与居家远程团队找到真正能提升生产力的效率利器与办公装备。
        </p>
      </div>

      <div className="relative h-80 w-full overflow-hidden rounded-2xl border border-slate-200 shadow-md">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80"
          alt="Remote Work Lab"
          fill
          className="object-cover"
        />
      </div>

      <div className="prose prose-slate max-w-none space-y-6 text-sm leading-relaxed text-slate-700">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Target className="h-5 w-5 text-teal-600" />
          我们的初衷与使命
        </h2>
        <p>
          在过去几年中，远程办公已经从“临时举措”演变为一种全新的生活与职业模式。然而，市场上充斥着大量缺乏真实体验的广告文章与质量参差不齐的推荐。
        </p>
        <p>
          RemoteWorkLab 诞生于对真实办公效率的极致追求。我们自费购买或深度试用市面上的每一款时间追踪软件、人体工学椅、升降桌与协作 SaaS，通过几周甚至几个月的实际工作场景测试，产出最硬核的对比报告。
        </p>

        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Award className="h-5 w-5 text-teal-600" />
          透明度与 E-E-A-T 可信度
        </h2>
        <p>
          本站文章由拥有 8 年+ 远程研发与顾问经验的专业团队撰写。我们遵循严格的透明度原则，任何带有联盟链接的产品评测绝不因为佣金高低而影响评分的公正性。
        </p>

        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Heart className="h-5 w-5 text-teal-600" />
          联系我们
        </h2>
        <p>
          如果您有想要我们测试的效率工具、软件合作建议，或者只是想探讨自由职业职业规划，欢迎随时通过{' '}
          <a href="/contact" className="text-teal-600 underline font-medium">
            联系页面
          </a>{' '}
          给我们留言！
        </p>
      </div>
    </div>
  );
}
