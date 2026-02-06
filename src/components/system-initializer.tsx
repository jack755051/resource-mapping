'use client';

import { useEffect } from 'react';
import { useSystemResources } from '@/hooks/useSystemResources';
import { useAppDispatch } from '@/store/hooks';
import { hydrateLanguage } from '@/store/slices/language.slice';

/**
 * 系统资源初始化组件
 *
 * 作用：在应用启动时自动加载系统资源，并监听语言变化
 * 这个组件不会渲染任何 UI，仅用于触发副作用
 */
export function SystemInitializer() {
    const dispatch = useAppDispatch();

    // ✅ 在客户端首次渲染时从 localStorage 恢复语言设置
    useEffect(() => {
        dispatch(hydrateLanguage());
    }, [dispatch]);

    // 调用 useSystemResources 会自动监听语言变化并加载系统资源
    useSystemResources();

    // 不渲染任何内容
    return null;
}
