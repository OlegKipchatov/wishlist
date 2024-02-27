import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { supabaseWorker } from '@/supabase/requests';
import { createClient } from '@/supabase/server';

export default async function Index() {
  const supabase = supabaseWorker(createClient(cookies()));
  const isAuthenticated = await supabase.users.isAuthenticated();

  if (isAuthenticated) {
    const user = await supabase.users.getSessionUser();
    redirect(`/list/${user?.login}`);
  } else {
    redirect('/signin');
  }
}
