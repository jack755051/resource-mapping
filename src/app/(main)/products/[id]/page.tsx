'use client';

import { ProductDownloads } from '@/components/sections/productDetail/downloads';
import { RelatedProducts } from '@/components/sections/productDetail/related';
import { useProductDetail } from '@/hooks/useProductDetail';
import { ProductGallery } from '@/components/sections/productDetail/gallery';
import { ProductInfo } from '@/components/sections/productDetail/info';
import { ProductSpecs } from '@/components/sections/productDetail/specs';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
    // 透過 slug 取得產品資料
    const {
        product,
        isLoading,
        relatedProducts,
        galleryActiveIndex,
        setGalleryActiveIndex
    } = useProductDetail(params.slug);

    if (isLoading || !product) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-background pb-20">

            {/* 1. 麵包屑與簡單標題 (可選，視你的 SiteBreadcrumb 是否自動處理) */}

            <div className="container mx-auto px-6 py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                    {/* 左側：Sticky 圖片展示區 (佔 7 欄) */}
                    <div className="lg:col-span-7">
                        <div className="sticky top-24 space-y-8">
                            <ProductGallery props={{
                                images: product.images,
                                activeIndex: galleryActiveIndex,
                                onIndexChange: setGalleryActiveIndex
                            }} />
                        </div>
                    </div>

                    {/* 右側：滾動資訊區 (佔 5 欄) */}
                    <div className="lg:col-span-5 space-y-12">

                        {/* 核心資訊 (標題、描述、特色) */}
                        <ProductInfo
                            title={product.title}
                            model={product.model}
                            description={product.description}
                            features={product.features}
                        />

                        <div className="w-full h-px bg-border/50" />

                        {/* 技術規格 */}
                        <ProductSpecs specs={product.specs} />

                        <div className="w-full h-px bg-border/50" />

                        {/* 下載資源 */}
                        <ProductDownloads downloads={product.downloads} />

                        {/* 詢問按鈕 */}
                        <div className="p-6 bg-muted/30 rounded-2xl border border-primary/10">
                            <h4 className="font-bold mb-2">對此產品感興趣？</h4>
                            <p className="text-sm text-muted-foreground mb-4">我們的工程團隊可以為您提供詳細的技術諮詢。</p>
                            <button className="w-full bg-primary text-primary-foreground h-12 rounded-full font-medium shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all">
                                聯絡我們取得報價
                            </button>
                        </div>

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