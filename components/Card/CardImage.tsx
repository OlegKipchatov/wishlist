'use client';

import { createClient } from "./../../utils/supabase/client";
import { useEffect, useState } from "react";

type Props = {
    imageName?: string,
};

const mobileStyle = 'self-center rounded-full h-32 w-32';

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
                ? <div className="flex justify-center max-w-96 sm:max-w-80">
                    <img src={imageURL} className="rounded-t-lg sm:rounded-tl-lg sm:rounded-tr-none" alt="Product item image" />
                </div>
            : <></>}
        </>
    );
}
