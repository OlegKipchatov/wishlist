'use client';

import { useCallback, useState } from "react";
import EditIcon from '@heroicons/react/24/outline/PencilSquareIcon';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import Popup from "@/components/Popup";
import { createClient } from "@/supabase/client";
import { supabaseWorker } from "@/supabase/requests";
import { Card, ICard } from "@/supabase/types";
import EditCard from "@/components/EditCard";

type Props = {
    item: ICard,
}

const iconStyles = "inline-block btn-neutral btn-focus rounded-lg text-sm p-2";

export default function CardFooterAuth(props: Props) {
    const { item } = props;
    const [showRemove, setShowRemove] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const onRremoveItem = async () => {
        const supabase = supabaseWorker(createClient());
        const isRemove = await supabase.items.removeItem(item);
        if(isRemove) {
            onCloseRemovePopup();
        }
    }

    const onEditCard = useCallback(async (card: Card) => {
        const supabase = supabaseWorker(createClient());
        const isEdited = await supabase.items.updateItem(card, item.id);
        if(isEdited) {
            onCloseEditPopup();
        }
    }, []);

    const onCloseRemovePopup = useCallback(() => {
        setShowRemove((show) => show = false);
    }, []);

    const onCloseEditPopup = useCallback(() => {
        setShowEdit((show) => show = false);
    }, []);

    return(
        <>
            <div className="p-2 rounded-b-lg">
                <div className="flex justify-end space-x-2">
                    <button type="button" className={iconStyles} onClick={() => setShowEdit(true)}>
                        <EditIcon width={20} height={20} />
                    </button>

                    <button type="button" className={iconStyles} onClick={() => setShowRemove(true)}>
                        <TrashIcon width={20} height={20} />
                    </button>
                </div>
            </div>

            <Popup show={showRemove} onClose={onCloseRemovePopup} title={`Remove '${item.title}'?`}>
                <button className="w-full py-2.5 px-3 btn-red btn-focus rounded-lg" onClick={onRremoveItem}>Remove item</button>
            </Popup>

            <Popup show={showEdit} onClose={onCloseEditPopup} title='Edit item'>
                <EditCard onCard={onEditCard} item={item} type='edit' />
            </Popup>
        </>
    );
}
