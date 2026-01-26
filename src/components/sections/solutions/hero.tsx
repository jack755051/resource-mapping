'use client';

import { useTranslation } from '@/hooks/useTranslation';

export function SolutionsHero() {
    const { t } = useTranslation();

    return (
        <section className="py-24 text-center container mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {t('solutions.hero.title.prefix')} <br />
                <span className="text-primary">{t('solutions.hero.title.highlight')}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('solutions.hero.desc')}
            </p>
        </section>
    );
}