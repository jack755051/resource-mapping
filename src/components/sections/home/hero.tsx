'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

export function HeroSection() {
    const { t } = useTranslation();

    return (
        <section className="relative w-full py-24 md:py-32 lg:min-h-[90vh] flex flex-col items-center justify-center overflow-hidden border-b border-border/40">
            {/* 1. 背景層 */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 contrast-125 grayscale mix-blend-multiply" />

                {/* HUD 監控介面裝飾 */}
                <div className="absolute inset-0 z-20 pointer-events-none opacity-20">
                    <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary"></div>
                    <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-primary"></div>
                    <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-primary"></div>
                    <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary"></div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[1px] bg-primary/20"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[120%] w-[1px] bg-primary/20"></div>

                    <div className="absolute top-12 right-12 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                        <span className="text-xs font-mono text-primary/80 tracking-widest">REC 00:04:23:12</span>
                    </div>

                    <div className="absolute bottom-12 left-12 font-mono text-[10px] text-primary/40 leading-tight hidden md:block">
                        SYS: ONLINE<br />
                        CAM_ID: 08-AX<br />
                        NET: 1GB/S<br />
                        AI_DETECT: ACTIVE
                    </div>
                </div>

                {/* 網格背景 */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] z-10" />
            </div>

            {/* 2. 內容層 */}
            <div className="relative z-30 text-center px-4 max-w-5xl mx-auto space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium animate-in fade-in zoom-in duration-1000">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                    </span>
                    {t('home.hero.badge')}
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight">
                    {t('home.hero.title.prefix')} <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                        {t('home.hero.title.highlight')}
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    {t('home.hero.subtitle')}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                    <Link
                        href="/enterprise"
                        className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/40"
                    >
                        {t('home.hero.cta.business')}
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>

                    <Link
                        href="/special-solutions"
                        className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-border bg-background/60 backdrop-blur hover:bg-muted font-medium transition-colors"
                    >
                        {t('home.hero.cta.special')}
                    </Link>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent w-full" />
        </section>
    );
}