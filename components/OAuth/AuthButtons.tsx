'use client'

import { createClient } from '@/supabase/client';
import * as VKID from '@vkid/sdk';
import { useEffect } from 'react';

export default function AuthButtons() {
    useEffect(() => {
        VKID.Config.set({
            app: 51857658,
            redirectUrl: `${location.origin}/oauth/vk`,
        });
    });

    const authVK = () => {
        VKID.Auth.login();
        const supabase = createClient();
    }

    return(
        <div className="my-4 flex justify-center">
            <a onClick={authVK} href="#oauth-vk" id='vk-oauth-link' className="btn-focus rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg"  className='w-12 h-12 pointer' viewBox="0 0 101 100" fill="none">
                    <path d="M.5 48c0-22.627 0-33.941 7.03-40.97C14.558 0 25.872 0 48.5 0h4c22.627 0 33.941 0 40.97 7.03 7.03 7.029 7.03 18.343 7.03 40.97v4c0 22.627 0 33.941-7.03 40.97C86.442 100 75.128 100 52.5 100h-4c-22.627 0-33.941 0-40.97-7.03C.5 85.942.5 74.628.5 52v-4Z" fill="#07F"/>
                    <path d="M53.709 72.042c-22.792 0-35.792-15.625-36.334-41.625h11.417C29.167 49.5 37.583 57.584 44.25 59.25V30.417H55v16.458c6.584-.708 13.5-8.208 15.833-16.458h10.75c-1.791 10.167-9.291 17.667-14.625 20.75 5.334 2.5 13.876 9.042 17.126 20.875H72.25C69.708 64.125 63.375 58 55 57.167v14.875H53.71Z" fill="#fff"/>
                </svg>
            </a>
        </div>
    );
}
