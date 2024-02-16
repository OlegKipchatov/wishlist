import { Metadata } from "next";
import { createClient } from '@/supabase/server';
import { supabaseWorker } from "@/supabase/requests";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import SettingsForm from "@/components/SettingsForm";

export default async function Settings() {
    const supabase = supabaseWorker(createClient(cookies()));
    const isAuthenticated = await supabase.users.isAuthenticated();

    if(!isAuthenticated) {
        return redirect("/login");
    }
    
    return(
        <div className="max-w-2xl w-full pt-20 p-6">
            <SettingsForm/>
        </div>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "WishList - Settings",
        description: "Add more info to your profile.",
    };
}
