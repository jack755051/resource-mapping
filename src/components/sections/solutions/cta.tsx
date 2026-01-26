'use client';

import { useTranslation } from '@/hooks/useTranslation';

export function SolutionsCTA() {
    const { t } = useTranslation();

    return (
        <section className="py-20 bg-primary text-primary-foreground text-center">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold mb-6">
                    {t('solutions.cta.title')}
                </h2>
                <button className="bg-background text-foreground px-8 py-3 rounded-full font-bold hover:bg-background/90 transition-colors">
                    {t('solutions.cta.button')}
                </button>
            </div>
        </section>
    );
}