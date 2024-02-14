'use client'

import { User } from "@supabase/supabase-js";
import { IItem } from "@/utils/supabase/requests";
import Card from "./Card";
import { useState } from "react";
import EditCard from "./EditCard";

interface Props {
    item: IItem,
    user: User,
}

export type OnEditCardEvent = (e: { isEdit: boolean }) => void;

export default function WishItem(props: Props) {
    const [isEdit, setIsEdit] = useState(false);

    const { item, user } = props;

    const onEditCardEvent = (fn: OnEditCardEvent) => {
        setIsEdit(!isEdit);

        if(fn) {
            fn({ isEdit });
        }
    }

    return (
        <div id={item.id}>
            <Card item={item} user={user} />
            {isEdit
                ? <EditCard item={item} onEditCardEvent={onEditCardEvent} />
                : <></>}
        </div>
    );
}
  