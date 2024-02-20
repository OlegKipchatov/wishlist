import { Metadata } from "next";
import { createClient } from '@/supabase/server';
import { supabaseWorker } from "@/supabase/requests";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Button from "@/components/Button";
import { IUser, UserMetadata } from "@/supabase/types";

export default async function Settings() {
    const supabase = supabaseWorker(createClient(cookies()));
    const isAuthenticated = await supabase.users.isAuthenticated();

    if(!isAuthenticated) {
        return redirect("/login");
    }

    const updateMetadata = async (form: FormData) => {
        "use server";

        const newUserMetadata: UserMetadata = {
            login: form.get('login') as string,
            first_name: form.get('first_name') as string,
            last_name: form.get('last_name') as string,
        };

        const supabase = supabaseWorker(createClient(cookies()));
        await supabase.users.updateUserMetadata(newUserMetadata);
    }

    const sessionUser = await supabase.users.getSessionUser();
    const user = await supabase.users.getUserByIdOrLogin({ id: sessionUser?.id }) as IUser;
    
    return(
        <form action={updateMetadata}>
            <input name="login"
                defaultValue={user.login}
                type="text"
                placeholder="Login"
                className="w-full p-2.5 rounded-lg border border-gray-100 dark:bg-gray-0 btn-focus mb-6" />

            <div className="grid sm:grid-cols-2 gap-6">
                <input name="first_name"
                    defaultValue={user?.first_name}
                    type="text"
                    placeholder="First Name"
                    className="w-full p-2.5 rounded-lg border border-gray-100 dark:bg-gray-0 btn-focus" />

                <input name="last_name"
                    defaultValue={user?.last_name}
                    type="text"
                    placeholder="Last Name"
                    className="w-full p-2.5 rounded-lg border border-gray-100 dark:bg-gray-0 btn-focus" />
            </div>

            <button formAction={updateMetadata} type='submit' className="w-full rounded-lg py-2.5 btn-primary btn-focus mt-6 text-white">Update</button>
        </form>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "WishList - Settings",
        description: "Add more info to your profile.",
    };
}
