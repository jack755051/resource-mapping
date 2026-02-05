'use client';

import { dictionaries } from '@/config/dictionaries';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCurrentLanguage, setLanguage as setLanguageAction } from '@/store/slices/language.slice';
import { LanguageCode } from '@/config/i18n';

export function useTranslation() {
  const language = useAppSelector(selectCurrentLanguage);
  const dispatch = useAppDispatch();

  // t function: 输入 key, 返回对应语言的字符串
  const t = (key: string, params?: Record<string, string | number>) => {
    const dict = dictionaries[language];
    let text = dict[key] || key;

    // 简单的参数替换逻辑 (如果有传 params)
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        text = text.replace(
          new RegExp(`{${paramKey}}`, 'g'),
          String(paramValue)
        );
      });
    }

    return text;
  };

  // 切换语言函数
  const setLanguage = (lang: LanguageCode) => {
    dispatch(setLanguageAction(lang));
  };

  return { t, language, setLanguage };
}
