import { createClient } from "@/supabase/server";
import { Provider, generatePassword } from "@/utils/oauth";
import { AuthVK } from "@/utils/oauth/vk";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface AuthPayloadVK {
    access_token: string,
    email: string,
    user_id: number,
}

const signUpToSupabase = async (payload: AuthPayloadVK) => {
    const supabase = createClient(cookies());

    supabase.auth.getUser()
    await supabase.auth.signUp({
        email: payload.email,
        password: generatePassword(),
        options: {
            data: {
                vk_id: payload.user_id,
            },
        },
    });
}

export async function POST(request: Request) {
    const requestUrl = new URL(request.url);
    const provider = requestUrl.searchParams.get("provider") as Provider;
    
    let data: any = {};
    if (provider === 'VK' && requestUrl.searchParams.has('payload')) {
        const payload = JSON.parse((requestUrl.searchParams.get('payload') as string)) as AuthVK;

        const authHref = new URL('https://api.vk.com/method/auth.exchangeSilentAuthToken');
        authHref.searchParams.append('token', payload.token);
        authHref.searchParams.append('access_token', process.env.VK_SERVER_ACCESS_TOKEN as string);
        authHref.searchParams.append('v', '5.131');
        authHref.searchParams.append('uuid', payload.uuid);

        const userData: AuthPayloadVK = await fetch(authHref, { method: 'POST' }).then((res) => res.json());
        await signUpToSupabase(userData);
    }

    return NextResponse.json(data);
}
