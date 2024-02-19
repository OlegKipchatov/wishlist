'use client';

import { useEffect, useState } from "react";
import { createClient } from "../../supabase/client";

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
                ? <div className="relative flex justify-center sm:max-w-96 w-full overflow-hidden sm:rounded-tl-lg">
                    <img src={imageURL} className="hidden sm:block absolute sm:rounded-tl-lg blur-xl h-full z-0" alt="Product item image" />
                    <img src={imageURL} className="rounded-t-lg sm:rounded-lg object-contain sm:z-10" alt="Product item image" />
                </div>
            : <></>}
        </>
    );
}
