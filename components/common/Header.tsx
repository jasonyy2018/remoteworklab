import Link from 'next/link';
import { Laptop, Sparkles } from 'lucide-react';

export default function Header() {
  const categories = [
    { name: 'Software Reviews', href: '/category/software-reviews' },
    { name: 'Home Office Setup', href: '/category/home-office-setup' },
    { name: 'Productivity Tips', href: '/category/productivity-tips' },
    { name: 'Freelance Guide', href: '/category/freelance-guide' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white shadow-md shadow-teal-600/20 transition-transform group-hover:scale-105">
            <Laptop className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-teal-600 transition-colors">
              RemoteWork<span className="text-teal-600">Lab</span>
            </span>
            <span className="text-[10px] text-slate-500 font-medium tracking-wide">
              Productivity & Home Office Gear
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="hover:text-teal-600 transition-colors"
            >
              {cat.name}
            </Link>
          ))}
          <Link href="/about" className="hover:text-teal-600 transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-teal-600 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-teal-600 transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5 text-teal-400" />
            Explore All Guides
          </Link>
        </div>
      </div>
    </header>
  );
}
