'use client';

import { ProductCard } from '@/components/layout/site-product-card';
import { useTranslation } from '@/hooks/useTranslation';
import type { RelatedProductsProps } from '@/type/page/proudct-detail';
import { cn } from '@/lib/utils';

export function RelatedProducts({
  props,
  className,
  classNames,
}: RelatedProductsProps) {
  const { t } = useTranslation();
  if (!props.products || props.products.length === 0) return null;

  return (
    <div
      className={cn(
        'container mx-auto px-6 py-16',
        className,
        classNames?.container
      )}
    >
      <div className="flex items-center justify-between mb-8">
        <h2
          className={cn('text-2xl font-bold tracking-tight', classNames?.title)}
        >
          {t('productDetail.related.title')}
        </h2>
        <a
          href="/products"
          className="text-sm font-medium text-primary hover:underline"
        >
          {t('productDetail.related.viewAll')}
        </a>
      </div>

      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
          classNames?.grid
        )}
      >
        {props.products.map((product, idx) => (
          <ProductCard key={idx} props={product} />
        ))}
      </div>
    </div>
  );
}
