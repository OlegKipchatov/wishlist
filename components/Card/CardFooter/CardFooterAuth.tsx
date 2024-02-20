'use client';

import { useState } from "react";
import EditIcon from '@heroicons/react/24/outline/PencilSquareIcon';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import Popup from "@/components/Popup";
import { createClient } from "@/supabase/client";
import { supabaseWorker } from "@/supabase/requests";
import { ICard } from "@/supabase/types";

type Props = {
    item: ICard,
}

const iconStyles = "inline-block btn-neutral btn-focus rounded-lg text-sm p-2";

export default function CardFooterAuth(props: Props) {
    const { item } = props;
    const [show, setShow] = useState(false);

    const onRremoveItem = async () => {
        const supabase = supabaseWorker(createClient());
        const isRemove = await supabase.items.removeItem(item);
        if(isRemove) {
            setShow(false);
        }
    }

    return(
        <>
            <div className="p-2 rounded-b-lg">
                <div className="flex justify-end space-x-2">
                    <button type="button" className={iconStyles}>
                        <EditIcon width={20} height={20} />
                    </button>

                    <button type="button" className={iconStyles} onClick={() => setShow(true)}>
                        <TrashIcon width={20} height={20} />
                    </button>
                </div>
            </div>

            <Popup show={show} onClose={() => setShow(false)} title={`Remove '${item.title}'?`}>
                <button className="w-full py-2.5 px-3 bg-red-600 hover:bg-red-700 active:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-400 text-white rounded-lg" onClick={onRremoveItem}>Remove item</button>
            </Popup>
        </>
    );
}
