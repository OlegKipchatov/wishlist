import { cookies } from "next/headers";
import { createClient } from "@/supabase/server";
import { supabaseWorker } from "@/supabase/requests";
import { IUser, UserMetadata } from "@/supabase/types";
import Button from '@/components/Button';

export default async function SettingsForm() {
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

    const supabase = supabaseWorker(createClient(cookies()));

    const sessionUser = await supabase.users.getSessionUser();
    const user = await supabase.users.getUserByIdOrLogin({ id: sessionUser?.id }) as IUser;

    return(
        <form action={updateMetadata}>
            <input name="login"
                defaultValue={user.login}
                type="text"
                placeholder="Login"
                className="w-full rounded-md px-4 py-2 bg-inherit border mb-6" />

            <div className="grid sm:grid-cols-2 gap-6">
                <input name="first_name"
                    defaultValue={user?.first_name}
                    type="text"
                    placeholder="First Name"
                    className="rounded-md px-4 py-2 bg-inherit border" />

                <input name="last_name"
                    defaultValue={user?.last_name}
                    type="text"
                    placeholder="Last Name"
                    className="rounded-md px-4 py-2 bg-inherit border" />
            </div>

            <Button text="Update" className="mt-6" type='submit' />
        </form>
    );
}
