'use client';

import { ProductFilterSection } from '@/components/sections/product/filter';
import { ProductHeroSection } from '@/components/sections/product/hero';
import { ProductListSection } from '@/components/sections/product/product-list';

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <ProductHeroSection />
      <ProductFilterSection />
      <ProductListSection />
    </div>
  );
}
