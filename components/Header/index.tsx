import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/supabase/server";
import { supabaseWorker } from '@/supabase/requests';
import AuthButton from "@/components/Header/AuthButton";
import { ThemeSwitcherLoading } from "./ThemeSwticher";
import { IUser } from "@/supabase/types";
import dynamic from "next/dynamic";

const ThemeSwitcher = dynamic(() => import('./ThemeSwticher'), {
    ssr: false,
    loading: () => <ThemeSwitcherLoading />,
});

export default async function Header() {
    const supabase = supabaseWorker(createClient(cookies()));
    const isAuthenticated = await supabase.users.isAuthenticated();
    const user = isAuthenticated && await supabase.users.getSessionUser();

    return(
        <nav className="w-full flex fixed backdrop-blur-xl justify-center border-b border-b-gray-100 shadow-xl h-16 z-50">
            <div className="w-full max-w-4xl flex gap-4 justify-between items-center p-3 text-sm">
                <Link href='/' className="btn-focus rounded-lg self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                    <span>WishList</span>
                </Link>

                <ThemeSwitcher />
                { isAuthenticated 
                    ? <AuthButton user={user as IUser} />
                    : <Link href="/login" className="py-2 px-3 flex rounded-md no-underline btn-focus bg-green-600 hover:bg-green-700 active:bg-green-800 text-white">Login</Link>
                }
            </div>
        </nav>
    );
}
