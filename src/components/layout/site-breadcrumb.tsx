'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

// 1. 引入翻譯 hook 與映射表
import { useTranslation } from '@/hooks/useTranslation';
import { routeMapping } from '@/config/route-mapping';

export default function SiteBreadcrumb() {
    const pathname = usePathname();
    const { t } = useTranslation(); // 取得翻譯函式

    if (pathname === '/') return null;

    const segments = pathname.split('/').filter((item) => item !== '');

    // 2. 改寫 helper: 嘗試翻譯，如果找不到 key 才用英文格式化
    const getLabel = (slug: string) => {
        // 先去查表，看這個 slug 對應哪個 i18n key
        const i18nKey = routeMapping[slug];

        // 如果有對應的 key，就用 t() 翻譯；如果沒有，就退回原本的格式化邏輯
        if (i18nKey) {
            return t(i18nKey);
        }

        // Fallback: 把 "smart-campus" 變成 "Smart Campus"
        return slug
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    return (
        <div className="w-full border-b border-border/40 bg-background/95 backdrop-blur z-40">
            <div className="container mx-auto px-6 py-3">
                <Breadcrumb>
                    <BreadcrumbList>

                        {/* Home 也建議用翻譯 */}
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/" className="hover:text-primary transition-colors">
                                    {t('nav.home')}
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbSeparator />

                        {segments.map((segment, index) => {
                            const isLast = index === segments.length - 1;
                            const href = `/${segments.slice(0, index + 1).join('/')}`;

                            // 取得顯示文字 (翻譯過後的)
                            const label = getLabel(segment);

                            return (
                                <React.Fragment key={href}>
                                    <BreadcrumbItem>
                                        {isLast ? (
                                            <BreadcrumbPage className="font-medium text-foreground">
                                                {label}
                                            </BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink asChild>
                                                <Link href={href} className="hover:text-primary transition-colors">
                                                    {label}
                                                </Link>
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>

                                    {!isLast && <BreadcrumbSeparator />}
                                </React.Fragment>
                            );
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </div>
    );
}