import Sidebar from '@/components/layout/Sidebar';
import GeneratorClient from './GeneratorClient';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function GeneratorPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login');
  return (
    <div className="flex h-screen bg-surface-200 overflow-hidden">
      <Sidebar />
      <GeneratorClient />
    </div>
  );
}
