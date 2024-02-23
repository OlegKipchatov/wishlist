import { ReadonlyURLSearchParams } from "next/navigation";
import { Provider } from ".";

const PROVIDER: Provider = 'VK';

export const parseSearchParams = (searchParams: ReadonlyURLSearchParams): PayloadVK => {
    const payloadParam = searchParams.get('payload') as string;
    const payload = JSON.parse(payloadParam);

    return payload;
}

export const signUpUser = async (basePath: string, payload: PayloadVK) => {
    const authPayload: AuthVK = {
        token: payload.token,
        uuid: payload.uuid,
        user_id: payload.user.id,
    };

    const authCallback = new URL(`${basePath}/oauth/callback`);
    authCallback.searchParams.append('provider', PROVIDER);
    authCallback.searchParams.append('payload', JSON.stringify(authPayload));

    const data = await fetch(authCallback, { method: 'POST' }).then((res) => res.json());
    return data;
}

export interface PayloadVK {
    uuid: string,
    token: string,
    user: {
        id: number,
        first_name: string,
        last_name: string,
        avatar: string,
    },
}

export interface AuthVK {
    token: string,
    uuid: string,
    user_id: number,
}
