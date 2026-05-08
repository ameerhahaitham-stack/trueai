import { createClient } from '@/lib/supabase/server';
import Sidebar from '@/components/layout/Sidebar';
import { redirect } from 'next/navigation';
import { Sparkles, TrendingUp, Zap, Map, Bot, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const QUICK = [
  { href:'/radar',     icon:'🔥', label:'AI Trend Radar',         desc:'See what goes viral before anyone else',    color:'from-tai-600/20 to-tai-600/5' },
  { href:'/assistant', icon:'🤖', label:'AI Business Assistant',  desc:'Find products, suppliers, set prices',       color:'from-emerald-600/20 to-emerald-600/5' },
  { href:'/generator', icon:'⚡', label:'Viral Content Generator',desc:'One click → full video ad campaign',         color:'from-amber-600/20 to-amber-600/5' },
  { href:'/heatmap',   icon:'🌍', label:'Global Heat Map',        desc:'Live demand in every country right now',     color:'from-pink-600/20 to-pink-600/5' },
];

const INSIGHTS = [
  { emoji:'🔥', title:'Mini Portable Blender',   stat:'+340% this week', country:'🇺🇸 USA',   profit:'$18/sale' },
  { emoji:'💡', title:'LED Car Interior Kit',     stat:'+280% this week', country:'🇬🇧 UK',    profit:'$22/sale' },
  { emoji:'🐾', title:'Smart Pet Feeder',         stat:'+210% this week', country:'🇩🇪 Germany',profit:'$31/sale' },
];

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login');
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();

  return (
    <div className="flex h-screen bg-surface-200 overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="h-14 bg-surface-100 border-b border-white/5 flex items-center px-6 gap-3 sticky top-0 z-10">
          <Sparkles className="w-4 h-4 text-tai-400" />
          <span className="text-sm font-medium text-white">True AI</span>
          <span className="badge-ai ml-1">✦ AI-Powered</span>
          <div className="ml-auto flex items-center gap-3">
            <div className="text-xs text-white/30">{new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})}</div>
            <div className="w-8 h-8 rounded-full bg-tai-600/30 flex items-center justify-center text-xs font-medium text-tai-400">
              {(profile?.display_name || 'U').slice(0,2).toUpperCase()}
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Greeting */}
          <div>
            <h1 className="text-2xl font-semibold text-white">
              Welcome back, <span className="text-tai-400">{profile?.display_name || 'Creator'}</span> ✦
            </h1>
            <p className="text-sm text-white/40 mt-1">True AI has been working while you were away. Here's your update.</p>
          </div>

          {/* AI insight bar */}
          <div className="card-dark p-4 flex items-center gap-4 border-tai-600/20">
            <div className="w-10 h-10 rounded-xl bg-tai-600/20 flex items-center justify-center flex-shrink-0 ai-orb">
              <Sparkles className="w-5 h-5 text-tai-400" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-tai-400 font-medium mb-1">✦ True AI says</div>
              <div className="text-sm text-white/70">3 products are trending in your region right now. The mini portable blender has grown <span className="text-emerald-400 font-medium">+340%</span> this week — cheapest supplier found on Alibaba at <span className="text-white font-medium">$4.20</span>, estimated profit <span className="text-emerald-400 font-medium">$18 per sale</span>.</div>
            </div>
            <Link href="/radar" className="btn-tai text-xs px-4 py-2 whitespace-nowrap">
              See full radar <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Quick access */}
          <div>
            <h2 className="text-sm font-medium text-white/50 mb-3">Your AI tools</h2>
            <div className="grid grid-cols-2 gap-3">
              {QUICK.map(q => (
                <Link key={q.href} href={q.href}
                  className={`card-dark p-5 flex items-start gap-4 hover:border-tai-600/30 transition-all duration-150 bg-gradient-to-br ${q.color}`}>
                  <div className="text-3xl flex-shrink-0">{q.icon}</div>
                  <div>
                    <div className="font-medium text-white mb-1">{q.label}</div>
                    <div className="text-xs text-white/40">{q.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Trending right now */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-white/50">🔥 Trending products right now</h2>
              <Link href="/radar" className="text-xs text-tai-400 hover:text-tai-200">See all →</Link>
            </div>
            <div className="space-y-3">
              {INSIGHTS.map((item, i) => (
                <div key={i} className="card-dark p-4 flex items-center gap-4">
                  <div className="text-2xl">{item.emoji}</div>
                  <div className="flex-1">
                    <div className="font-medium text-white text-sm">{item.title}</div>
                    <div className="text-xs text-white/40 mt-0.5">{item.country}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-400 text-sm font-medium">{item.stat}</div>
                    <div className="text-xs text-white/40">Est. profit: {item.profit}</div>
                  </div>
                  <Link href="/assistant" className="btn-ghost text-xs py-1.5 px-3">Analyse →</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
