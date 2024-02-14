import { useDispatch } from "@/store/redux";
import { popupSlice } from "@/store/redux/slices/popup";

type Props = {
    title: string
}

export default function PopupHeader(props: Props) {
    const { title } = props;

    const dispatch = useDispatch();

    return(
        <>
            <div className="flex justify-between items-center border-b-2 pb-2 mb-4">
                <h2>{title}</h2>
                <button onClick={() =>  dispatch(popupSlice.actions.showPopup(false))}
                    className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </>
    );
}
