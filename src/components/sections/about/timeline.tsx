'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export function TimelineSection() {
    const { t } = useTranslation();

    return (
        <section className="border-t border-border/40 py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* 左側：標題區 */}
                    <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit">
                        <h2 className="text-3xl font-bold mb-4 leading-tight">
                            {t('about.timeline.header.title')}
                        </h2>
                        <p className="text-muted-foreground mb-8 text-lg">
                            {t('about.timeline.header.desc')}
                        </p>
                        <button className="inline-flex items-center text-primary font-medium hover:underline group">
                            {t('about.timeline.header.cta')}
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>

                    {/* 右側：時間軸主體 */}
                    <div className="lg:w-2/3 ml-4 lg:ml-0">
                        <div className="relative border-l-2 border-border/60 space-y-12 pl-8 md:pl-12">
                            {/* Node 1: 2004 */}
                            <div className="relative">
                                <span className="absolute -left-[41px] md:-left-[57px] top-1 flex h-6 w-6 items-center justify-center rounded-full border-4 border-background bg-muted-foreground/30 ring-4 ring-background"></span>

                                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                                    <span className="text-xl font-bold text-foreground">
                                        {t('about.timeline.2004.year')}
                                    </span>
                                    <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
                                        {t('about.timeline.2004.label')}
                                    </span>
                                </div>
                                <h4 className="text-lg font-bold">
                                    {t('about.timeline.2004.title')}
                                </h4>
                                <p className="text-muted-foreground mt-2 max-w-md">
                                    {t('about.timeline.2004.desc')}
                                </p>
                            </div>

                            {/* Node 2: 2015 */}
                            <div className="relative">
                                <span className="absolute -left-[41px] md:-left-[57px] top-1 flex h-6 w-6 items-center justify-center rounded-full border-4 border-background bg-muted-foreground/30 ring-4 ring-background"></span>

                                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                                    <span className="text-xl font-bold text-foreground">
                                        {t('about.timeline.2015.year')}
                                    </span>
                                    <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
                                        {t('about.timeline.2015.label')}
                                    </span>
                                </div>
                                <h4 className="text-lg font-bold">
                                    {t('about.timeline.2015.title')}
                                </h4>
                                <p className="text-muted-foreground mt-2 max-w-md">
                                    {t('about.timeline.2015.desc')}
                                </p>
                            </div>

                            {/* Node 3: 2022 */}
                            <div className="relative">
                                <span className="absolute -left-[41px] md:-left-[57px] top-1 flex h-6 w-6 items-center justify-center rounded-full border-4 border-background bg-muted-foreground/30 ring-4 ring-background"></span>

                                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                                    <span className="text-xl font-bold text-foreground">
                                        {t('about.timeline.2022.year')}
                                    </span>
                                    <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
                                        {t('about.timeline.2022.label')}
                                    </span>
                                </div>
                                <h4 className="text-lg font-bold">
                                    {t('about.timeline.2022.title')}
                                </h4>
                                <p className="text-muted-foreground mt-2 max-w-md">
                                    {t('about.timeline.2022.desc')}
                                </p>
                            </div>

                            {/* Node 4: Future */}
                            <div className="relative">
                                <span className="absolute -left-[41px] md:-left-[57px] top-1 flex h-6 w-6">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-6 w-6 border-4 border-background bg-primary ring-4 ring-background"></span>
                                </span>

                                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                                    <span className="text-xl font-bold text-primary">
                                        {t('about.timeline.future.year')}
                                    </span>
                                    <span className="text-sm font-mono text-primary/80 uppercase tracking-wider">
                                        {t('about.timeline.future.label')}
                                    </span>
                                </div>
                                <h4 className="text-lg font-bold text-foreground">
                                    {t('about.timeline.future.title')}
                                </h4>
                                <p className="text-muted-foreground mt-2 max-w-md">
                                    {t('about.timeline.future.desc')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}