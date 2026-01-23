'use client';

import Link from 'next/link'; // 引入 Link
import { type HeaderBrand as HeaderBrandType } from '@/type';
import { cn } from '@/lib/utils';

export interface BrandProps extends HeaderBrandType {
    className?: string;
}

export default function Brand({ className, logo, title }: BrandProps) {
    return (
        <Link
            href="/"
            className={cn(
                // 基礎佈局
                'header__brand flex items-center gap-2',
                // 互動效果：防止文字選取、滑鼠游標變手指、滑過稍微變透明
                'select-none cursor-pointer transition-opacity hover:opacity-80',
                className
            )}
        >
            {/* 圖片：移除外層 div，直接控制 img */}
            {logo.src && (
                <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-8 w-auto object-contain"
                />
            )}

            {/* 文字：保持原樣，但在手機版通常可以考慮 hidden md:block */}
            {title && (
                <span className="header__brand__title font-bold text-lg whitespace-nowrap">
                    {title}
                </span>
            )}
        </Link>
    );
}
