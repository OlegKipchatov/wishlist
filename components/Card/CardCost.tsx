type Props = {
    cost: Number | undefined,
}

const numberFormat = Intl.NumberFormat(undefined, {style: 'currency', currency: 'RUB', maximumFractionDigits: 0});

export default function CardCost(props: Props) {
    const { cost } = props;

    return(
        <> {
            cost
                ? <span className="text-xl tracking-tight text-gray-900 dark:text-white">{numberFormat.format(cost as number)}</span>
                : <></> 
        } </>
    );
}
