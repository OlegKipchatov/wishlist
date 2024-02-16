import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/supabase/server";
import { supabaseWorker } from '@/supabase/requests';
import AuthButton from "@/components/Header/AuthButton";
import { IUser } from "@/supabase/types";

export default async function Header() {
    const supabase = supabaseWorker(createClient(cookies()));
    const isAuthenticated = await supabase.users.isAuthenticated();
    const user = isAuthenticated && await supabase.users.getSessionUser();

    return(
        <nav className="w-full flex fixed backdrop-blur-xl justify-center border-b border-b-foreground/10 h-16 z-50">
            <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                <Link href='/' className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                    <span>WishList</span>
                </Link>
                { isAuthenticated 
                    ? <AuthButton user={user as IUser} />
                    : <Link href="/login" className="ml-auto py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">Login</Link>
                }
            </div>
        </nav>
    );
}
