import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'RemoteWorkLab privacy policy and data protection standards.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 space-y-8">
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
        <p className="text-xs text-slate-500">Last updated: January 1, 2026</p>
      </div>

      <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-700 space-y-6">
        <p>
          RemoteWorkLab ("we", "our", or "us") respects your privacy. This policy outlines how we collect, use, and protect your information when you browse our website.
        </p>

        <h2 className="text-lg font-bold text-slate-900">1. Information We Collect</h2>
        <p>
          When you interact with RemoteWorkLab, we may collect non-personal and personal information including:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Name and email address submitted via contact forms;</li>
          <li>Anonymous analytics data (IP addresses, browser type, pages visited) gathered via standard log files or Google Analytics.</li>
        </ul>

        <h2 className="text-lg font-bold text-slate-900">2. Cookies & Google AdSense</h2>
        <p>
          We use cookies to enhance your browsing experience. Third-party vendors, including Google AdSense, use cookies to serve ads based on prior visits to our website or other websites on the internet. You can opt out of personalized advertising by visiting Google Ad Settings.
        </p>

        <h2 className="text-lg font-bold text-slate-900">3. Information Sharing</h2>
        <p>
          We never sell, rent, or trade your personal information to third parties under any circumstances.
        </p>
      </div>
    </div>
  );
}
