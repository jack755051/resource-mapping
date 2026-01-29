import { contentProps } from '../common';
import { ProductCardData } from './product';

// ======== 產品畫廊 ========

export interface ProductGallery {
  images: string[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
}

export interface ProductGalleryClasses {
  container?: string;
  imageWrapper?: string;
  image?: string;
  badge?: string;
  content?: string;
  title?: string;
  specsGrid?: string;
  footer?: string;
}

export interface ProductGalleryProps extends contentProps<
  ProductGallery,
  ProductGalleryClasses
> {}

// ======== 產品資訊 ========

export interface ProductInfo {
  tag: string;
  title: string;
  model: string;
  description: string;
  features: string[];
}

export interface ProductInfoClasses {
  container?: string; // 最外層容器
  header?: string; // 標題區塊的容器
  badgeWrapper?: string; // 包裹 Badge 和 Model 的那一列
  badge?: string; // "NEW ARRIVAL" 標籤
  model?: string; // Model 文字
  title?: string; // H1 標題
  description?: string; // 描述文字
  featuresList?: string; // 特色列表容器
  featureItem?: string; // 單個特色項目 (列)
  featureIcon?: string; // 打勾圖示的圓圈背景
}

export interface ProductInfoProps extends contentProps<
  ProductInfo,
  ProductInfoClasses
> {}

// ======== 產品規格 ========

export interface ProductSpecItem {
  label: string;
  value: string;
  type:
    | 'sensor'
    | 'chip'
    | 'lens'
    | 'power'
    | 'storage'
    | 'protection'
    | 'waterproof';
}

export interface ProductSpecs {
  specs: ProductSpecItem[];
}

export interface ProductSpecsClasses {
  container?: string;
  title?: string;
  specsGrid?: string;
}

export interface ProductSpecsProps extends contentProps<
  ProductSpecs,
  ProductSpecsClasses
> {}

// ======== 產品下載 ========

export interface ProductDownload {
  id: string;
  title: string;
  type: 'PDF' | 'Word' | 'Driver' | 'Firmware' | 'Software';
  size: number;
  date: string;
  url: string;
}

export interface ProductDownloads {
  downloads: ProductDownload[];
}

export interface ProductDownloadsClasses {
  container?: string;
  title?: string;
  downloadsGrid?: string;
}

export interface ProductDownloadsProps extends contentProps<
  ProductDownloads,
  ProductDownloadsClasses
> {}

// ======== 產品詢問按鈕 ========

export interface ProductInquiryCard {
  onClickContact: () => void;
}

export interface ProductInquiryCardClasses {
  container?: string;
  title?: string;
  description?: string;
  button?: string;
}

export interface ProductInquiryCardProps extends contentProps<
  ProductInquiryCard,
  ProductInquiryCardClasses
> {}
// ======== 相關產品 ========

export interface RelatedProductsData {
  products: ProductCardData[];
}

export interface RelatedProductsClasses {
  container?: string;
  title?: string;
  grid?: string;
}

export interface RelatedProductsProps extends contentProps<
  RelatedProductsData,
  RelatedProductsClasses
> {}
