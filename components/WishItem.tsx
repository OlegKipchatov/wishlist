'use client'

import Card from "./Card";
import { ICard } from "@/supabase/types";

interface Props {
    item: ICard,
    isCurrentUser: boolean,
}

export type OnEditCardEvent = (e: { isEdit: boolean }) => void;

export default function WishItem(props: Props) {
    const { item, isCurrentUser } = props;

    return (
        <Card item={item} isCurrentUser={isCurrentUser} />
    );
}
  