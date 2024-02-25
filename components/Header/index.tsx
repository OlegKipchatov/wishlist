import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/supabase/server";
import { supabaseWorker } from '@/supabase/requests';
import AuthButton from "@/components/Header/AuthButton";
import { IUser } from "@/supabase/types";
import dynamic from "next/dynamic";
import { Button, NavbarBrand, NavbarContent } from '@nextui-org/react';
import { Navbar } from '@nextui-org/react';

const ThemeSwitcher = dynamic(() => import('./ThemeSwticher'), { ssr: false });

export default async function Header() {
    const supabase = supabaseWorker(createClient(cookies()));
    const isAuthenticated = await supabase.users.isAuthenticated();
    const user = isAuthenticated && await supabase.users.getSessionUser();

    return(
        <Navbar>
            <NavbarBrand as={Link} href='/' className="text-xl font-semibold">
                WishList
            </NavbarBrand>
            <NavbarContent justify='end'>
                <ThemeSwitcher />
                { isAuthenticated 
                    ? <AuthButton user={user as IUser} />
                    : <div className="flex gap-2">
                        <Button as={Link} href="/signin" variant='ghost'>SignIn</Button>
                        <Button as= {Link} href="/signup" color='success'>SignUp</Button>
                    </div>
                }
            </NavbarContent>
        </Navbar>
    );
}
