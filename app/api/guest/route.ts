import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE_KEYS } from '@/libs/const';

export async function GET() {
  return NextResponse.json({ ok: true });
}

export async function POST(request: NextRequest) {
  console.log('NEXT_PUBLIC_SHOP_API_ENDPOINT ===>', process.env.NEXT_PUBLIC_SHOP_API_ENDPOINT); // ← 추가
  const xForwardedFor = request.headers.get('x-forwarded-for');
  const xRealIp = request.headers.get('x-real-ip');

  console.log('x-forwarded-for ===>', xForwardedFor);
  console.log('x-real-ip ===>', xRealIp);

  const cookieStore = await cookies();
  const existingToken = cookieStore.get(COOKIE_KEYS.GUEST_TOKEN);

  if (existingToken) {
    return NextResponse.json({ guestToken: existingToken.value });
  }

  const body = await request.json().catch(() => ({}));
  const userAgent = request.headers.get('user-agent') ?? '';

  const clientIp = request.headers.get('x-real-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? '';

  const refererUrl = body.refererUrl ?? '';
  const currentUrl = body.currentUrl ?? '';
  const utmSource = body.utmSource ?? '';
  const utmMedium = body.utmMedium ?? '';
  const utmCampaign = body.utmCampaign ?? '';
  const utmContent = body.utmContent ?? '';
  const fbclid = body.fbclid ?? '';

  try {
    const backendUrl = `${process.env.NEXT_PUBLIC_SHOP_API_ENDPOINT}/frontWebAuth/guest`;
    console.log('백엔드 URL ===>', backendUrl); // ← 추가

    const res = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': userAgent,
        Referer: refererUrl,
        'X-Real-IP': clientIp,
        'X-Referer-URL': refererUrl,
        'X-Current-URL': currentUrl,
        'X-UTM-Source': utmSource,
        'X-UTM-Medium': utmMedium,
        'X-UTM-Campaign': utmCampaign,
        'X-UTM-Content': utmContent,
        'X-Fbclid': fbclid, // ← Facebook 클릭 ID
      },
    });

    console.log('백엔드 status ===>', res.status); // ← 추가

    const data = await res.json();
    console.log('백엔드 응답 ===>', data);
    const guestToken = data.body?.guestToken;

    if (!guestToken) {
      console.error('guestToken 없음 ===>', data); // ← 추가
      return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }

    const response = NextResponse.json({ guestToken });
    response.cookies.set(COOKIE_KEYS.GUEST_TOKEN, guestToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });

    return response;
  } catch (e) {
    console.error('fetch 오류 ===>', e); // ← 추가
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
