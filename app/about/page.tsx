import Image from 'next/image';
import { Metadata } from 'next';
import { Target, Heart, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about RemoteWorkLab, our mission, testing methodology, and team credentials.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          About RemoteWorkLab
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Helping digital nomads, freelancers, and remote teams find software tools and desk setups that drive true productivity.
        </p>
      </div>

      <div className="relative h-80 w-full overflow-hidden rounded-2xl border border-slate-200 shadow-md">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80"
          alt="Remote Work Lab Team"
          fill
          className="object-cover"
        />
      </div>

      <div className="prose prose-slate max-w-none space-y-6 text-sm leading-relaxed text-slate-700">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Target className="h-5 w-5 text-teal-600" />
          Our Mission & Vision
        </h2>
        <p>
          Remote work has transformed from a temporary perk into the standard way of working for millions worldwide. However, the internet is flooded with generic, low-quality product roundups sponsored by advertisers.
        </p>
        <p>
          RemoteWorkLab was created to bring clarity and hands-on rigor to productivity gear. We test time tracking apps, ergonomic standing desks, monitor mounts, and SaaS suites in real-world remote work environments before publishing our reviews.
        </p>

        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Award className="h-5 w-5 text-teal-600" />
          Editorial Transparency & E-E-A-T
        </h2>
        <p>
          Our guides are authored by experienced remote engineers and freelance consultants with 8+ years of field experience. We maintain strict editorial independence: affiliate commission rates never dictate product ratings or recommendations.
        </p>

        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Heart className="h-5 w-5 text-teal-600" />
          Get In Touch
        </h2>
        <p>
          Have a software tool you'd like us to review, or feedback on our guides? Feel free to reach out anytime via our{' '}
          <a href="/contact" className="text-teal-600 underline font-medium">
            Contact Page
          </a>
          .
        </p>
      </div>
    </div>
  );
}
