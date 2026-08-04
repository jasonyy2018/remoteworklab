import PostCard, { PostCardProps } from './PostCard';

interface RelatedPostsProps {
  posts: PostCardProps['post'][];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="my-12 border-t border-slate-200 pt-10">
      <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <span className="h-6 w-1.5 rounded-full bg-teal-600"></span>
        Recommended Related Reading
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
