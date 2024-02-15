import Link from "next/link";
import { cookies } from "next/headers";
import { User, UserMetadata } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import { getUserData, getUserMetadata, isAuthUser } from "@/utils/supabase/requests";
import AuthButton from "@/components/Header/AuthButton";

export default async function Header() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const isAuth = await isAuthUser(supabase);
    const user = await getUserData(supabase);
    const userMetadata = await getUserMetadata(supabase);

    return(
        <nav className="w-full flex fixed backdrop-blur-xl justify-center border-b border-b-foreground/10 h-16 z-50">
            <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                <Link href='/' className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                    <span>WishList</span>
                </Link>
                { isAuth 
                    ? <AuthButton user={user as User} userMetadata={userMetadata as UserMetadata} />
                    : <Link href="/login" className="ml-auto py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">Login</Link>
                }
            </div>
        </nav>
    );
}
