'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { LayoutDashboard, FileText, FolderTree, ShoppingBag, LogOut, Globe } from 'lucide-react';

export default function AdminNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Articles', href: '/admin/posts', icon: FileText },
    { name: 'Categories', href: '/admin/categories', icon: FolderTree },
    { name: 'Affiliate Products', href: '/admin/products', icon: ShoppingBag },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen p-6 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-white font-bold text-lg border-b border-slate-800 pb-4">
          <span className="h-3 w-3 rounded-full bg-teal-500"></span>
          RemoteWorkLab Admin
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-teal-600 text-white'
                    : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-2 border-t border-slate-800 pt-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <Globe className="h-4 w-4" />
          View Live Website
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex w-full items-center gap-2 text-xs font-medium text-rose-400 hover:text-rose-300 px-3 py-2 rounded-lg hover:bg-rose-950/40 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
