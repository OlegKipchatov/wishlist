import { cookies } from "next/headers";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import { getListItem, getUserData } from "@/utils/supabase/requests";
import WishItem from "./WishItem";

export default async function ListItems() {
    const supabase = createClient(cookies());
    const items = await getListItem(supabase);
    const user = await getUserData(supabase);
    
    return (
        <div className="space-y-4 sm:space-y-8 flex items-center flex-col sm:items-stretch">
            {items?.map((item) => <WishItem key={item.id} item={item} user={user as User}></WishItem>)}
        </div>
    );
  }
  