import { selectImage, useSelector, useDispatch, editCardSlice } from "@/store/redux";
import AddCardImage from './AddCardImage';
import Popup from "../Popup";
import { useRef } from "react";
import { popupSlice, showPopup } from "@/store/redux/slices/popup";
import { setItem } from "@/utils/supabase/requests";
import { createClient } from "@/utils/supabase/client";

const parseBlobToImage = async (blobUrl: string, type: string): Promise<File> => {
    const blob = await fetch(blobUrl).then(r => r.blob());
    
    const imageName = blobUrl.split('/').pop() as string;
    const image = new File([blob], imageName, { type: type });
    return image;
}

export default function AddCardForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const costRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();
    const show = useSelector(showPopup);
    const image = useSelector(selectImage);

    const supabase = createClient();

    const addItem = async (e:  React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if(!titleRef.current?.value) {
            console.log('empty title');
            return;
        }

        let imageFile: File | undefined = undefined;
        if(image?.imageUrl) {
            imageFile = await parseBlobToImage(image.imageUrl, image.imageType);
        }
        
        const item: any = {
            title: titleRef.current.value,
            cost: Number(costRef.current?.value),
            link: costRef.current?.value,
            time: new Date().toISOString(),
            image: imageFile,
        }

        const isSetItem = await setItem(supabase, item);
        if(isSetItem) {
            formRef.current?.reset();
            dispatch(editCardSlice.actions.reset());
            dispatch(popupSlice.actions.showPopup(false));

            if(image?.imageUrl) {
                URL.revokeObjectURL(image.imageUrl);
            }
        }
    }

    return(
        <Popup show={show} title="Add item">
            <form ref={formRef}>
                <AddCardImage />

                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="mb-5">
                        <input required ref={titleRef}
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Product name"
                        />
                    </div>

                    <div className="mb-5">
                        <input
                            type="number" ref={costRef}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Product cost"
                        />
                    </div>
                </div>

                <div className="mb-5">
                    <input ref={linkRef}
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Product link"
                    />
                </div>
                
                <button type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={(e) => addItem(e)}>
                        Add item
                </button>
            </form>
        </Popup>
    );
}
