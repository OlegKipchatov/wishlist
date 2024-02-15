'use client'

import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type Props = {
  isAuth: boolean,
}

export default async function AuthButton(props: Props) {
  const { isAuth } = props;
  const supabase = createClient();

  const signOut = async () => {
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return isAuth ? (
    <div className="flex items-center gap-4">
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="ml-auto py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
