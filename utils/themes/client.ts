import { useLayoutEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { THEME_COOKIE_NAME, Theme } from "./middleware";

export const useTheme = () => {
    const [cookie, setCookie] = useCookies([THEME_COOKIE_NAME]);
    const hasCookie = !!cookie[THEME_COOKIE_NAME];
    
    const preferedDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches && 'dark';
    const currentThemeMode = hasCookie ? cookie[THEME_COOKIE_NAME] : (preferedDarkTheme ? 'dark' : 'light');
    const [themeMode, setThemeMode] = useState(cookie[THEME_COOKIE_NAME] ?? currentThemeMode);

    const setThemeModeToDocument = (newThemeMode: Theme) => {
        document.documentElement.classList.toggle('light', newThemeMode === 'light');
        document.documentElement.classList.toggle('dark', newThemeMode === 'dark');
    }

    const setAppThemeMode = (newThemeMode: Theme) => {
        setThemeMode(newThemeMode);
        setCookie(THEME_COOKIE_NAME, newThemeMode);
    }

    const toggleThemeMode = () => {
        const newThemeMode = themeMode === 'light' ? 'dark' : 'light';

        setAppThemeMode(newThemeMode);
        setThemeModeToDocument(newThemeMode);

        return newThemeMode;
    };

    useLayoutEffect(() => {
        if(hasCookie) {
            setAppThemeMode(themeMode)
        }

        setThemeModeToDocument(themeMode);
    }, []);

    return { themeMode, toggleThemeMode };
};
