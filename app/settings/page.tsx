import { getUserData, getUserMetadata } from "@/utils/supabase/requests";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import SettingsForm from "@/components/SettingsForm";

export default async function Settings() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const user = await getUserData(supabase);

    if(!user) {
        return redirect("/login");
    }

    const userMetadata = await getUserMetadata(supabase);
    
    return(
        <div className="max-w-2xl w-full pt-20 p-6">
            <SettingsForm userMetadata={userMetadata} />
        </div>
    );
}
