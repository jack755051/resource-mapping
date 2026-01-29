import {
    Cpu,
    Eye,
    HardDrive,
    Shield,
    Zap,
    Maximize,
    DropletOffIcon,
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { ProductSpecsProps } from '@/type/page/proudct-detail';


// 簡單的 Icon 映射
const iconMap: Record<string, any> = {
    sensor: Eye,
    chip: Cpu,
    lens: Maximize,
    power: Zap,
    storage: HardDrive,
    protection: Shield,
    waterproof: DropletOffIcon,
};

export function ProductSpecs({ props,
    className,
    classNames, }: ProductSpecsProps) {
    const { t } = useTranslation();

    const { specs } = props;

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                {t('productDetail.specs.title')}
            </h3>

            <div className="grid grid-cols-2 gap-4">
                {specs.map((spec, idx) => {
                    const Icon = iconMap[spec.type || 'chip'] || Cpu;

                    return (
                        <div
                            key={idx}
                            className="p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center text-muted-foreground shadow-sm">
                                    <Icon className="w-4 h-4" />
                                </div>
                                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                                    {spec.label}
                                </span>
                            </div>
                            <div className="pl-11 text-base font-bold text-foreground">
                                {spec.value}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
