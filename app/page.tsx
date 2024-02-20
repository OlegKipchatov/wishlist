import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/supabase/server";
import { supabaseWorker } from "@/supabase/requests";

export default async function Index() {
  const supabase = supabaseWorker(createClient(cookies()));
  const isAuthenticated = await supabase.users.isAuthenticated();

  if(isAuthenticated) {
    const user = await supabase.users.getSessionUser();
    redirect(`/list/${user?.login}`);
  } else {
    redirect('/login');
  }

  return (<></>);
}
