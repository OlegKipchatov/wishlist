'use client'

import * as VKID from '@vkid/sdk';
import { useEffect, useLayoutEffect } from 'react';

export default function AuthButtons() {
    useEffect(() => {
        VKID.Config.set({
            app: 51857658,
            redirectUrl: `${location.origin}/oauth/vk`,
        });
    });

    useLayoutEffect(() => {
        VKID.Config.set({
            app: 51857658,
            redirectUrl: `${location.origin}/oauth/vk`,
        });

        const oneTap = new VKID.OneTap();
        oneTap.render({
            container: document.getElementById('vk-oauth') as HTMLElement,
        });

        // Функция очистки
        return () => {
            oneTap.close();
        }
    }, []);

    return(
        <div className="my-4 flex justify-center">
            <div id='vk-oauth'></div>
        </div>
    );
}
