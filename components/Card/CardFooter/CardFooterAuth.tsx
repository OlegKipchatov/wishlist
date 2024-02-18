'use client';

import { useState } from "react";
import Popup from "@/components/Popup";
import { createClient } from "@/supabase/client";
import { supabaseWorker } from "@/supabase/requests";
import EditSvg from "@/svg/Edit";
import RemoveSvg from "@/svg/Remove";

type Props = {
    id: string,
    title: string,
}

const iconStyles = "inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2";

export default function CardFooterAuth(props: Props) {
    const { id, title } = props;
    const [show, setShow] = useState(false);

    const onRremoveItem = async (e: React.MouseEvent<HTMLElement>) => {
        const supabase = supabaseWorker(createClient());
        const isRemove = await supabase.items.removeItem(id);
        if(isRemove) {
            setShow(false);
        }
    }

    return(
        <>
            <div className="p-2 border border-gray-200 rounded-b-lg dark:border-gray-700">
                <div className="flex justify-end space-x-2">
                    <button type="button" className={iconStyles}>
                        <EditSvg />
                    </button>

                    <button type="button" className={iconStyles} onClick={() => setShow(true)}>
                        <RemoveSvg />
                    </button>
                </div>
            </div>

            <Popup show={show} onClose={() => setShow(false)} title={`Remove '${title}'?`}>
                <button className="w-full py-2.5 px-3 bg-red-600 hover:bg-red-700 active:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-400 text-white rounded-lg" onClick={onRremoveItem}>Remove item</button>
            </Popup>
        </>
    );
}
