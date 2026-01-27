import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

interface ProductInfoProps {
    title: string;
    model: string;
    description: string;
    features: string[];
}

export function ProductInfo({ title, model, description, features }: ProductInfoProps) {
    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center gap-3 mb-3">
                    <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 px-2 py-0.5 text-xs tracking-wider">
                        NEW ARRIVAL
                    </Badge>
                    <span className="text-sm text-muted-foreground font-mono">MODEL: {model}</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                    {title}
                </h1>
            </div>

            <p className="text-muted-foreground leading-relaxed text-lg">
                {description}
            </p>

            {/* 特色列表 */}
            <div className="grid grid-cols-1 gap-3">
                {features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 shrink-0">
                            <Check className="w-3 h-3" />
                        </div>
                        <span className="text-foreground/90 font-medium">{feature}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}