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
              Dedicated to testing remote work tools and home office gear to help digital nomads and remote professionals optimize their daily workflow.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Categories
            </h3>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <Link href="/category/software-reviews" className="hover:text-teal-400 transition-colors">
                  Software Reviews
                </Link>
              </li>
              <li>
                <Link href="/category/home-office-setup" className="hover:text-teal-400 transition-colors">
                  Home Office Setup
                </Link>
              </li>
              <li>
                <Link href="/category/productivity-tips" className="hover:text-teal-400 transition-colors">
                  Productivity Tips
                </Link>
              </li>
              <li>
                <Link href="/category/freelance-guide" className="hover:text-teal-400 transition-colors">
                  Freelance Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Site Information */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Company & Help
            </h3>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-teal-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-teal-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/disclosure" className="hover:text-teal-400 transition-colors">
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-teal-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Disclaimer text */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Affiliate Disclaimer
            </h3>
            <p className="mt-4 text-[11px] leading-relaxed text-slate-500">
              RemoteWorkLab participates in the Amazon Services LLC Associates Program and various software partner affiliate programs. Purchasing through links on our site may earn us a small commission at no additional cost to you. Thank you for supporting our independent tests!
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
