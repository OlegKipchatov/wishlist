'use client';

import { useSearchParams } from "next/navigation";
import { parseSearchParams, signUpUser } from "@/utils/oauth/vk";
import { useEffect } from "react";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";

export default function OAuth() {
    const searchParams = useSearchParams();
    const payload = parseSearchParams(searchParams);

    useEffect(() => {
        (async () => {
            const temp = await signUpUser(location.origin, payload);
            debugger;
        })()
    }, []);
    

    return (
        <div className="space-y-8">
            <div className="flex gap-4 items-center justify-center bg-gray-100 rounded-lg p-8">
                <img src={payload.user.avatar} className="w-20 rounded-full"></img>
                <span className="font-bold text-2xl">{payload.user.first_name} {payload.user.last_name}</span>
            </div>

            <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
                <span className="font-bold text-xl">Registration user</span>
                <div className="animate-spin-slow ml-auto">
                    <ArrowPathIcon width={32} height={32} />
                </div>
            </div>
        </div>
    );
}
