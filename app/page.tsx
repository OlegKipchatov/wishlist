import { cookies } from "next/headers";
import Link from "next/link";
import { createClient } from "@/supabase/server";
import { getListUsers } from "@/supabase/requests";
import Avatar from "@/components/Avatar";

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const listUsers = await getListUsers(supabase);

  return (
    <div className="max-w-2xl w-full pt-20 p-6 flex-1 flex flex-col gap-4 items-center">
      <ul className="space-y-4">
        { listUsers?.map((user) => {
            const linkToUserList = `/list/${user.login}`;
            const displayName = `${user.first_name} ${user.last_name}`;
            return(
              <li key={user.login}>
                <Link href={linkToUserList} className="py-2 px-3 flex items-center gap-2 text-xl rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
                  <Avatar name={displayName} />
                  {displayName}
                </Link>
              </li>
            );
        })}
      </ul>
    </div>
  );
}
