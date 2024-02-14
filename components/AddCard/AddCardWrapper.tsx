import { useSelector } from "@/store/redux";
import { showPopup } from '@/store/redux/slices/popup';
import AddCardForm from "./AddCardForm";
import AddItemButton from './AddItemButton';


export default function AddCardWrapper() {
    const show = useSelector(showPopup);

    return (
        <div className="flex justify-center">
            <AddItemButton />
            
            { show && <AddCardForm /> }
        </div>
        
    );
}
  