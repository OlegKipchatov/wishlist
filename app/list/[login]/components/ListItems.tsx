/* eslint-disable no-unused-vars */

'use client';

import { useLayoutEffect, useState } from 'react';

import { cardsSlice, useDispatch, useSelector } from '@/store/redux';
import { ICard } from '@/supabase/types';

import Card from '@/app/list/[login]/components/Card/Card';
import EmptyCard from '@/app/list/[login]/components/EmptyCard';

type Props = {
    id: string,
    items: ICard[] | undefined,
    isCurrentUser: boolean,
    isAuthenticated: boolean,
}

export default function ListItems(props: Props) {
  const {
    id, items, isCurrentUser, isAuthenticated,
  } = props;
  const [isLoadItem, setIsLoadItem] = useState(true);
  const dispatch = useDispatch();
  const cards = useSelector((store) => store.userCards.cards);

  useLayoutEffect(() => {
    items?.forEach((item) => {
      dispatch(cardsSlice.actions.addCard(item));
    });
    setIsLoadItem(false);

    return () => {
      dispatch(cardsSlice.actions.clear());
    };
  }, []);

  return (
    <div className="space-y-4 flex flex-col items-center">
      { isLoadItem
        ? (
          <>
            <EmptyCard />
            <EmptyCard />
            <EmptyCard />
          </>
        )
        : cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            currentUserId={id}
            isCurrentUser={isCurrentUser}
            isAuthenticated={isAuthenticated}
          />
        )) }
    </div>
  );
}
