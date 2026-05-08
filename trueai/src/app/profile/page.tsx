import Sidebar from '@/components/layout/Sidebar';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Sparkles, CheckCircle } from 'lucide-react';

export default async function ProfilePage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login');
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();

  return (
    <div className="flex h-screen bg-surface-200 overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-xl">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-5 h-5 text-tai-400" />
            <h1 className="text-xl font-semibold text-white">Your profile</h1>
          </div>
          <div className="card-dark p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-tai-600/20 flex items-center justify-center text-2xl font-semibold text-tai-400">
                {(profile?.display_name || 'U').slice(0,2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-white">{profile?.display_name}</h2>
                  {profile?.is_verified && <CheckCircle className="w-4 h-4 text-tai-400" />}
                </div>
                <p className="text-sm text-white/40">@{profile?.username}</p>
                <span className="badge-ai mt-1 inline-block">{profile?.role || 'seller'}</span>
              </div>
            </div>
            <div className="border-t border-white/5 pt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-semibold text-white">{profile?.followers_count || 0}</div>
                <div className="text-xs text-white/30">Followers</div>
              </div>
              <div>
                <div className="text-xl font-semibold text-white">{profile?.following_count || 0}</div>
                <div className="text-xs text-white/30">Following</div>
              </div>
              <div>
                <div className="text-xl font-semibold text-white">0</div>
                <div className="text-xs text-white/30">Products sold</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
