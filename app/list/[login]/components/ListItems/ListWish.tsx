/* eslint-disable no-unused-vars */

'use client';

import { useLayoutEffect, useState } from 'react';

import { cardsSlice, useDispatch, useSelector } from '@/store/redux';
import { ICard } from '@/supabase/types';

import Card, { EmptyCard } from '../Card';

type Props = {
    id: string,
    items: ICard[] | undefined,
    isCurrentUser: boolean,
}

export default function ListWish(props: Props) {
  const {
    id, items, isCurrentUser,
  } = props;
  const [isLoadItem, setIsLoadItem] = useState(true);
  const dispatch = useDispatch();

  const cards = useSelector((store) => store.userCards.cards);
  const isAuthenticated = useSelector((state) => state.sesssionUser.isAuthenticated);

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
            <EmptyCard />
            <EmptyCard />
          </>
        )
        : cards?.map((card) => (
          <Card
            key={card.id}
            card={card}
            currentUserId={id}
            isCurrentUser={isCurrentUser}
            isAuthenticated={isAuthenticated}
          />
        )) }
    </div>
  );
}
