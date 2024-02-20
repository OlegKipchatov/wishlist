import { useSelector, useDispatch, addCardSlice } from "@/store/redux";
import { createClient } from "@/supabase/client";
import { supabaseWorker } from "@/supabase/requests";
import { Card } from "@/supabase/types";
import AddCardImage from './AddCardImage';
import Popup from "../Popup";

const parseBlobToImage = async (blobUrl: string, type: string): Promise<File> => {
    const blob = await fetch(blobUrl).then(r => r.blob());
    
    const imageName = blobUrl.split('/').pop() as string;
    const image = new File([blob], imageName, { type: type });
    return image;
}

export default function AddCardForm() {
    const dispatch = useDispatch();
    const show = useSelector(state => state.addCard.showPopup);
    const image = useSelector(state => state.addCard.image);

    const onClosePopup = () => {
        dispatch(addCardSlice.actions.hide());
    }

    const addItem = async (formData: FormData) => {
        const imageFile = image && await parseBlobToImage(image.imageUrl, image.imageType);
        const item: Card = {
            title: formData.get('title') as string,
            cost: Number(formData.get('cost')),
            link: formData.get('link') as string,
            time: new Date().toISOString(),
            image: imageFile,
        }

        const supabase = supabaseWorker(createClient());
        const isSetItem = await supabase.items.setItem(item);
        if(isSetItem) {
            if(image?.imageUrl) {
                URL.revokeObjectURL(image.imageUrl);
            }
            
            dispatch(addCardSlice.actions.reset());
        }
    }

    return(
        <Popup show={show} onClose={onClosePopup} title="Add item">
            <form action={addItem}>
                <AddCardImage />

                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="mb-5">
                        <input required name='title'
                            type="text"
                            className='w-full p-2.5 rounded-lg border border-gray-100 dark:bg-gray-0 btn-focus'
                            placeholder="Product name"
                        />
                    </div>

                    <div className="mb-5">
                        <input name='cost'
                            type="number"
                            className="w-full p-2.5 rounded-lg border border-gray-100 dark:bg-gray-0 btn-focus"
                            placeholder="Product cost"
                        />
                    </div>
                </div>

                <div className="mb-5">
                    <input name='link'
                        type="text"
                        className="w-full p-2.5 rounded-lg border border-gray-100 dark:bg-gray-0 btn-focus"
                        placeholder="Product link"
                    />
                </div>
                
                <button type="submit"
                    className="w-full rounded-lg py-2.5 px-3 btn-green btn-focus"
                    formAction={addItem}>
                        Add item
                </button>
            </form>
        </Popup>
    );
}
