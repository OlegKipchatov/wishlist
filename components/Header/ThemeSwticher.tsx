'use client';

import { useState } from "react";
import SunIcon from '@heroicons/react/24/outline/SunIcon';
import MoonIcon from '@heroicons/react/24/outline/MoonIcon';
import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon';
import { useTheme } from "@/utils/themes/client";

export default function ThemeSwitcher() {
    const { themeMode, toggleThemeMode } = useTheme();
    const [themeIcon, setThemeIcon] = useState(themeMode);

    const toggleTheme = () => {
        const newTheme = toggleThemeMode();
        setThemeIcon(newTheme);
    }

    return (
        <button onClick={() => toggleTheme()} className='flex gap-4 ml-auto p-2 rounded-lg btn-neutral btn-focus'>
             { themeIcon === 'dark' 
                ? <SunIcon width={24} height={24} />
                : <MoonIcon width={24} height={24} /> }
        </button>
    );
}

export function ThemeSwitcherLoading() {
    return(
        <div className="animate-spin-slow ml-auto">
            <ArrowPathIcon width={24} height={24} />
        </div>
    );
}
