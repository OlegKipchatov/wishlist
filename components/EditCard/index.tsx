import { IItem } from "@/supabase/requests";
import { OnEditCardEvent } from "../WishItem";

type Props = {
    item: IItem,
    onEditCardEvent: (fn: OnEditCardEvent) => void,
};

export default function EditCard(props: Props) {
    const { onEditCardEvent } = props;

    const onCloseCard = () => {
        onEditCardEvent((e: { isEdit: boolean }) => {
            const { isEdit } = e;

            document.body.classList.toggle('overflow-y-hidden', !isEdit);
            document.body.classList.toggle('blur-lg', !isEdit);
            document.body.classList.toggle('z-0', !isEdit);
        });
    }

    return(
        <div className="absolute bottom-0 left-0 h-5/6 border bordero-gray-700 bg-gray-700 w-full z-[10000000]">
            <span>Edit</span>

            <button className="mr-8 color-red" onClick={onCloseCard}>Close</button>
        </div>
    );
}