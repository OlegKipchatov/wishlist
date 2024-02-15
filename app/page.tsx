import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { isAuthUser } from "@/utils/supabase/requests";
import { redirect } from "next/navigation";

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const isAuth = await isAuthUser(supabase);

  if(!isAuth) {
      return redirect("/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-4 items-center">
    </div>
  );
}
