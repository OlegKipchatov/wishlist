'use client'

import { useState } from "react";
import { RealtimePostgresDeletePayload, RealtimePostgresInsertPayload, RealtimePostgresUpdatePayload } from "@supabase/supabase-js";
import { createClient } from "@/supabase/client";
import { supabaseWorker } from "@/supabase/requests";
import { ICard } from "@/supabase/types";
import WishItem from "./WishItem";

type Props = {
    items: ICard[] | undefined,
    isCurrentUser: boolean,
    id: string,
}

export default function ListItems(props: Props) {
    const { items, isCurrentUser } = props;
    const [cards, setCards] = useState(items ?? []);

    const defaultFilter = {
        schema: 'public',
        table: 'wish_list',
        filter: `user_id=eq.${props.id}`,
    };

    const addCard = (payload: RealtimePostgresInsertPayload<ICard>) => {
        setCards([...cards, payload.new as ICard])
    }

    const updateCard = (payload: RealtimePostgresUpdatePayload<ICard>) => {
        setCards(cards.map(card => card.id === payload.new.id ? payload.new : card));
    }

    const removeCard = (payload: RealtimePostgresDeletePayload<ICard>) => {
        if(payload.old) {
            setCards(cards.filter(card => card.id !== payload.old.id));
        }
    }

    const supabase = supabaseWorker(createClient());

    supabase.client.channel('wish_list_changes')
        .on('postgres_changes', { event: 'INSERT', ...defaultFilter }, addCard)
        .on('postgres_changes', { event: 'UPDATE', ...defaultFilter }, updateCard)
        .on('postgres_changes', { event: 'DELETE', ...defaultFilter }, removeCard)
        .subscribe();
    
    return (
        <div className="space-y-4 sm:space-y-8 flex items-center flex-col sm:items-stretch">
            {cards?.map((item) => <WishItem key={item.id} item={item} isCurrentUser={isCurrentUser}></WishItem>)}
        </div>
    );
}
  