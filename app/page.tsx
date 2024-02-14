import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import ListItems from "@/components/ListItems";
import AddCard from "@/components/AddCard";
import { getUserData, isAuthUser } from "@/utils/supabase/requests";

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const user = await getUserData(supabase);
  const isAuthuser = await isAuthUser(supabase);

  return (
    <div className="flex-1 w-full flex flex-col gap-4 items-center">
      <nav className="w-full flex fixed backdrop-blur-xl justify-center border-b border-b-foreground/10 h-16 z-50">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          {
            user?.email && 
              <div className="bg-btn-background p-2 rounded-lg">
                <span className="">{user?.email}</span>
              </div>
          }

          {isAuthuser && <AuthButton />}
        </div>
      </nav>

      <div className="w-full max-w-2xl space-y-8 p-4 sm:p-8 pt-14 sm:pt-20">
        {isAuthuser && 
          <>
            <AddCard />
            <ListItems />
          </>}
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            trueHack
          </a>
        </p>
      </footer>
    </div>
  );
}
