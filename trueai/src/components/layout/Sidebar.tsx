'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Sparkles, LayoutDashboard, Radar, Bot, Zap, Map, User, LogOut, Plus } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/dashboard',  icon: LayoutDashboard, label: 'Home' },
  { href: '/radar',      icon: Radar,            label: 'Radar' },
  { href: '/assistant',  icon: Bot,              label: 'AI Biz' },
  { href: '/generator',  icon: Zap,              label: 'Viral' },
  { href: '/heatmap',    icon: Map,              label: 'Map' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router   = useRouter();
  const supabase = createClient();

  async function signOut() {
    await supabase.auth.signOut();
    toast.success('Signed out');
    router.push('/auth/login');
  }

  return (
    <aside className="w-16 bg-surface-100 border-r border-white/5 flex flex-col items-center py-4 gap-1 flex-shrink-0">
      <Link href="/dashboard" className="w-10 h-10 rounded-2xl bg-tai-600 ai-orb flex items-center justify-center mb-3 flex-shrink-0">
        <Sparkles className="w-5 h-5 text-white" />
      </Link>

      {NAV.map(({ href, icon: Icon, label }) => (
        <Link key={href} href={href} title={label}
          className={cn(
            'w-11 h-11 rounded-xl flex flex-col items-center justify-center gap-0.5 text-[9px] font-medium transition-all duration-150',
            pathname.startsWith(href)
              ? 'bg-tai-600/20 text-tai-400'
              : 'text-white/25 hover:bg-white/5 hover:text-white/60'
          )}>
          <Icon className="w-4 h-4" />
          <span>{label}</span>
        </Link>
      ))}

      <div className="flex-1" />

      <Link href="/generator" title="Create viral content"
        className="w-11 h-11 rounded-xl bg-tai-600 flex items-center justify-center text-white hover:bg-tai-800 transition-colors mb-1">
        <Plus className="w-4 h-4" />
      </Link>

      <Link href="/profile" title="Profile"
        className={cn(
          'w-11 h-11 rounded-xl flex flex-col items-center justify-center gap-0.5 text-[9px] font-medium transition-all duration-150',
          pathname.startsWith('/profile') ? 'bg-tai-600/20 text-tai-400' : 'text-white/25 hover:bg-white/5 hover:text-white/60'
        )}>
        <User className="w-4 h-4" />
        <span>You</span>
      </Link>

      <button onClick={signOut} title="Sign out"
        className="w-11 h-11 rounded-xl flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150 mt-1">
        <LogOut className="w-4 h-4" />
      </button>
    </aside>
  );
}
