'use client'

import { useEffect, useState } from "react";
import PopupHeader from "./PopupHeader";
import { Providers } from "@/store/providers";

type Props = {
    title: string,
    show: boolean,
    setShow: (show: boolean) => void,
    children: any,
}

export default function Popup(props: Props) {
    const { show, title, setShow, children } = props;

    useEffect(() => {
        document.body.classList.toggle('overflow-hidden', show);
    }, [show]);

    return (
        <Providers>
            { show ?
            <div className="fixed bottom-0 left-0 backdrop-blur-md h-full w-full z-50">
                <div className="fixed bottom-0 left-0 w-full bg-background mx-auto border border-gray-800 rounded-lg shadow p-6">
                    <PopupHeader title={title} setShow={() => setShow(false)} />
                    {children}
                </div>
            </div>
            : <></>}
        </Providers>
    );
}
