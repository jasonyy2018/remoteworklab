import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      slug,
      seoTitle,
      metaDescription,
      seoDescription,
      content,
      excerpt,
      coverImage,
      categoryId,
      authorId,
      status,
      isReview,
      faqsJson,
    } = body;

    if (!title || !slug || !content || !categoryId || !authorId) {
      return NextResponse.json({ error: '缺少关键必填字段' }, { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        seoTitle,
        metaDescription,
        seoDescription,
        content,
        excerpt,
        coverImage: coverImage || 'https://images.unsplash.com/photo-1508962914676-134849a727f0?w=1200',
        categoryId,
        authorId,
        status: status || 'published',
        isReview: isReview || false,
        faqsJson: faqsJson || '[]',
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (error: any) {
    console.error('Create post error:', error);
    return NextResponse.json({ error: error.message || '服务器内部错误' }, { status: 500 });
  }
}
