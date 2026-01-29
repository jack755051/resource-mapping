'use client';

import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';

export function ImageGridSection() {
  const { t } = useTranslation();

  return (
    <section className="w-full border-y border-border/40 bg-muted/20">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
          {/* 左側大圖 */}
          <div className="md:col-span-8 relative rounded-[2rem] overflow-hidden group min-h-[400px]">
            <Image
              src="/images/about_me-tech_lab.jpg"
              alt={t('about.grid.integration.title')}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* 漸層遮罩 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

            {/* 底部資訊面板 */}
            <div className="absolute bottom-0 left-0 w-full p-8 border-t border-white/10 bg-black/40 backdrop-blur-md">
              <div className="flex flex-col items-start gap-3">
                <span className="px-3 py-1 rounded-md text-xs font-bold bg-primary text-primary-foreground tracking-wider shadow-sm">
                  {t('about.grid.integration.badge')}
                </span>

                <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {t('about.grid.integration.title')}
                  </h3>
                  <p className="text-sm md:text-base text-gray-200 leading-relaxed max-w-3xl">
                    {t('about.grid.integration.desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 右側兩張圖 */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {/* 右上：特殊場域 */}
            <div className="flex-1 relative rounded-[2rem] overflow-hidden group min-h-[250px]">
              <Image
                src="/images/about_me-underwater_work.jpg"
                alt={t('about.grid.special.title')}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-blue-950/30 mix-blend-multiply" />

              <div className="absolute bottom-0 left-0 w-full p-6 border-t border-white/10 bg-black/40 backdrop-blur-md">
                <div className="flex flex-col items-start gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white tracking-wider shadow-sm">
                    {t('about.grid.special.badge')}
                  </span>
                  <div>
                    <h3 className="font-bold text-lg text-white">
                      {t('about.grid.special.title')}
                    </h3>
                    <p className="text-xs text-gray-200 mt-0.5 hidden md:block">
                      {t('about.grid.special.desc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 右下：壓力測試 */}
            <div className="flex-1 relative rounded-[2rem] overflow-hidden group min-h-[250px]">
              <Image
                src="/images/about_me-quality_test.jpg"
                alt={t('about.grid.qc.title')}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20" />

              <div className="absolute bottom-0 left-0 w-full p-6 border-t border-white/10 bg-black/40 backdrop-blur-md">
                <div className="flex flex-col items-start gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-600 text-white tracking-wider shadow-sm">
                    {t('about.grid.qc.badge')}
                  </span>
                  <div>
                    <h3 className="font-bold text-lg text-white">
                      {t('about.grid.qc.title')}
                    </h3>
                    <p className="text-xs text-gray-200 mt-0.5 hidden md:block">
                      {t('about.grid.qc.desc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
