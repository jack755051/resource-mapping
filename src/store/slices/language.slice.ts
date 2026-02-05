import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LanguageCode } from '@/config/i18n';

interface LanguageState {
    current: LanguageCode;
}

// 从 localStorage 读取初始语言
const getInitialLanguage = (): LanguageCode => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('app-language') as LanguageCode;
        if (saved) return saved;
    }
    return 'zh'; // 默认语言
};

const initialState: LanguageState = {
    current: getInitialLanguage(),
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<LanguageCode>) => {
            state.current = action.payload;
            // 同步到 localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('app-language', action.payload);
            }
        },
    },
});

// ==================== Exports ==================== //

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;

// ==================== Selectors ==================== //

export const selectCurrentLanguage = (state: { language: LanguageState }) =>
    state.language.current;
