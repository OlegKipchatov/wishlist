'use client';

import { useEffect, useState } from "react";
import { createClient } from "@/supabase/client";
import { supabaseWorker } from "@/supabase/requests";

type Props = {
    imageName?: string,
};

export default function CardImage(props: Props) {
    const { imageName } = props;
    const [imageURL, setImageURL] = useState<string>();

    useEffect(() => {
        const getPublicImageUrl = async (imageName: string) => {
            const supabase = supabaseWorker(createClient());
            const uid = await supabase.users.getSessionUser();
            const publicImageUrl = await supabase.storage.getPublicCardImageUrl(imageName);

            setImageURL(publicImageUrl);
        };

        if(imageName) {
            getPublicImageUrl(imageName);
        }
    });

    return(
        <>
            {imageURL
                ? <div className="relative flex justify-center sm:max-w-96 w-full overflow-hidden sm:rounded-tl-lg">
                    <img src={imageURL} className="hidden sm:block absolute sm:rounded-tl-lg blur-xl h-full z-0" alt="Product item image" />
                    <img src={imageURL} className="rounded-t-lg sm:rounded-lg object-contain sm:z-10" alt="Product item image" />
                </div>
            : <></>}
        </>
    );
}
