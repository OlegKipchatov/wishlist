import { useContext } from "react";
import { CardContext } from ".";

export default function CardDate() {
    const cardContext = useContext(CardContext);
    const date = new Date(cardContext.time);

    const formatter = Intl.DateTimeFormat('en', {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return(
        <div className="flex self-end space-x-4">
            <span className="inline-block align-text-bottom mb-1.5 text-sm tracking-tight text-gray-600 dark:text-gray-400">
                {formatter.format(date)}
            </span>
        </div>
    );
}
