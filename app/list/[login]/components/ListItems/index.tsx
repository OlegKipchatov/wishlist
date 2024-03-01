'use client';

import { Providers } from '@/store/providers';
import { useSelector } from '@/store/redux';
import { ICard, IUser } from '@/supabase/types';

import AddCard from './AddCard';
import ListWish from './ListWish';

type Props = {
    currentUser: IUser,
    items: ICard[]
}

function ListItemsWrapper(props: Props) {
  const { currentUser, items } = props;
  const sessionUser = useSelector((state) => state.sesssionUser.user);
  const isCurrentUser = currentUser.id === sessionUser?.id;

  return (
    <>
      { isCurrentUser && <AddCard /> }
      <ListWish
        id={currentUser.id}
        items={items}
        isCurrentUser={isCurrentUser}
      />
    </>
  );
}

export default function ListItems(props: Props) {
  const { currentUser, items } = props;

  return (
    <Providers>
      <ListItemsWrapper
        currentUser={currentUser}
        items={items}
      />
    </Providers>
  );
}
