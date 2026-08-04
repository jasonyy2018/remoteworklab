import Image from 'next/image';
import { Award } from 'lucide-react';

interface AuthorProps {
  author: {
    name: string;
    bio: string;
    avatar: string;
  };
}

export default function AuthorCard({ author }: AuthorProps) {
  return (
    <div className="my-8 flex flex-col sm:flex-row items-center sm:items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-xs">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md">
        <Image
          src={author.avatar}
          alt={author.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <h3 className="font-bold text-slate-900">{author.name}</h3>
          <span className="inline-flex items-center gap-1 rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-semibold text-teal-800">
            <Award className="h-3 w-3" />
            Verified Reviewer
          </span>
        </div>
        <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
          {author.bio}
        </p>
      </div>
    </div>
  );
}
