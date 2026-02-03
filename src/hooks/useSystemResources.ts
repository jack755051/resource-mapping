'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/provider/language-provider';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    fetchSystemResources,
    selectSupportCategories,
    selectProductCategories,
    selectLocationsCategories,
    selectSystemIsLoading,
    selectSystemError,
    selectSystemResources,
} from '@/store/slices/system.slice';

/**
 * 自定义 Hook：监听语系变化并自动获取系统资源
 *
 * 使用方式：
 * 1. 在 App 根组件或 Layout 中调用一次，自动监听语系变化
 * 2. 在其他组件中通过 selectors 获取数据
 *
 * @example
 * // 在 Layout 或 App 中初始化
 * function RootLayout() {
 *   useSystemResources(); // 自动监听语系变化
 *   return <div>...</div>;
 * }
 *
 * // 在其他组件中使用数据
 * function MyComponent() {
 *   const supportCategories = useAppSelector(selectSupportCategories);
 *   const { isLoading } = useSystemResources();
 *   return <div>...</div>;
 * }
 */
export function useSystemResources() {
    const { language } = useLanguage();
    const dispatch = useAppDispatch();

    // 获取状态
    const isLoading = useAppSelector(selectSystemIsLoading);
    const error = useAppSelector(selectSystemError);
    const resources = useAppSelector(selectSystemResources);

    // 监听语系变化，自动获取资源
    useEffect(() => {
        dispatch(fetchSystemResources(language));
    }, [language, dispatch]);

    return {
        // 资源数据
        supportCategories: resources.supportCategories,
        productCategories: resources.productCategories,
        locations: resources.locations,
        // 状态
        isLoading,
        error,
        // 手动刷新方法
        refresh: () => dispatch(fetchSystemResources(language)),
    };
}

/**
 * 仅获取 Support Categories 的 Hook（不会触发数据加载）
 */
export function useSupportCategories() {
    return useAppSelector(selectSupportCategories);
}

/**
 * 仅获取 Product Categories 的 Hook（不会触发数据加载）
 */
export function useProductCategories() {
    return useAppSelector(selectProductCategories);
}

/**
 * 仅获取 Locations 的 Hook（不会触发数据加载）
 */
export function useLocations() {
    return useAppSelector(selectLocationsCategories);
}
