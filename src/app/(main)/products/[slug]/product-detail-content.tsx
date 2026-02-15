'use client';

import { Suspense } from 'react';
import { ProductDownloads } from '@/components/sections/productDetail/downloads';
import { RelatedProducts } from '@/components/sections/productDetail/related';
import { useProductDetail } from '@/hooks/useProductDetail';
import { ProductGallery } from '@/components/sections/productDetail/gallery';
import { ProductInfo } from '@/components/sections/productDetail/info';
import { ProductSpecs } from '@/components/sections/productDetail/specs';
import { LoadingScreen } from '@/components/layout/loading-screen';
import { ProductInquiryCard } from '@/components/sections/productDetail/inquiry-card';
import { useSearchParams } from 'next/navigation';

// 將使用 useSearchParams 的邏輯提取到單獨的組件
function ProductDetailWithSearchParams({ slug }: { slug: string }) {
  // ✅ 在客戶端組件中讀取 searchParams 的 id 參數
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || undefined;

  // ✅ 透過 slug 和 id 取得產品資料（優先使用 id）
  const {
    product,
    isLoading,
    relatedProducts,
    handleInquiryCard,
    gallery,
    productInfo,
    productSpecs,
    productDownloads,
  } = useProductDetail(slug, id);

  if (
    isLoading ||
    !productInfo ||
    !gallery ||
    !productSpecs ||
    !productDownloads
  ) {
    return <LoadingScreen fullScreen />;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* 1. 麵包屑與簡單標題 (可選，視你的 SiteBreadcrumb 是否自動處理) */}

      <div className="container mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* 左側：Sticky 圖片展示區 (佔 7 欄) */}
          <div className="lg:col-span-7">
            <div className="sticky top-24 space-y-8">
              <ProductGallery props={gallery} />
            </div>
          </div>

          {/* 右側：滾動資訊區 (佔 5 欄) */}
          <div className="lg:col-span-5 space-y-12">
            {/* 核心資訊 (標題、描述、特色) */}
            <ProductInfo props={productInfo} />

            <div className="w-full h-px bg-border/50" />

            {/* 技術規格 */}
            <ProductSpecs props={productSpecs} />

            <div className="w-full h-px bg-border/50" />

            {/* 下載資源 */}
            <ProductDownloads props={productDownloads} />

            {/* 詢問按鈕 */}
            <ProductInquiryCard props={{ onClickContact: handleInquiryCard }} />
          </div>
        </div>
      </div>

      {/* 底部：相關產品 */}
      <div className="border-t border-border/40 bg-muted/10 mt-20">
        <RelatedProducts props={{ products: relatedProducts }} />
      </div>
    </div>
  );
}

// 主要導出組件：使用 Suspense 包裹，避免 hydration error
export function ProductDetailContent({ slug }: { slug: string }) {
  return (
    <Suspense fallback={<LoadingScreen fullScreen />}>
      <ProductDetailWithSearchParams slug={slug} />
    </Suspense>
  );
}
