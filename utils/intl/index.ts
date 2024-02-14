const language = new Intl.Locale(navigator.language).language as Languages;

type Languages = "ru" | "en";

export type IntlMessage = Record<Languages, string>;

export const getString = (messages: IntlMessage) => {
    return messages[language];
}
