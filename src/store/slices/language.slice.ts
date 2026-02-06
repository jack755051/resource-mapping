import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LanguageCode } from '@/config/i18n';

interface LanguageState {
    current: LanguageCode;
    isHydrated: boolean; // 标记是否已从 localStorage 加载
}

// ✅ 修复：总是返回固定的默认值，避免 SSR/CSR 不一致
const initialState: LanguageState = {
    current: 'zh', // 固定默认值
    isHydrated: false,
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        // ✅ 新增：从 localStorage 恢复语言设置（仅在客户端调用）
        hydrateLanguage: (state) => {
            if (typeof window !== 'undefined') {
                const saved = localStorage.getItem('app-language') as LanguageCode;
                if (saved) {
                    state.current = saved;
                }
                state.isHydrated = true;
            }
        },
        setLanguage: (state, action: PayloadAction<LanguageCode>) => {
            state.current = action.payload;
            state.isHydrated = true;
            // 同步到 localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('app-language', action.payload);
            }
        },
    },
});

// ==================== Exports ==================== //

export const { setLanguage, hydrateLanguage } = languageSlice.actions;
export default languageSlice.reducer;

// ==================== Selectors ==================== //

export const selectCurrentLanguage = (state: { language: LanguageState }) =>
    state.language.current;
