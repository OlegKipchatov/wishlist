import { Metadata } from "next";
import { redirect } from "next/navigation";
import AddCard from "@/components/AddCard";
import ListItems from "@/components/ListItems";
import { createClient } from '@/supabase/server';
import { supabaseWorker } from '@/supabase/requests';
import { cookies } from "next/headers";
import UserCard from "@/components/UserCard";

type Props = {
  params: {
    login: string,
  }
}

export default async function List(props: Props) {
  const { params: { login }} = props;
  const currentUserLogin = decodeURIComponent(login);
  
  const supabase = supabaseWorker(createClient(cookies()));
  const selectUser = await supabase.users.getUserByIdOrLogin({ login: currentUserLogin });
  if(!selectUser) {
    return redirect('/');
  }

  const sessionUser = await supabase.users.getSessionUser();
  const isCurrentUser = selectUser.id === sessionUser?.id;
  
  const listItems = (await supabase.items.getListItemsById(selectUser.id)) ?? [];

  return (
    <div className="space-y-4 sm:space-y-8">
      {selectUser && <UserCard userMeta={selectUser} />}
      {isCurrentUser && <AddCard />}
      <ListItems id={selectUser.id} items={listItems} isCurrentUser={isCurrentUser} />
    </div>
  );
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params: { login }} = props;
  const currentUserLogin = decodeURIComponent(login);
 
  return {
    title: `WishList - ${currentUserLogin}`,
    description: `Implement the wish of ${currentUserLogin} and gift only the necessary things.`,
  }
}
