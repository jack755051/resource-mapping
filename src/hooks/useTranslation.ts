'use client';

import { dictionaries } from '@/config/dictionaries';
// 1. 改成引入你寫好的 Hook，而不是 Context
import { useLanguage } from '@/provider/language-provider';

export function useTranslation() {
    // 2. 直接使用 useLanguage，它已經處理好 useContext 和錯誤檢查了
    const { language } = useLanguage();

    // t function: 輸入 key, 回傳對應語言的字串
    // (這裡我幫你補上了參數功能，方便未來擴充)
    const t = (key: string, params?: Record<string, string | number>) => {
        const dict = dictionaries[language];
        let text = dict[key] || key;

        // 簡單的參數替換邏輯 (如果有傳 params)
        if (params) {
            Object.entries(params).forEach(([paramKey, paramValue]) => {
                text = text.replace(new RegExp(`{${paramKey}}`, 'g'), String(paramValue));
            });
        }

        return text;
    };

    return { t, language };
}