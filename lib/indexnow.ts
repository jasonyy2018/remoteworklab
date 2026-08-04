/**
 * IndexNow Instant Search Engine Indexing Helper
 */
export async function submitToIndexNow(urls: string[]) {
  const host = process.env.NEXTAUTH_URL
    ? new URL(process.env.NEXTAUTH_URL).hostname
    : 'remoteworklab.com';
  const key = '623afdf3999e4bcda312762da4ceab56';
  const keyLocation = `https://${host}/${key}.txt`;

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        host,
        key,
        keyLocation,
        urlList: urls,
      }),
    });

    if (response.ok) {
      console.log(`[IndexNow] Successfully submitted ${urls.length} URLs for instant indexing.`);
    } else {
      console.warn(`[IndexNow] Submission returned status: ${response.status}`);
    }
  } catch (error) {
    console.error('[IndexNow] Error submitting URLs to IndexNow:', error);
  }
}
