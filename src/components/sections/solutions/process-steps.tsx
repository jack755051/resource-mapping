'use client';

import {
    ClipboardCheck,
    PenTool,
    HardHat,
    Settings,
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export function SolutionsProcessSteps() {
    const { t } = useTranslation();

    // 定義步驟設定，這裡只保留 Icon 與對應的翻譯 Key Index
    const steps = [
        { icon: ClipboardCheck, keyIndex: 1, label: 'STEP 01' },
        { icon: PenTool, keyIndex: 2, label: 'STEP 02' },
        { icon: HardHat, keyIndex: 3, label: 'STEP 03' },
        { icon: Settings, keyIndex: 4, label: 'STEP 04' },
    ];

    return (
        <section className="py-16 bg-muted/30 border-y border-border/40">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {steps.map((step) => {
                        const Icon = step.icon;
                        return (
                            <div key={step.keyIndex} className="relative group">
                                <div className="w-16 h-16 bg-background border border-border rounded-2xl flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
                                    <Icon className="w-8 h-8" />
                                </div>
                                <div className="text-sm font-mono text-muted-foreground mb-1">
                                    {step.label}
                                </div>
                                <h3 className="text-xl font-bold mb-2">
                                    {t(`solutions.steps.${step.keyIndex}.title`)}
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                    {t(`solutions.steps.${step.keyIndex}.desc`)}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}