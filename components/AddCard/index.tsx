'use client'

import { Providers } from "@/store/providers";
import AddCardWrapper from './AddCardWrapper';

export default function AddCard() {
    return (
        <Providers>
            <AddCardWrapper />
        </Providers>
        
    );
}
  