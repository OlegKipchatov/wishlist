import { useCallback, useEffect, useState } from "react";
import { Card, ICard } from "@/supabase/types";
import EditCardImage from "./EditCardImage";

type Props = {
    item?: ICard,
    type: 'add' | 'edit',
    onCard: (formData: Card) => void,
};

export default function EditCard(props: Props) {
    const { item, type, onCard } = props;
    const formButtonText = type === 'edit' ? 'Edit item' : 'Add item';

    const [image, setImage] = useState<File>();

    const onFormAction = async (formData: FormData) => {
        const newCard: Card = {
            title: formData.get('title') as string,
            cost: Number(formData.get('cost')),
            link: formData.get('link') as string,
            time: new Date().toISOString(),
            image: image,
        };

        return onCard(newCard);
    }

    const setImageCallback = useCallback((newImage: File) => {
        setImage(newImage);
    }, []);

    return(
        <form action={onFormAction}>
            <EditCardImage imageName={item?.image} setImage={setImageCallback}/>

            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="mb-5">
                    <input required name='title'
                        type="text"
                        className='w-full p-2.5 rounded-lg border border-gray-100 dark:bg-gray-0 btn-focus'
                        placeholder="Product name"
                        defaultValue={item?.title}
                    />
                </div>

                <div className="mb-5">
                    <input name='cost'
                        type="number"
                        className="w-full p-2.5 rounded-lg border border-gray-100 dark:bg-gray-0 btn-focus"
                        placeholder="Product cost"
                        defaultValue={item?.cost}
                    />
                </div>
            </div>

            <div className="mb-5">
                <input name='link'
                    type="text"
                    className="w-full p-2.5 rounded-lg border border-gray-100 dark:bg-gray-0 btn-focus"
                    placeholder="Product link"
                    defaultValue={item?.link}
                />
            </div>
            
            <button type="submit"
                className="w-full rounded-lg py-2.5 px-3 btn-green btn-focus"
                formAction={onFormAction}>{formButtonText}</button>
        </form>
    );
}
