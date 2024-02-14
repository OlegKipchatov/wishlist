import CardFooterAuth from "./CardFooterAuth";
import CardFooterReserve from "./CardFooterReserve";

type Props = {
    id: string,
    isAuthUser: boolean,
}

export default function CardFooter(props: Props) {
    const { id, isAuthUser } = props;
    return(
        <>
            { isAuthUser ? <CardFooterAuth id={id} /> : <CardFooterReserve /> }
        </>
    );
}
