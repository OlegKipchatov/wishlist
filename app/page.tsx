import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { getListUsers, isAuthUser } from "@/utils/supabase/requests";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const isAuth = await isAuthUser(supabase);

  if(!isAuth) {
      return redirect("/login");
  }

  const listUsers = await getListUsers(supabase);

  return (
    <div className="max-w-2xl w-full pt-20 p-6 flex-1 flex flex-col gap-4 items-center">
      <ul>
        { listUsers?.map((user) => {
            const linkToUserList = `/list/${user.login}`;
            return(
              <li key={user.login}>
                <Link href={linkToUserList} className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
                  {user.first_name} {user.last_name}
                </Link>
              </li>
            );
        })}
      </ul>
    </div>
  );
}
