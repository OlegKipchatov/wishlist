'use client';

import { useEffect, useState } from "react";
import { createClient } from "./../../utils/supabase/client";

type Props = {
    imageName?: string,
};

export default function CardImage(props: Props) {
    const { imageName } = props;

    const [imageURL, setImageURL] = useState<string>();

    const supabase = createClient();

    useEffect(() => {
        if(imageName) {
            const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(imageName);
            setImageURL(publicUrl);
        }
    });

    return(
        <>
            {imageURL
                ? <div className="flex justify-center sm:justify-start max-w-96 w-full flex-1/3">
                    <img src={imageURL} className="rounded-t-lg sm:rounded-tl-lg sm:rounded-tr-none object-contain" alt="Product item image" />
                </div>
            : <></>}
        </>
    );
}
