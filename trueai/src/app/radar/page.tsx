import Sidebar from '@/components/layout/Sidebar';
import RadarClient from './RadarClient';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function RadarPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login');
  return (
    <div className="flex h-screen bg-surface-200 overflow-hidden">
      <Sidebar />
      <RadarClient />
    </div>
  );
}
