'use client';

import { createClient } from "@/supabase/client";
import { removeItem } from "@/supabase/requests";

type Props = {
    id: string,
}

const iconStyles = "inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2";

export default function CardFooterAuth(props: Props) {
    const { id } = props;
    const supabase = createClient();

    const onRremoveItem = async (e: React.MouseEvent<HTMLElement>) => {
        const isDeleted = await removeItem(supabase, id);
        if(isDeleted) {
            document.getElementById(id)?.remove();
        }
    }

    return(
        <>
            <div className="p-2 border border-gray-200 rounded-b-lg dark:border-gray-700">
                <div className="flex justify-end space-x-2">
                    <button type="button" className={iconStyles}>
                        <svg className="flex-shrink-0 w-4 h-4" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
                    </button>

                    <button type="button" className={iconStyles} onClick={onRremoveItem}>
                        <svg className="flex-shrink-0 w-4 h-4" viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />  <line x1="18" y1="9" x2="12" y2="15" />  <line x1="12" y1="9" x2="18" y2="15" /></svg>
                    </button>
                </div>
            </div>
        </>
    );
}
