'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';

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
          <Link
            href="/contact?type=appointment&message=%E6%88%91%E9%9C%80%E8%A6%81%E9%A0%90%E7%B4%84%E8%A9%95%E4%BC%B0%EF%BC%81"
            className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
          >
            {t('home.cta.button')}
          </Link>
        </div>
      </div>
    </section>
  );
}
