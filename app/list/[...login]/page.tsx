import AddCard from "@/components/AddCard";
import ListItems from "@/components/ListItems";
import { getListItemByLogin, getUserData, getUserIdByLogin } from "@/utils/supabase/requests";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

type Props = {
  params: {
    login: string,
  }
}

export default async function List(props: Props) {
  const { params: { login }} = props;
  
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const listItems = await getListItemByLogin(supabase, login);

  const selectUserId = await getUserIdByLogin(supabase, login);
  const currentUser = await getUserData(supabase);
  const isAuthUser = selectUserId === currentUser?.id;

  return (
    <div className="w-full max-w-2xl space-y-8 p-4 sm:p-8 pt-14 sm:pt-20">
      {isAuthUser && <AddCard />}
      <ListItems items={listItems} isAuthUser={isAuthUser} />
    </div>
  );
}


