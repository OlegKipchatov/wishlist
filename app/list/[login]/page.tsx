import { Metadata } from "next";
import AddCard from "@/components/AddCard";
import ListItems from "@/components/ListItems";
import { getListItemByLogin, getUserData, getUserMetaByLogin } from "@/utils/supabase/requests";
import { createClient } from "@/utils/supabase/server";
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
  
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const listItems = await getListItemByLogin(supabase, currentUserLogin);

  const selectUser = await getUserMetaByLogin(supabase, currentUserLogin);
  const currentUser = await getUserData(supabase);
  const isAuthUser = selectUser?.id === currentUser?.id;

  return (
    <div className="w-full max-w-2xl space-y-8 p-4 sm:p-8 pt-14 sm:pt-20">
      {selectUser && <UserCard userMeta={selectUser} />}
      {isAuthUser && <AddCard />}
      <ListItems items={listItems} isAuthUser={isAuthUser} />
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
