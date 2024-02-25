'use client'

import { useEffect, useState } from "react";
import { RealtimePostgresDeletePayload, RealtimePostgresInsertPayload, RealtimePostgresUpdatePayload } from "@supabase/supabase-js";
import { createClient } from "@/supabase/client";
import { supabaseWorker } from "@/supabase/requests";
import { ICard } from "@/supabase/types";
import Card from "@/components/Card";

type Props = {
    id: string,
    items: ICard[] | undefined,
    isCurrentUser: boolean,
    isAuthenticated: boolean,
}

export default function ListItems(props: Props) {
    const { id, items, isCurrentUser, isAuthenticated } = props;
    const [cards, setCards] = useState(items ?? []);

    const defaultFilter = {
        schema: 'public',
        table: 'wish_list',
        filter: `user_id=eq.${id}`,
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

    
    useEffect(() => {
        const chanel = supabase.client.channel('wish_list_changes')
            .on('postgres_changes', { event: 'INSERT', ...defaultFilter }, addCard)
            .on('postgres_changes', { event: 'UPDATE', ...defaultFilter }, updateCard)
            .on('postgres_changes', { event: 'DELETE', ...defaultFilter }, removeCard)
            .subscribe();
        
        return () => {
            supabase.client.removeChannel(chanel);
        }
    }, []);

    return (
        <div className="space-y-4 flex flex-col items-center">
            {cards?.map((item) => <Card key={item.id} card={item} currentUserId={id} isCurrentUser={isCurrentUser} isAuthenticated={isAuthenticated}></Card>)}
        </div>
    );
}
