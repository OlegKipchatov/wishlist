import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Props = {
  isAuth: boolean,
}

export default async function AuthButton(props: Props) {
  const { isAuth } = props;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const signOut = async () => {
    "use server";

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
