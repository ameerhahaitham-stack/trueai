'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Sparkles, TrendingUp, Globe, Zap } from 'lucide-react';

const FEATURES = [
  { icon: TrendingUp, text: 'AI Trend Radar — see what goes viral before anyone else' },
  { icon: Globe,      text: 'Global Heat Map — live demand in every country' },
  { icon: Zap,        text: 'One-click viral content — video, caption, hashtags done' },
  { icon: Sparkles,   text: 'Auto-source + sell — AI runs your entire business' },
];

export default function LoginPage() {
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const router   = useRouter();
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { toast.error(error.message); setLoading(false); }
    else { toast.success('Welcome back to True AI!'); router.push('/dashboard'); router.refresh(); }
  }

  return (
    <div className="min-h-screen bg-surface-200 flex">
      {/* Left — branding */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center px-16 bg-surface-100 border-r border-white/5">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-tai-600 ai-orb flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-2xl font-semibold text-white tracking-tight">True AI</div>
            <div className="text-xs text-tai-200">AI-Powered Commerce Platform</div>
          </div>
        </div>
        <h1 className="text-4xl font-semibold text-white leading-tight mb-4">
          Discover. Source.<br />Market. Sell.<br />
          <span className="text-tai-400">All with AI.</span>
        </h1>
        <p className="text-white/40 text-sm mb-10 leading-relaxed">
          The world's first platform that finds trending products, sources suppliers,
          creates viral content, and sells globally — all automatically.
        </p>
        <div className="space-y-4">
          {FEATURES.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-tai-600/20 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-tai-400" />
              </div>
              <span className="text-sm text-white/60">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right — login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-tai-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-semibold text-white">True AI</span>
          </div>

          <h2 className="text-2xl font-semibold text-white mb-1">Sign in</h2>
          <p className="text-white/40 text-sm mb-8">Welcome back to your AI platform</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white/50 mb-2">Email address</label>
              <input className="input-dark" type="email" placeholder="you@example.com"
                value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-2">Password</label>
              <div className="relative">
                <input className="input-dark pr-10" type={showPw ? 'text' : 'password'}
                  placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-tai w-full mt-2">
              {loading
                ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <><Sparkles className="w-4 h-4" /> Sign in to True AI</>}
            </button>
          </form>

          <p className="text-center text-sm text-white/30 mt-6">
            No account yet?{' '}
            <Link href="/auth/signup" className="text-tai-400 hover:text-tai-200 font-medium">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
