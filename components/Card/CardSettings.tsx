import { useCallback, useState } from "react";
import EditIcon from '@heroicons/react/24/outline/PencilSquareIcon';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import Popup from "@/components/Popup";
import { createClient } from "@/supabase/client";
import { supabaseWorker } from "@/supabase/requests";
import { Card, ICard } from "@/supabase/types";
import EditCard from "@/components/EditCard";
import { Button } from "@nextui-org/react";

type Props = {
    card: ICard,
}

export default (props: Props) => {
    const { card } = props;

    const [showRemove, setShowRemove] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const onRemoveItem = async () => {
        const supabase = supabaseWorker(createClient());
        const isRemove = await supabase.items.removeItem(card);
        if(isRemove) {
            onCloseRemovePopup();
        }
    }

    const onEditCard = useCallback(async (newCard: Card) => {
        const supabase = supabaseWorker(createClient());
        const isEdited = await supabase.items.updateItem(card, newCard);
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
            <div className="w-full flex flex-row justify-end gap-2">
                <Button isIconOnly variant='light' onClick={() => setShowEdit(true)} startContent={<EditIcon height={20} />}/>
                <Button isIconOnly variant='light' color='danger' onClick={() => setShowRemove(true)} startContent={<TrashIcon height={20} />}/>
            </div>

            <Popup show={showRemove} onClose={onCloseRemovePopup} title={`Remove '${card.title}'?`}>
                <Button isIconOnly color='danger' className="w-full" onClick={onRemoveItem} startContent={<TrashIcon height={20} />} />
            </Popup>

            <Popup show={showEdit} onClose={onCloseEditPopup} title='Edit item'>
                <EditCard onCard={onEditCard} item={card} type='edit' />
            </Popup>
        </>
    );
}
