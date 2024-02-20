'use client';

import { useCallback, useState } from "react";
import EditIcon from '@heroicons/react/24/outline/PencilSquareIcon';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import Popup from "@/components/Popup";
import { createClient } from "@/supabase/client";
import { supabaseWorker } from "@/supabase/requests";
import { Card, ICard } from "@/supabase/types";
import EditCard from "@/components/EditCard";
import { useSelector } from "@/store/redux";
import { getImageByBlob } from "@/utils/card";

type Props = {
    item: ICard,
}

const iconStyles = "inline-block btn-neutral btn-focus rounded-lg text-sm p-2";

export default function CardFooterAuth(props: Props) {
    const { item } = props;
    const [showRemove, setShowRemove] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const image = useSelector(state => state.addCard.image);

    const onRremoveItem = async () => {
        const supabase = supabaseWorker(createClient());
        const isRemove = await supabase.items.removeItem(item);
        if(isRemove) {
            closeRemovePopup();
        }
    }

    const editCard = async (formData: FormData) => {
        debugger;
        const imageFile = image && await getImageByBlob(image.imageUrl, image.imageType);
        const updatedItem: Card = {
            title: formData.get('title') as string,
            cost: Number(formData.get('cost')),
            link: formData.get('link') as string,
            time: new Date().toISOString(),
            image: imageFile,
        }

        const supabase = supabaseWorker(createClient());
        await supabase.items.updateItem(updatedItem, item.id);

        closeEditPopup();
    }

    const closeRemovePopup = useCallback(() => {
        setShowRemove((show) => show = false);
    }, []);

    const closeEditPopup = useCallback(() => {
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

            <Popup show={showRemove} onClose={closeRemovePopup} title={`Remove '${item.title}'?`}>
                <button className="w-full py-2.5 px-3 btn-red btn-focus rounded-lg" onClick={onRremoveItem}>Remove item</button>
            </Popup>

            <Popup show={showEdit} onClose={closeEditPopup} title='Edit item'>
                <EditCard formAction={editCard} item={item} type='edit' />
            </Popup>
        </>
    );
}
