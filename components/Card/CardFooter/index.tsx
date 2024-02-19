import { ICard } from "@/supabase/types";
import CardFooterAuth from "./CardFooterAuth";
import CardFooterReserve from "./CardFooterReserve";

type Props = {
    item: ICard,
    isCurrentUser: boolean,
}

export default function CardFooter(props: Props) {
    const { item, isCurrentUser } = props;

    return(
        <>
            { isCurrentUser ? <CardFooterAuth item={item} /> : <CardFooterReserve /> }
        </>
    );
}
