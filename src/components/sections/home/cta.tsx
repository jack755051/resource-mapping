'use client';

import { useTranslation } from '@/hooks/useTranslation';

export function CtaSection() {
    const { t } = useTranslation();

    return (
        <section className="py-24 px-6 text-center bg-muted/20">
            <div className="max-w-3xl mx-auto space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                    {t('home.cta.title')}
                </h2>
                <p className="text-muted-foreground text-lg">
                    {t('home.cta.subtitle')}
                </p>
                <div className="flex justify-center gap-4">
                    <button className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl">
                        {t('home.cta.button')}
                    </button>
                </div>
            </div>
        </section>
    );
}