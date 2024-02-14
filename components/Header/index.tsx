import AuthButton from "@/components/AuthButton";
import { getUserData, isAuthUser } from "@/utils/supabase/requests";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Header() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const user = await getUserData(supabase);
    const isAuth = await isAuthUser(supabase);

    if(!isAuth) {
        return redirect("/login");
    }

    return(
        <nav className="w-full flex fixed backdrop-blur-xl justify-center border-b border-b-foreground/10 h-16 z-50">
            <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                { user?.email && 
                    <div className="bg-btn-background p-2 rounded-lg">
                        <span className="">{user?.email}</span>
                    </div>
                }

                <AuthButton isAuth={isAuth} />
            </div>
        </nav>
    );
}
