import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { supabaseWorker } from '@/supabase/requests';
import { createClient } from '@/supabase/server';
import UserCard from '@/components/UserCard';

import ListItems from './components/ListItems';

type Props = {
  params: {
    login: string,
  }
}

export default async function List(props: Props) {
  const { params: { login } } = props;
  const currentUserLogin = decodeURIComponent(login);

  const supabase = supabaseWorker(createClient(cookies()));
  const selectUser = await supabase.users.getUserByIdOrLogin({ login: currentUserLogin });
  if (!selectUser) {
    return redirect('/');
  }

  const listItems = (await supabase.items.getListItemsById(selectUser.id)) ?? [];

  return (
    <div className="space-y-8 flex flex-col">
      <div className="flex flex-col items-center ">
        <UserCard user={selectUser} />
      </div>

      <ListItems
        items={listItems}
        currentUser={selectUser}
      />
    </div>
  );
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params: { login } } = props;
  const currentUserLogin = decodeURIComponent(login);

  return {
    title: `WishList - ${currentUserLogin}`,
    description: `Implement the wish of ${currentUserLogin} and gift only the necessary things.`,
  };
}
