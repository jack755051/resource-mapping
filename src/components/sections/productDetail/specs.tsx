import { Cpu, Eye, HardDrive, Shield, Zap, Maximize } from 'lucide-react';

interface ProductSpecsProps {
    specs: { label: string; value: string; icon?: string }[];
}

// 簡單的 Icon 映射
const iconMap: Record<string, any> = {
    sensor: Eye,
    chip: Cpu,
    lens: Maximize,
    power: Zap,
    storage: HardDrive,
    protection: Shield
};

export function ProductSpecs({ specs }: ProductSpecsProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Technical Specs
            </h3>

            <div className="grid grid-cols-2 gap-4">
                {specs.map((spec, idx) => {
                    const Icon = iconMap[spec.icon || 'chip'] || Cpu;

                    return (
                        <div key={idx} className="p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors">
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