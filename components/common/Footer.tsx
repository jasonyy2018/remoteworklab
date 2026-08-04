import Link from 'next/link';
import { Laptop } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white">
                <Laptop className="h-4 w-4" />
              </div>
              RemoteWorkLab
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              专注远程办公与自由职业效率工具测评，帮助数字游民与居家办公者精进工作流，打造高效舒适的个人作业空间。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              内容分类
            </h3>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <Link href="/category/software-reviews" className="hover:text-teal-400 transition-colors">
                  Software Reviews (软件评测)
                </Link>
              </li>
              <li>
                <Link href="/category/home-office-setup" className="hover:text-teal-400 transition-colors">
                  Home Office Setup (桌面搭设)
                </Link>
              </li>
              <li>
                <Link href="/category/productivity-tips" className="hover:text-teal-400 transition-colors">
                  Productivity Tips (效率指南)
                </Link>
              </li>
              <li>
                <Link href="/category/freelance-guide" className="hover:text-teal-400 transition-colors">
                  Freelance Guide (自由职业)
                </Link>
              </li>
            </ul>
          </div>

          {/* Site Information */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              关于与帮助
            </h3>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-teal-400 transition-colors">
                  关于我们 (About Us)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-teal-400 transition-colors">
                  联系反馈 (Contact)
                </Link>
              </li>
              <li>
                <Link href="/disclosure" className="hover:text-teal-400 transition-colors">
                  联盟声明 (Affiliate Disclosure)
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-teal-400 transition-colors">
                  隐私政策 (Privacy Policy)
                </Link>
              </li>
            </ul>
          </div>

          {/* Disclaimer text */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              透明度与免责声明
            </h3>
            <p className="mt-4 text-[11px] leading-relaxed text-slate-500">
              RemoteWorkLab 参与 Amazon 联盟计划及多款软件服务商联盟计划。如果您通过本站文章中的第三方链接购买产品或服务，本站可能会获得一定额度的推广佣金，但这绝不会增加您的购买成本。感谢您的支持！
            </p>
          </div>

        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} RemoteWorkLab. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Built with Next.js App Router & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
