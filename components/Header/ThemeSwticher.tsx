'use client';

import { useState } from "react";
import { ThemeProvider }  from 'next-themes';
import { useTheme } from "@/utils/themes/client";
import { THEME_COOKIE_NAME } from "@/utils/themes/middleware";

const ThemeWrapper = () => {
    const { themeMode, toggleThemeMode } = useTheme();
    const [themeIcon, setThemeIcon] = useState(themeMode);

    const toggleTheme = () => {
        const newTheme = toggleThemeMode();
        setThemeIcon(newTheme);
    }

    return (
        <button onClick={() => toggleTheme()} className='flex gap-4 ml-auto p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 active:bg-gray-400 dark:active:bg-gray-800'>
             { themeIcon === 'dark' 
                ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
                : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg> }
        </button>
    );
};

export default function ThemeSwitcher() {
    return(
        <ThemeProvider attribute="class" storageKey={THEME_COOKIE_NAME} disableTransitionOnChange>
            <ThemeWrapper />
        </ThemeProvider>
    );
}

export function ThemeSwitcherLoading() {
    return(
        <div className="animate-spin-slow ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
            </svg>
        </div>
    );
}
