'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Sparkles, Eye, EyeOff } from 'lucide-react';

const ROLES = [
  { id: 'seller',  label: '🛍️ Seller',   desc: 'I want to find and sell products' },
  { id: 'creator', label: '🎬 Creator',  desc: 'I create content and grow audiences' },
  { id: 'gamer',   label: '🎮 Gamer',    desc: 'I stream games and build communities' },
  { id: 'both',    label: '⚡ All of the above', desc: 'I do everything' },
];

export default function SignupPage() {
  const [step, setStep]     = useState(1);
  const [form, setForm]     = useState({ email:'', password:'', username:'', display_name:'', role:'seller' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const router   = useRouter();
  const supabase = createClient();

  function update(k: string, v: string) { setForm(f => ({...f, [k]: v})); }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (form.password.length < 8) { toast.error('Password must be at least 8 characters'); return; }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: form.email, password: form.password,
      options: { data: { username: form.username, display_name: form.display_name, role: form.role } },
    });
    if (error) { toast.error(error.message); setLoading(false); return; }
    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id, email: form.email, username: form.username,
        display_name: form.display_name, role: form.role,
        followers_count: 0, following_count: 0, is_verified: false,
      });
      toast.success('Welcome to True AI! 🚀');
      router.push('/dashboard');
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-surface-200 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-tai-600 ai-orb flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-semibold text-white">True AI</span>
        </div>

        {step === 1 && (
          <div>
            <h2 className="text-2xl font-semibold text-white mb-1">Choose your role</h2>
            <p className="text-white/40 text-sm mb-6">True AI customises itself for what you do</p>
            <div className="space-y-3 mb-6">
              {ROLES.map(r => (
                <button key={r.id} onClick={() => { update('role', r.id); setStep(2); }}
                  className={`w-full p-4 rounded-xl border text-left transition-all duration-150 ${
                    form.role === r.id
                      ? 'border-tai-400 bg-tai-600/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}>
                  <div className="font-medium text-white">{r.label}</div>
                  <div className="text-sm text-white/40 mt-0.5">{r.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <button type="button" onClick={() => setStep(1)} className="text-white/40 hover:text-white text-sm">← Back</button>
              <h2 className="text-xl font-semibold text-white">Create your account</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-white/50 mb-2">Username</label>
                <input className="input-dark" placeholder="@you"
                  value={form.username} onChange={e => update('username', e.target.value.replace(/[^a-z0-9_.]/gi,'').toLowerCase())}
                  required minLength={3} />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/50 mb-2">Display name</label>
                <input className="input-dark" placeholder="Your name"
                  value={form.display_name} onChange={e => update('display_name', e.target.value)} required />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-2">Email</label>
              <input className="input-dark" type="email" placeholder="you@example.com"
                value={form.email} onChange={e => update('email', e.target.value)} required />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-2">Password</label>
              <div className="relative">
                <input className="input-dark pr-10" type={showPw ? 'text' : 'password'}
                  placeholder="Min. 8 characters" value={form.password}
                  onChange={e => update('password', e.target.value)} required minLength={8} />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-tai w-full">
              {loading
                ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <><Sparkles className="w-4 h-4" /> Create my True AI account</>}
            </button>
            <p className="text-xs text-white/25 text-center">By signing up you agree to our Terms and Privacy Policy.</p>
            <p className="text-center text-sm text-white/30">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-tai-400 font-medium hover:text-tai-200">Sign in</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
