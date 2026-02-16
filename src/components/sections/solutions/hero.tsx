'use client';

import { useTranslation } from '@/hooks/useTranslation';

export function SolutionsHero() {
  const { t } = useTranslation();

  return (
    <section className="section-container section-y-lg text-center">
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6">
        {t('solutions.hero.title.prefix')} <br />
        <span className="text-primary">
          {t('solutions.hero.title.highlight')}
        </span>
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        {t('solutions.hero.desc')}
      </p>
    </section>
  );
}
