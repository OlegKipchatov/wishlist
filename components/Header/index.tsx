import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/supabase/server";
import { supabaseWorker } from '@/supabase/requests';
import AuthButton from "@/components/Header/AuthButton";
import { ThemeSwitcherLoading } from "./ThemeSwticher";
import { IUser } from "@/supabase/types";
import dynamic from "next/dynamic";
import { Button } from '@nextui-org/react';

const ThemeSwitcher = dynamic(() => import('./ThemeSwticher'), {
    ssr: false,
    loading: () => <ThemeSwitcherLoading />,
});

export default async function Header() {
    const supabase = supabaseWorker(createClient(cookies()));
    const isAuthenticated = await supabase.users.isAuthenticated();
    const user = isAuthenticated && await supabase.users.getSessionUser();

    return(
        <nav className="w-full flex fixed backdrop-blur-xl justify-center shadow-xl h-16 z-50">
            <div className="w-full max-w-4xl flex gap-4 justify-between items-center p-3 text-sm">
                <Link href='/' className="btn-focus rounded-lg self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                    <span>WishList</span>
                </Link>

                <ThemeSwitcher />
                { isAuthenticated 
                    ? <AuthButton user={user as IUser} />
                    : <div className="flex gap-2">
                        <Button href="/signin" variant='ghost'>SignIn</Button>
                        <Button href="/signup" color='success'>SignUp</Button>
                    </div>
                }
            </div>
        </nav>
    );
}
