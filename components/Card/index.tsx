import CardImage from "./CardImage";
import CardDate from "./CardDate";
import CardFooter from "./CardFooter";
import CardCost from "./CardCost";
import { ICard } from "@/supabase/types";

interface Props {
    item: ICard,
    isCurrentUser: boolean,
}

const cardStyles = 'bg-gray-0 dark:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-200 active:bg-gray-200 dark:active:bg-gray-300';

export default function Card(props: Props) {
    const { item, isCurrentUser } = props;
    const date = new Date(item.time);

    return(
        <div className='flex flex-col justify-between w-full rounded-lg shadow-xl h-auto dark:bg-gray-100 border border-gray-100'>
            <a href={item.link ?? '#'} target="blank" className={cardStyles + " flex flex-col sm:flex-row btn-focus rounded-lg border-b border-gray-100"}>
                <CardImage imageName={item.image} />

                <div className="flex flex-col justify-between p-4 space-y-4 w-full">
                    <div className="flex flex-col space-y-2">
                        <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {item.title}
                        </span>

                        <CardCost cost={item.cost}/>
                    </div>

                    <CardDate date={date}/>
                </div>
            </a>

            <CardFooter item={item} isCurrentUser={isCurrentUser} />
        </div>
    );
}
