'use client';

import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export function SolutionsQuality() {
    const { t } = useTranslation();

    // 列表項目 Key
    const listItems = [1, 2, 3, 4];

    return (
        <section className="py-24 container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* 左側：文字描述 */}
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-bold">
                        {t('solutions.quality.badge')}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                        {t('solutions.quality.title')}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        {t('solutions.quality.desc')}
                    </p>
                    <ul className="space-y-3 pt-4">
                        {listItems.map((index) => (
                            <li key={index} className="flex items-center gap-3">
                                <ShieldCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="font-medium">
                                    {t(`solutions.quality.list.${index}`)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 右側：圖片展示 */}
                <div className="relative aspect-square md:aspect-video rounded-2xl overflow-hidden bg-muted border border-border group">
                    {/* 使用 Next Image  */}
                    <Image
                        src="/images/solutions-server_room.jpg"
                        alt="Standardized Cabling"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />

                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 text-xs rounded-md backdrop-blur">
                        {t('solutions.quality.image.caption')}
                    </div>
                </div>
            </div>
        </section>
    );
}