import { ReadonlyURLSearchParams } from "next/navigation";
import { PayloadVK, parseSearchParams } from "./vk";

export type Provider = 'VK';

type Payload = 
Provider extends 'VK' ? PayloadVK :
    {};

export const parsePayload = (provider: Provider, searchParams: ReadonlyURLSearchParams): Payload => {
    if(provider === 'VK') {
        return parseSearchParams(searchParams) as PayloadVK;
    }

    return {} as any;
}

const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
export const generatePassword = () => {
    const generateChapt = (length = 6) => Array.from(crypto.getRandomValues(new Uint32Array(length)))
        .map((x) => characters[x % characters.length])
        .join('');

    const password = `${generateChapt()}-${generateChapt}-${generateChapt}`;
    return password;
}
