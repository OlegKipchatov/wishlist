import { cookies } from "next/headers";
import { THEME_COOKIE_NAME, Theme } from "./middleware";

export const getTheme = (cookie: ReturnType<typeof cookies>): Theme => {
    const theme = cookie.get(THEME_COOKIE_NAME)?.value as Theme;
    return theme ?? 'light';
}
