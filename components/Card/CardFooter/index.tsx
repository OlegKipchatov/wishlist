import { ICard } from "@/supabase/types";
import CardFooterAuth from "./CardFooterAuth";
import CardFooterReserve from "./CardFooterReserve";
import { Providers } from "@/store/providers";

type Props = {
    item: ICard,
    isCurrentUser: boolean,
}

export default function CardFooter(props: Props) {
    const { item, isCurrentUser } = props;

    return(
        <>
            { isCurrentUser
                ? <Providers><CardFooterAuth item={item} /></Providers>
                : <CardFooterReserve /> }
        </>
    );
}
