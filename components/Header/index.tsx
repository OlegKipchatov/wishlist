import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { getUserData, isAuthUser } from "@/utils/supabase/requests";
import AuthButton from "@/components/AuthButton";

export default async function Header() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const user = await getUserData(supabase);
    const isAuth = await isAuthUser(supabase);

    return(
        <nav className="w-full flex fixed backdrop-blur-xl justify-center border-b border-b-foreground/10 h-16 z-50">
            <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                { user?.email && 
                    <Link
                        href="/settings"
                        className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
                    >
                        {user.email}
                    </Link>
                }

                <AuthButton isAuth={isAuth} />
            </div>
        </nav>
    );
}
