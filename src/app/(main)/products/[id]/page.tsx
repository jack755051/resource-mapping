'use client';

import { ProductDownloads } from '@/components/sections/productDetail/downloads';
import { RelatedProducts } from '@/components/sections/productDetail/related';
import { useProductDetail } from '@/hooks/useProductDetail';
import { ProductGallery } from '@/components/sections/productDetail/gallery';
import { ProductInfo } from '@/components/sections/productDetail/info';
import { ProductSpecs } from '@/components/sections/productDetail/specs';
import { LoadingSpinner } from '@/components/layout/loading-spinner';
import { useTranslation } from '@/hooks/useTranslation';
import { ProductInquiryCard } from '@/components/sections/productDetail/inquiry-card';

export default function ProductDetailPage({
    params,
}: {
    params: { slug: string };
}) {
    const { t } = useTranslation();

    // 透過 slug 取得產品資料
    const {
        product,
        isLoading,
        relatedProducts,
        handleInquiryCard,
        gallery,
        productInfo,
        productSpecs,
    } = useProductDetail(params.slug);

    if (isLoading || !productInfo || !gallery) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background gap-4">
                <LoadingSpinner size="lg" />
                <p className="text-sm text-muted-foreground animate-pulse font-medium tracking-wide">
                    {t('system.initializing')}
                </p>
            </div>
        );
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
                        <ProductDownloads downloads={product.downloads} />

                        {/* 詢問按鈕 */}
                        <ProductInquiryCard props={{ onClickContact: handleInquiryCard }} />
                    </div>
                </div>
            </div>

            {/* 底部：相關產品 */}
            <div className="border-t border-border/40 bg-muted/10 mt-20">
                <RelatedProducts products={relatedProducts} />
            </div>
        </div>
    );
}
