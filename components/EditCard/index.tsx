import { ICard } from "@/supabase/types";
import EditCardImage from "./EditCardImage";

type Props = {
    item?: ICard,
    type: 'add' | 'edit',
    formAction: (formData: FormData) => void,
};

export default function EditCard(props: Props) {
    const { item, type, formAction } = props;
    const formButtonText = type === 'edit' ? 'Edit item' : 'Add item';

    return(
        <form action={formAction}>
            <EditCardImage imageName={item?.image}/>

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
                formAction={formAction}>{formButtonText}</button>
        </form>
    );
}
