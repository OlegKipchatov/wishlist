import { useContext, useEffect, useState } from "react";
import { CardContext } from ".";

const numberFormat = Intl.NumberFormat(undefined, {style: 'currency', currency: 'RUB', maximumFractionDigits: 0});

export default function CardCost() {
    const cardContext = useContext(CardContext);
    const [displayCost, setDisplayCost] = useState(cardContext.cost.toString());

    useEffect(() => {
        if(cardContext.cost) {
            setDisplayCost(numberFormat.format(cardContext.cost));
        }
    }, []);

    return(
        <> { cardContext.cost ? <span className="text-xl tracking-tight text-gray-900 dark:text-white">{displayCost}</span> : <></> } </>
    );
}
