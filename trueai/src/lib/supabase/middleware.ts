import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cs) {
          cs.forEach(({name,value}) => request.cookies.set(name,value));
          response = NextResponse.next({ request });
          cs.forEach(({name,value,options}) => response.cookies.set(name,value,options));
        },
      },
    }
  );
  const { data: { user } } = await supabase.auth.getUser();
  const protected_ = ['/dashboard','/radar','/assistant','/generator','/heatmap','/profile'];
  const isProtected = protected_.some(p => request.nextUrl.pathname.startsWith(p));
  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }
  if (user && request.nextUrl.pathname.startsWith('/auth')) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }
  return response;
}
