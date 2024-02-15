
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { isAuthUser } from "@/utils/supabase/requests";
import ListItems from "@/components/ListItems";
import AddCard from "@/components/AddCard";
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
      {/* <div className="w-full max-w-2xl space-y-8 p-4 sm:p-8 pt-14 sm:pt-20">
        {isAuthuser && 
          <>
            <AddCard />
            <ListItems />
          </>}
      </div> */}

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
