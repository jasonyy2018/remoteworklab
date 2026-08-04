import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'https://remoteworklab.com'),
  title: {
    default: 'RemoteWorkLab - 远程办公与自由职业效率工具指南',
    template: '%s | RemoteWorkLab',
  },
  description:
    '专注远程办公、居家办公桌面搭设（Home Office Setup）与自由职业效率软件（Software Reviews）深度评测，帮你在家办公更高效更健康。',
  keywords: [
    '远程办公',
    '自由职业',
    '软件评测',
    '时间追踪',
    '升降桌',
    '人体工学椅',
    '效率工具',
    'Remote Work',
  ],
  authors: [{ name: 'Jason Chen' }],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://remoteworklab.com',
    siteName: 'RemoteWorkLab',
    title: 'RemoteWorkLab - 远程办公与自由职业效率工具指南',
    description:
      '深度测评远程办公与自由职业硬件与软件工具，助你科学打造高效居家作坊。',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RemoteWorkLab - 远程办公与自由职业效率工具指南',
    description:
      '深度测评远程办公与自由职业硬件与软件工具，助你科学打造高效居家作坊。',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${inter.variable}`}>
      <body className="flex min-h-screen flex-col bg-slate-50 font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
