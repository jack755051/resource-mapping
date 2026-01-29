import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProductInfoProps } from '@/type/page/proudct-detail';

export function ProductInfo({ props, className, classNames }: ProductInfoProps) {
    const { title, model, description, features } = props;

    return (
        <div className={cn("space-y-6", className, classNames?.container)}>
            {/* 標題與型號區塊 */}
            <div className={classNames?.header}>
                <div className={cn("flex items-center gap-3 mb-3", classNames?.badgeWrapper)}>
                    <Badge
                        variant="outline"
                        className={cn(
                            "text-primary border-primary/20 bg-primary/5 px-2 py-0.5 text-xs tracking-wider",
                            classNames?.badge
                        )}
                    >
                        NEW ARRIVAL
                    </Badge>
                    <span className={cn("text-sm text-muted-foreground font-mono", classNames?.model)}>
                        MODEL: {model}
                    </span>
                </div>

                <h1 className={cn(
                    "text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight",
                    classNames?.title
                )}>
                    {title}
                </h1>
            </div>

            {/* 描述 */}
            <p className={cn(
                "text-muted-foreground leading-relaxed text-lg",
                classNames?.description
            )}>
                {description}
            </p>

            {/* 特色列表 */}
            <div className={cn("grid grid-cols-1 gap-3", classNames?.featuresList)}>
                {features.map((feature, idx) => (
                    <div
                        key={idx}
                        className={cn("flex items-start gap-3", classNames?.featureItem)}
                    >
                        <div className={cn(
                            "mt-1 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 shrink-0",
                            classNames?.featureIcon
                        )}>
                            <Check className="w-3 h-3" />
                        </div>
                        <span className="text-foreground/90 font-medium leading-tight">
                            {feature}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}