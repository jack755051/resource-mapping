'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';

export function SolutionsCTA() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-primary text-primary-foreground text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">{t('solutions.cta.title')}</h2>
        <Link
          href="/contact?type=appointment&message=%E6%88%91%E9%9C%80%E8%A6%81%E9%A0%90%E7%B4%84%E8%A9%95%E4%BC%B0%EF%BC%81"
          className="inline-block bg-background text-foreground px-8 py-3 rounded-full font-bold hover:bg-background/90 transition-colors"
        >
          {t('solutions.cta.button')}
        </Link>
      </div>
    </section>
  );
}
