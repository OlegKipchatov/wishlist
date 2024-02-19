import { useState } from "react";
import { useCookies } from "react-cookie";
import { useTheme as useNextTheme }  from 'next-themes';
import { THEME_COOKIE_NAME } from "./middleware";

export const useTheme = () => {
    const [cookie, setCookie] = useCookies([THEME_COOKIE_NAME]);
    const [themeMode, setThemeMode] = useState(cookie[THEME_COOKIE_NAME]);
    const { setTheme: setNextTheme } = useNextTheme();

    const toggleThemeMode = () => {
        const newThemeMode = themeMode === 'light' ? 'dark' : 'light';

        setThemeMode(newThemeMode);
        setCookie(THEME_COOKIE_NAME, newThemeMode);
        setNextTheme(newThemeMode);

        return newThemeMode;
    };

    return { themeMode, toggleThemeMode };
};
