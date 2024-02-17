import CardFooterAuth from "./CardFooterAuth";
import CardFooterReserve from "./CardFooterReserve";

type Props = {
    id: string,
    title: string,
    isCurrentUser: boolean,
}

export default function CardFooter(props: Props) {
    const { id, title, isCurrentUser } = props;

    return(
        <>
            { isCurrentUser ? <CardFooterAuth id={id} title={title} /> : <CardFooterReserve /> }
        </>
    );
}
