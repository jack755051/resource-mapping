export const languages = [
    { code: 'zh', label: '繁體中文' },
    { code: 'en', label: 'English' },
] as const;

export type LanguageCode = (typeof languages)[number]['code'];

export const defaultLanguage: LanguageCode = 'zh';