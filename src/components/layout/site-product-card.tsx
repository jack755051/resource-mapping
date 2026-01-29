'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// UI Components
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Icons
import { ArrowRight, Aperture, Maximize2, Zap, Layers } from 'lucide-react';

// Utils & Types
import { cn } from '@/lib/utils';
import { ProductCardProps } from '@/type/page/product';
import { ProductImagePlaceholder } from './product-image-placeholder';

export function ProductCard({
  props,
  className,
  classNames,
}: ProductCardProps) {
  const { title, category, image, specs, tags, href } = props;
  const [imageError, setImageError] = useState(false);

  return (
    <Card
      className={cn(
        'group relative flex flex-col h-full overflow-hidden rounded-[1.5rem] border border-border/40 bg-card transition-all duration-500 hover:shadow-2xl hover:border-primary/50 hover:-translate-y-1',
        classNames?.container,
        className
      )}
    >
      {/* 1. 圖片區塊 */}
      <div
        className={cn(
          'relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-b from-muted/20 to-muted/5 p-6 flex items-center justify-center',
          classNames?.imageWrapper
        )}
      >
        {/* 邏輯變得非常易讀：有圖且沒壞 ? 顯示圖 : 顯示 Placeholder */}
        {image && !imageError ? (
          <Image
            src={image}
            alt={title}
            fill
            onError={() => setImageError(true)}
            className={cn(
              'object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-sm group-hover:drop-shadow-xl',
              classNames?.image
            )}
          />
        ) : (
          <ProductImagePlaceholder />
        )}

        {/* 左上角：分類標籤 */}
        <div className="absolute top-4 left-4 z-10">
          <Badge
            variant="outline"
            className={cn(
              'bg-background/60 backdrop-blur border-border/50 text-xs font-medium tracking-wide text-muted-foreground',
              classNames?.badge
            )}
          >
            {category}
          </Badge>
        </div>

        {/* 右上角：AI 亮點 */}
        {tags.includes('AI') && (
          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-white/90 text-primary hover:bg-white shadow-sm gap-1.5 border border-primary/10">
              <Aperture className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold tracking-wider">
                AI CORE
              </span>
            </Badge>
          </div>
        )}
      </div>

      {/* ... (其餘部分保持不變) ... */}
      <div className={cn('flex flex-col flex-1 p-6 pb-0', classNames?.content)}>
        <h3
          className={cn(
            'text-lg font-bold leading-tight text-foreground group-hover:text-primary transition-colors duration-300',
            classNames?.title
          )}
        >
          {title}
        </h3>
        <div className="w-8 h-1 bg-border mt-3 mb-1 rounded-full group-hover:w-12 group-hover:bg-primary/50 transition-all duration-500" />
      </div>

      <CardContent className="p-6 py-4 flex-1">
        <div
          className={cn(
            'grid grid-cols-2 gap-y-3 gap-x-4',
            classNames?.specsGrid
          )}
        >
          {specs.map((spec, index) => (
            <div
              key={index}
              className="flex items-center gap-2.5 text-sm group/spec"
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                {index === 0 ? (
                  <Maximize2 className="w-3 h-3" />
                ) : index === 1 ? (
                  <Zap className="w-3 h-3" />
                ) : (
                  <Layers className="w-3 h-3" />
                )}
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-foreground/90 text-[13px]">
                  {spec.value}
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                  {spec.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter
        className={cn(
          'p-6 pt-2 border-t border-border/30 bg-muted/5 mt-auto',
          classNames?.footer
        )}
      >
        <div className="w-full flex items-center justify-between group/btn cursor-pointer">
          <span className="text-sm font-medium text-muted-foreground group-hover/btn:text-foreground transition-colors">
            View Details
          </span>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full w-8 h-8 bg-transparent group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>

      <Link
        href={href}
        className="absolute inset-0 z-0 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-[1.5rem]"
        aria-label={`View ${title}`}
      />
    </Card>
  );
}
