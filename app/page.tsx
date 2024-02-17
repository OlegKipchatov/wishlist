import { cookies } from "next/headers";
import Link from "next/link";
import { createClient } from "@/supabase/server";
import { supabaseWorker } from "@/supabase/requests";
import Avatar from "@/components/Avatar";
import { UserMetadata } from "@/supabase/types";

const getDisplayName = (user: UserMetadata) => {
  if(user.first_name && user.last_name) {
    return `${user.first_name} ${user.last_name}`;
  }

  return user.login;
}

export default async function Index() {
  const supabase = supabaseWorker(createClient(cookies()));
  const listUsers = await supabase.users.getListUsers();

  return (
    <div className="max-w-2xl w-full pt-20 p-6 flex-1 flex flex-col gap-4 items-center">
      <ul className="space-y-4">
        { listUsers?.map((user) => {
            const displayName = getDisplayName(user);

            return(
              <li key={user.login}>
                <Link href={`/list/${user.login}`} className="py-2 px-3 flex items-center gap-2 text-xl rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
                  <Avatar name={displayName} />
                  {displayName}
                </Link>
              </li>
            );
        }) }
      </ul>
    </div>
  );
}
