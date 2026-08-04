import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    const body = await req.json();
    const { urls } = body;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: 'Please provide at least one valid URL to submit.' },
        { status: 400 }
      );
    }

    const host = process.env.NEXTAUTH_URL
      ? new URL(process.env.NEXTAUTH_URL).hostname
      : 'remoteworklab.com';
    const key = '623afdf3999e4bcda312762da4ceab56';
    const keyLocation = `https://${host}/${key}.txt`;

    // Filter and sanitize URLs
    const sanitizedUrls = urls
      .map((u: string) => u.trim())
      .filter((u: string) => u.length > 0 && (u.startsWith('http://') || u.startsWith('https://')));

    if (sanitizedUrls.length === 0) {
      return NextResponse.json(
        { error: 'No valid HTTP/HTTPS URLs found in submission.' },
        { status: 400 }
      );
    }

    const payload = {
      host,
      key,
      keyLocation,
      urlList: sanitizedUrls,
    };

    // Send requests to main IndexNow API and Bing IndexNow Endpoint concurrently
    const [indexNowRes, bingRes] = await Promise.allSettled([
      fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload),
      }),
      fetch('https://www.bing.com/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload),
      }),
    ]);

    const results = [];

    if (indexNowRes.status === 'fulfilled') {
      results.push({
        target: 'IndexNow Central (api.indexnow.org)',
        status: indexNowRes.value.status,
        ok: indexNowRes.value.ok,
      });
    } else {
      results.push({
        target: 'IndexNow Central (api.indexnow.org)',
        error: indexNowRes.reason?.message || 'Network error',
      });
    }

    if (bingRes.status === 'fulfilled') {
      results.push({
        target: 'Bing Search IndexNow (bing.com)',
        status: bingRes.value.status,
        ok: bingRes.value.ok,
      });
    } else {
      results.push({
        target: 'Bing Search IndexNow (bing.com)',
        error: bingRes.reason?.message || 'Network error',
      });
    }

    return NextResponse.json({
      success: true,
      message: `Successfully submitted ${sanitizedUrls.length} URL(s) to IndexNow.`,
      submittedUrls: sanitizedUrls,
      results,
    });
  } catch (error: any) {
    console.error('Admin IndexNow error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
