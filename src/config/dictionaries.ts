import { zhDictionary } from './locales/zh';
import { enDictionary } from './locales/en';
import { LanguageCode } from './i18n';

export const dictionaries: Record<LanguageCode, Record<string, string>> = {
  zh: zhDictionary,
  en: enDictionary,
};