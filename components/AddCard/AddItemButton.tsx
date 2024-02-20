import { addCardSlice, useDispatch } from "@/store/redux";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";

const layoutStyle = 'z-10 fixed sm:relative bottom-8 sm:bottom-0 sm:flex sm:justify-center sm:w-full focus:ring-4 focus:outline-none rounded-full sm:rounded-lg p-6 sm:px-5 sm:py-3 btn-primary btn-focus text-white';

export default function AddItemButton() {
    const dispatch = useDispatch();

    return (
        <button onClick={() => dispatch(addCardSlice.actions.show())} className={layoutStyle}>
            <PlusIcon width={24} height={24} />
        </button>
    );
}
  