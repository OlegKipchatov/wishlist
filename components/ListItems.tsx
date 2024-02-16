import WishItem from "./WishItem";
import { ICard } from "@/supabase/types";

type Props = {
    items: ICard[] | undefined,
    isCurrentUser: boolean,
}

export default async function ListItems(props: Props) {
    const { items, isCurrentUser } = props;
    
    return (
        <div className="space-y-4 sm:space-y-8 flex items-center flex-col sm:items-stretch">
            {items?.map((item) => <WishItem key={item.id} item={item} isCurrentUser={isCurrentUser}></WishItem>)}
        </div>
    );
  }
  