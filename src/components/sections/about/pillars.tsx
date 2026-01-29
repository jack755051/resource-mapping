'use client';

import { BadgeCheck, Microscope, Headset } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export function PillarsSection() {
  const { t } = useTranslation();

  return (
    <section className="container mx-auto px-6 py-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Pillar 1: 專業 */}
        <div className="space-y-4">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
            <BadgeCheck className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold">{t('about.pillars.pro.title')}</h3>
          <p className="text-muted-foreground leading-relaxed">
            {t('about.pillars.pro.desc')}
          </p>
        </div>

        {/* Pillar 2: 創新 */}
        <div className="space-y-4">
          <div className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-xl flex items-center justify-center">
            <Microscope className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold">{t('about.pillars.inn.title')}</h3>
          <p className="text-muted-foreground leading-relaxed">
            {t('about.pillars.inn.desc.prefix')}
            <span className="font-semibold text-foreground mx-1">
              {t('about.pillars.inn.desc.highlight')}
            </span>
            {t('about.pillars.inn.desc.suffix')}
          </p>
        </div>

        {/* Pillar 3: 服務 */}
        <div className="space-y-4">
          <div className="w-12 h-12 bg-orange-500/10 text-orange-600 rounded-xl flex items-center justify-center">
            <Headset className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold">{t('about.pillars.srv.title')}</h3>
          <p className="text-muted-foreground leading-relaxed">
            {t('about.pillars.srv.desc')}
          </p>
        </div>
      </div>
    </section>
  );
}
