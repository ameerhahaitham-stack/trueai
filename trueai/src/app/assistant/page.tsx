import Sidebar from '@/components/layout/Sidebar';
import AssistantClient from './AssistantClient';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AssistantPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login');
  return (
    <div className="flex h-screen bg-surface-200 overflow-hidden">
      <Sidebar />
      <AssistantClient />
    </div>
  );
}
