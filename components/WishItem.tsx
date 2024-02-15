'use client'

import { IItem } from "@/utils/supabase/requests";
import Card from "./Card";
import { useState } from "react";
import EditCard from "./EditCard";

interface Props {
    item: IItem,
    isAuthUser: boolean,
}

export type OnEditCardEvent = (e: { isEdit: boolean }) => void;

export default function WishItem(props: Props) {
    const [isEdit, setIsEdit] = useState(false);

    const { item, isAuthUser } = props;

    const onEditCardEvent = (fn: OnEditCardEvent) => {
        setIsEdit(!isEdit);

        if(fn) {
            fn({ isEdit });
        }
    }

    return (
        <div id={item.id}>
            <Card item={item} isAuthUser={isAuthUser} />
            {isEdit
                ? <EditCard item={item} onEditCardEvent={onEditCardEvent} />
                : <></>}
        </div>
    );
}
  