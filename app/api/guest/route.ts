import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE_KEYS } from '@/libs/const';

export async function GET() {
  return NextResponse.json({ ok: true });
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const existingToken = cookieStore.get(COOKIE_KEYS.GUEST_TOKEN);

  if (existingToken) {
    return NextResponse.json({ guestToken: existingToken.value });
  }

  const body = await request.json().catch(() => ({}));
  const userAgent = request.headers.get('user-agent') ?? '';
  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? request.headers.get('x-real-ip') ?? '';
  const refererUrl = body.refererUrl ?? '';
  const currentUrl = body.currentUrl ?? '';
  const utmSource = body.utmSource ?? '';
  const utmMedium = body.utmMedium ?? '';
  const utmCampaign = body.utmCampaign ?? '';
  const utmContent = body.utmContent ?? '';
  const fbclid = body.fbclid ?? '';

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SHOP_API_ENDPOINT}/frontWebAuth/guest`, {
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

    const data = await res.json();
    console.log('백엔드 응답 ===>', data);
    const guestToken = data.body?.guestToken;

    if (!guestToken) {
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
    console.error('Guest Token 발급 실패', e);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
