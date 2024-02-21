import { useContext, useEffect, useState } from "react";
import { createClient } from "@/supabase/client";
import { supabaseWorker } from "@/supabase/requests";
import { CardContext } from ".";

export default function CardImage() {
    const cardContext = useContext(CardContext);
    const [imageURL, setImageURL] = useState<string>();

    useEffect(() => {
        const getPublicImageUrl = async (imageName: string) => {
            const supabase = supabaseWorker(createClient());
            const publicImageUrl = await supabase.storage.getPublicCardImageUrl(imageName, cardContext.currentUserId);

            fetch(publicImageUrl)
                .then((responce) => {
                    if(responce.ok) {
                        setImageURL(publicImageUrl);
                    }
                });
        };

        if(cardContext.image) {
            getPublicImageUrl(cardContext.image);
        }
    }, []);

    return(
        <>
            { imageURL
                ? <div className="relative border-b sm:border-none border-gray-100 flex justify-center max-h-96 sm:max-w-96 w-full overflow-hidden rounded-lg">
                    <img src={imageURL} className="absolute blur-xl w-full h-full z-0" alt="Product item image" />
                    <img src={imageURL} className="rounded-t-lg sm:rounded-lg object-contain z-10" alt="Product item image" />
                </div>
            : <></> }
        </>
    );
}
