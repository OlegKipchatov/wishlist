'use client'

import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import { useCallback, useState } from "react";
import Popup from "./Popup";
import EditCard from "./EditCard";
import { Card } from "@/supabase/types";
import { supabaseWorker } from "@/supabase/requests";
import { createClient } from "@/supabase/client";

export default function AddCard() {
    const [showAddPopup, setShowAddPopup] = useState(false);

    const onClosePopup = useCallback(() => {
        setShowAddPopup((show) => show = false);
    }, []);

    const onAddCard = useCallback(async (card: Card) => {
        const supabase = supabaseWorker(createClient());
        const isAddCard = await supabase.items.setItem(card);
        if(isAddCard) {
            // TODO: Add error message
        }

        onClosePopup();
    }, []);

    return(
        <>
            <div className="flex justify-center">
                <button onClick={() => setShowAddPopup(true)} className='z-20 fixed sm:relative bottom-8 sm:bottom-0 sm:flex sm:justify-center sm:w-full focus:ring-4 focus:outline-none rounded-full sm:rounded-lg p-6 sm:px-5 sm:py-3 btn-primary btn-focus'>
                    <PlusIcon width={24} height={24} />
                </button>
            </div>

            <Popup show={showAddPopup} onClose={onClosePopup} title="Add item">
                <EditCard type='add' onCard={onAddCard} />
            </Popup>
        </>
    );
}
