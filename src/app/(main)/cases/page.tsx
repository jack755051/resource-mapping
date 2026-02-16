'use client';

import { useTranslation } from '@/hooks/useTranslation';

export default function CasesPage() {
  const { t } = useTranslation();

  return (
    <div className="section-container section-y-sm">
      <h1 className="text-2xl font-bold">{t('nav.cases')}</h1>
    </div>
  );
}
