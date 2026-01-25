'use client';

import { Cctv } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductImagePlaceholderProps {
    className?: string;
}

export function ProductImagePlaceholder({ className }: ProductImagePlaceholderProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center gap-3 text-muted-foreground/40 group-hover:text-primary/60 transition-colors duration-500",
                className
            )}
        >
            {/* 外圈裝飾 */}
            <div className="p-4 rounded-full bg-muted/50 border border-border/50 backdrop-blur-sm group-hover:bg-primary/5 group-hover:border-primary/20 transition-all">
                <Cctv className="w-10 h-10" strokeWidth={1.5} />
            </div>

            {/* 文字說明 */}
            <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-bold tracking-widest uppercase font-mono">
                    Image Coming Soon
                </span>
                <span className="text-[10px] opacity-70">
                    Product Visual Pending
                </span>
            </div>
        </div>
    );
}