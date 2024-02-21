import { useEffect, useRef, useState } from "react";
import CloudArrowUpIcon from '@heroicons/react/24/outline/CloudArrowUpIcon';
import { supabaseWorker } from "@/supabase/requests";
import { createClient } from "@/supabase/client";
import { CardBlobImage, updateImageName } from "@/utils/card";

const MAX_SIZE = 2_097_152;

type Props = {
    imageName?: string,
    setImage: (newValue: File) => void,
};

export default function EditCardImage(props: Props) {
    const { imageName, setImage } = props;
    const [imageUrl, setImageUrl] = useState<string>();
    const inputFileRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const getPublicImageUrl = async (imageName: string) => {
            const supabase = supabaseWorker(createClient());
            const publicImageUrl = await supabase.storage.getPublicCardImageUrl(imageName);

            setImageUrl(publicImageUrl);
        };

        if(imageName) {
            getPublicImageUrl(imageName);
        }

        return () => {
            if(imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        }
    }, []);

    const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const userImage = e.currentTarget.files?.item(0) as File;
        if(userImage.size > MAX_SIZE) {
            return;
        }

        const imageBlobUrl = URL.createObjectURL(userImage);
        setImageUrl(imageBlobUrl);

        const imageName = imageBlobUrl.split('/').pop() as string;
        const cardImage = updateImageName(userImage, imageName);
        setImage(cardImage);
    }

    return(
        <div className="flex items-center justify-center w-full mb-5">
            { !imageUrl && <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 bg-gray-0 btn-neutral border-dashed rounded-lg cursor-pointer">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <CloudArrowUpIcon width={48} height={48} className="mb-2" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG or JPG (MAX 2MB)</p>
                </div>
            </label> }

            {imageUrl && <img src={imageUrl} className="h-64 hover:cursor-pointer" onClick={() => inputFileRef.current?.click()} />}

            <input ref={inputFileRef} id="dropzone-file" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={uploadImage} />
        </div>
    );
}
