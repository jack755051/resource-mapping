'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setLanguage as setLanguageAction, selectCurrentLanguage } from '@/store/slices/language.slice';
import { LanguageCode } from '@/config/i18n';

/**
 * Hook to access and update the current language
 */
export function useLanguage() {
  const dispatch = useAppDispatch();
  const language = useAppSelector(selectCurrentLanguage);

  const setLanguage = (newLanguage: LanguageCode) => {
    dispatch(setLanguageAction(newLanguage));
  };

  return {
    language,
    setLanguage,
  };
}
