'use client'

import { useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { setUserMetadata, updateUserMetadata, UserMetadata } from "@/utils/supabase/requests";
import Button from '@/components/Button';

type Props = {
    userMetadata: UserMetadata | undefined,
}

export default function SettingsForm(props: Props) {
    const { userMetadata } = props;
    const formRef = useRef<HTMLFormElement>(null);
    const hasMetadata = userMetadata !== undefined;
    
    const supabase = createClient();

    const updateMetadata = async (form: FormData) => {
        const newUserMetadata: UserMetadata = {
            login: form.get('login') as string,
            first_name: form.get('first_name') as string,
            last_name: form.get('last_name') as string,
        };

        if(hasMetadata) {
            await updateUserMetadata(supabase, newUserMetadata);
        } else {
            await setUserMetadata(supabase, newUserMetadata);
        }
    }

    return(
        <form ref={formRef} action={updateMetadata}>
            <input name="login"
                defaultValue={userMetadata?.login}
                type="text"
                placeholder="Login"
                className="w-full rounded-md px-4 py-2 bg-inherit border mb-6" />

            <div className="grid sm:grid-cols-2 gap-6">
                <input name="first_name"
                    defaultValue={userMetadata?.first_name}
                    type="text"
                    placeholder="First Name"
                    className="rounded-md px-4 py-2 bg-inherit border" />

                <input name="last_name"
                    defaultValue={userMetadata?.last_name}
                    type="text"
                    placeholder="Last Name"
                    className="rounded-md px-4 py-2 bg-inherit border" />
            </div>

            <Button text="Update" className="mt-6" formAction={updateMetadata} type='submit' />
        </form>
    );
}
