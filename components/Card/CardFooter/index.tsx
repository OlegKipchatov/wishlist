import CardFooterAuth from "./CardFooterAuth";
import CardFooterReserve from "./CardFooterReserve";

type Props = {
    id: string,
    isCurrentUser: boolean,
}

export default function CardFooter(props: Props) {
    const { id, isCurrentUser } = props;

    return(
        <>
            { isCurrentUser ? <CardFooterAuth id={id} /> : <CardFooterReserve /> }
        </>
    );
}
