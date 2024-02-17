import CardImage from "./CardImage";
import CardCost from "./CardCost";
import CardDate from "./CardDate";
import CardFooter from "./CardFooter";
import { ICard } from "@/supabase/types";

interface Props {
    item: ICard,
    isCurrentUser: boolean,
}

const cardStyles = "flex flex-col sm:flex-row justify-between space-x-2 w-full border rounded-t-lg shadow h-auto sm:h-48";
const cardLightStyles = "bg-white border-gray-200 ";
const cardDarkStyles = "dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ";

export default function Card(props: Props) {
    const { item, isCurrentUser } = props;
    const date = new Date(item.time);

    return(
        <div className="w-96 sm:w-auto sm:max-w-full">
            <a href={item.link ?? '#'} target="blank" className={cardLightStyles + cardDarkStyles + cardStyles}>
                <CardImage imageName={item.image} />

                <div className="flex flex-col justify-between p-4 space-y-4 w-full">
                    <div className="flex flex-col space-y-2">
                        <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {item.title ?? 'Non title'}
                        </span>

                        <CardCost cost={item.cost}/>
                    </div>

                    <div className="flex justify-between items-end space-x-4">
                        <CardDate date={date}/>
                    </div>
                </div>
            </a>

            <CardFooter id={item.id} isCurrentUser={isCurrentUser} />
        </div>
    );
}
