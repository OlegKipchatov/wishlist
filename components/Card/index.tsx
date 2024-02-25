import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Image, Link, Button, Divider } from '@nextui-org/react';
import { createClient } from "@/supabase/client";
import { supabaseWorker } from "@/supabase/requests";
import { ICard } from "@/supabase/types";
import CardSettings from "./CardSettings";

interface Props {
    card: ICard,
    currentUserId: string,
    isCurrentUser: boolean,
    isAuthenticated: boolean,
}

const numberFormat = Intl.NumberFormat('ru', {style: 'currency', currency: 'RUB', maximumFractionDigits: 0});
const dateFormat = Intl.DateTimeFormat('en', {
    year: "numeric",
    month: "long",
    day: "numeric",
});

export default (props: Props) => {
    const { card, currentUserId, isCurrentUser, isAuthenticated } = props;
    const [imageUrl, setImageUrl] = useState('');
    
    useEffect(() => {
        (async () => {
            const supabase = supabaseWorker(createClient());
            if(card.image) {
                const publicImageUrl = await supabase.storage.getPublicCardImageUrl(card.image, currentUserId);
                setImageUrl(publicImageUrl)
            }
        })();
    }, [])

    return (
        <Card className="w-full max-w-96 sm:max-w-full">
            <CardBody className="flex flex-col gap-4 sm:flex-row">
                <div className="flex items-center justify-center">
                    <Image shadow='sm' src={imageUrl} isBlurred height={256} width={256} className="max-h-96 sm:max-h-64" />
                </div>
                <div className="flex flex-col gap-4 justify-between w-full place-self-stretch p-2">
                    <div className="space-y-2">
                        <h2 className="font-bold text-2xl text-foreground">{card.title}</h2>
                        <p className="font-bold text-xl text-foreground">{numberFormat.format(card.cost)}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-end items-center gap-2">
                            { card.link && <Button as={Link} href={card.link} target="_blank" color='default'>View</Button> }
                            { (isAuthenticated && !isCurrentUser) && <Button color='primary' variant='shadow'>Book</Button> }
                        </div>
                        <span className="text-right text-sm text-gray-400">{dateFormat.format(new Date(card.time))}</span>
                    </div>
                </div>
            </CardBody>
            { isCurrentUser && <CardFooter className="flex flex-col gap-2">
                <Divider />
                <CardSettings card={card} />
            </CardFooter> }
        </Card>
    );
}
