'use client';

import { History } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export function ManifestoSection() {
    const { t } = useTranslation();

    return (
        <section className="container mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24">
            <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm font-medium">
                    <History className="w-4 h-4" />
                    <span>{t('about.manifesto.est')}</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.15] mb-8">
                    {t('about.manifesto.title.prefix')}
                    <br />
                    {t('about.manifesto.title.middle')}
                    <span className="text-primary underline decoration-4 decoration-primary/20 underline-offset-4 mx-2">
                        {t('about.manifesto.title.highlight')}
                    </span>
                    。
                </h1>

                <div className="flex flex-col md:flex-row gap-12 items-start border-l-2 border-primary/20 pl-8 md:pl-12">
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                        {t('about.manifesto.desc.p1')}
                        <br />
                        <br />
                        {t('about.manifesto.desc.p2')}
                        <br className="hidden md:block" />
                        <strong>
                            {t('about.manifesto.desc.highlight')}
                        </strong>
                    </p>
                </div>
            </div>
        </section>
    );
}