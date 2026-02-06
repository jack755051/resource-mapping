import { useState, useEffect, useMemo } from 'react';
import type { ProductCardData } from '@/type/page/product';
import {
  ProductDownload,
  ProductDownloads,
  ProductGallery,
  ProductInfo,
  ProductInquiryCard,
  ProductSpecs,
} from '@/type/page/proudct-detail';
import { useRouter } from 'next/navigation';
import { ProductService } from '@/api/services/product.service';
import { useTranslation } from './useTranslation';

// 定義詳細頁面專屬的資料型別 (繼承卡片資料，但多了詳細資訊)
export interface ProductDetailData extends ProductCardData {
  tag: string;
  model: string;
  description: string;
  features: string[];
  images: string[]; // 畫廊圖片陣列
  downloads: ProductDownload[];
}

export function useProductDetail(slug: string, id?: string) {
  // 引入 useRouter 和 useTranslation
  const router = useRouter();
  const { language } = useTranslation();

  const [product, setProduct] = useState<ProductDetailData | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [galleryActiveIndex, setGalleryActiveIndex] = useState(0);

  // ======= Methods Start =======

  /**
   * 處理畫廊切換
   * @param index 索引
   */
  const handleGalleryChange = (index: number) => {
    setGalleryActiveIndex(index);
  };

  const handleInquiryCard = () => {
    console.log('Contact clicked');
    router.push('/contact');
  };

  // ======= Derived Data Start =======

  const gallery: ProductGallery | null = useMemo(() => {
    if (!product) return null;

    return {
      images: product.images,
      activeIndex: galleryActiveIndex,
      onIndexChange: setGalleryActiveIndex,
    };
  }, [product, galleryActiveIndex]);

  /**
   * 處理產品資訊
   * @returns ProductInfo
   */
  const productInfo: ProductInfo | null = useMemo(() => {
    if (!product) return null;

    return {
      tag: product.tag,
      title: product.title,
      model: product.model,
      description: product.description,
      features: product.features,
    };
  }, [product]);

  /**
   * 處理產品規格
   * @returns ProductSpecs
   */
  const productSpecs: ProductSpecs | null = useMemo(() => {
    if (!product) return null;

    return {
      specs: product.specs,
    };
  }, [product]);

  const productDownloads: ProductDownloads | null = useMemo(() => {
    if (!product) return null;

    return {
      downloads: product.downloads,
    };
  }, [product]);

  // ======= useEffect=======

  useEffect(() => {
    let isMounted = true;

    const fetchProductDetail = async () => {
      setIsLoading(true);
      // 每次切換產品時，重置畫廊索引
      setGalleryActiveIndex(0);

      try {
        // 1. 調用 API 獲取產品詳情（優先使用 id，如果沒有則使用 slug）
        const identifier = id || slug;
        const productData = await ProductService.handleGetProductDetail(identifier, language);

        if (!isMounted) return;

        setProduct(productData);

        // 2. TODO: 獲取相關產品（目前使用空數組，可以後續實現）
        // 可以根據產品的 category 調用列表 API 獲取同分類的其他產品
        setRelatedProducts([]);

      } catch (error) {
        console.error('❌ 獲取產品詳情失敗', error);
        if (!isMounted) return;

        // 錯誤處理：設置為 null，觸發 404 或錯誤頁面
        setProduct(null);
        setRelatedProducts([]);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProductDetail();

    return () => {
      isMounted = false;
    };
  }, [id, slug, language]);

  return {
    product,
    relatedProducts,
    isLoading,
    // 匯出狀態與方法
    galleryActiveIndex,
    setGalleryActiveIndex: handleGalleryChange,
    handleInquiryCard,
    // 匯出 derived data
    gallery,
    productInfo,
    productSpecs,
    productDownloads,
  };
}
