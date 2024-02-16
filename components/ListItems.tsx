import { IItem } from "@/supabase/requests";
import WishItem from "./WishItem";

type Props = {
    items: IItem[] | undefined,
    isAuthUser: boolean,
}

export default async function ListItems(props: Props) {
    const { items, isAuthUser } = props;
    
    return (
        <div className="space-y-4 sm:space-y-8 flex items-center flex-col sm:items-stretch">
            {items?.map((item) => <WishItem key={item.id} item={item} isAuthUser={isAuthUser}></WishItem>)}
        </div>
    );
  }
  