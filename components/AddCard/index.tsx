'use client'

import { Providers } from "@/store/providers";
import AddItemButton from "./AddItemButton";
import AddCardForm from "./AddCardForm";

export default function AddCard() {
    return (
        <Providers>
            <div className="flex justify-center">
                <AddItemButton />
                <AddCardForm />
            </div>
        </Providers>
        
    );
}
  