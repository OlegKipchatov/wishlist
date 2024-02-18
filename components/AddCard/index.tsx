'use client'

import { Providers } from "@/store/providers";
import AddItemButton from "./AddItemButton";
import AddCardForm from "./AddCardForm";
import { useState } from "react";

export default function AddCard() {
    const [show, setShow] = useState(false);

    return (
        <Providers>
            <div className="flex justify-center">
                <AddItemButton onShow={() => setShow(true)} />
                <AddCardForm show={show} onClose={() => setShow(false)}/>
            </div>
        </Providers>
        
    );
}
  