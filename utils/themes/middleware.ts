export type Theme = 'light' | 'dark' | undefined;

export const THEME_COOKIE_NAME = 'prefere-theme-mode';

export const scriptSetThemeMode = `try {
  if (localStorage.getItem('${THEME_COOKIE_NAME}') === 'dark' || (!('${THEME_COOKIE_NAME}' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark')
  }
} catch (_) {}`;
