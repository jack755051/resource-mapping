import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/product.slice';

export const store = configureStore({
    reducer: {
        product: productReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

// 🔥 這裡導出 Types，解決 Hook 裡的 TypeScript 報錯
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;