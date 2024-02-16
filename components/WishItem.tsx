'use client'

import Card from "./Card";
import { useState } from "react";
import EditCard from "./EditCard";
import { ICard } from "@/supabase/types";

interface Props {
    item: ICard,
    isCurrentUser: boolean,
}

export type OnEditCardEvent = (e: { isEdit: boolean }) => void;

export default function WishItem(props: Props) {
    const [isEdit, setIsEdit] = useState(false);

    const { item, isCurrentUser } = props;

    const onEditCardEvent = (fn: OnEditCardEvent) => {
        setIsEdit(!isEdit);

        if(fn) {
            fn({ isEdit });
        }
    }

    return (
        <div id={item.id}>
            <Card item={item} isCurrentUser={isCurrentUser} />
            {isEdit
                ? <EditCard item={item} onEditCardEvent={onEditCardEvent} />
                : <></>}
        </div>
    );
}
  