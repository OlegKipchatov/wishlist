/* eslint-disable no-unused-vars */

'use client';

import { useState } from 'react';

import { ICard } from '@/supabase/types';
import Card from '@/components/Card';

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
  const [cards] = useState(items ?? []);

  return (
    <div className="space-y-4 flex flex-col items-center">
      {cards?.map((item) => (
        <Card
          key={item.id}
          card={item}
          currentUserId={id}
          isCurrentUser={isCurrentUser}
          isAuthenticated={isAuthenticated}
        />
      ))}
    </div>
  );
}
