import CardFooterAuth from "./CardFooterAuth";
import CardFooterReserve from "./CardFooterReserve";

type Props = {
    isCurrentUser: boolean,
}

export default function CardFooter(props: Props) {
    const { isCurrentUser } = props;

    return(
        <>
            { isCurrentUser
                ? <CardFooterAuth />
                : <CardFooterReserve /> }
        </>
    );
}
