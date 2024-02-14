type Props = {
    cost: Number | undefined,
}

export default function CardCost(props: Props) {
    const { cost } = props;

    return(
        <>{ cost ? <span className="text-xl tracking-tight text-gray-900 dark:text-white">{`Price: ${cost}₽`}</span> : <></> }</>
    );
}
