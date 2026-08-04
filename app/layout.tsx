import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'https://remoteworklab.com'),
  title: {
    default: 'RemoteWorkLab - Remote Work & Freelance Productivity Tools Guide',
    template: '%s | RemoteWorkLab',
  },
  description:
    'In-depth reviews and guides for remote work productivity software, home office setups, time tracking apps, and freelance growth strategies.',
  keywords: [
    'Remote Work',
    'Freelancing',
    'Software Reviews',
    'Time Tracking',
    'Standing Desk',
    'Ergonomic Chair',
    'Productivity Tools',
    'Home Office Setup',
  ],
  authors: [{ name: 'Jason Chen' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://remoteworklab.com',
    siteName: 'RemoteWorkLab',
    title: 'RemoteWorkLab - Remote Work & Freelance Productivity Tools Guide',
    description:
      'Unbiased software reviews and home office hardware guides designed to help digital nomads and remote professionals excel.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RemoteWorkLab - Remote Work & Freelance Productivity Tools Guide',
    description:
      'Unbiased software reviews and home office hardware guides designed to help digital nomads and remote professionals excel.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Matomo Analytics */}
        <Script
          id="matomo-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var _paq = window._paq = window._paq || [];
              /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
              _paq.push(['trackPageView']);
              _paq.push(['enableLinkTracking']);
              (function() {
                var u="//matomo.wisdomitc.com/";
                _paq.push(['setTrackerUrl', u+'matomo.php']);
                _paq.push(['setSiteId', '8']);
                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
              })();
            `,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-slate-50 font-sans" suppressHydrationWarning>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
