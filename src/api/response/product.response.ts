import { PaginatedResDto } from './common.response';

// 產品規格 DTO (已匹配後端實際返回)
export interface ProductSpecResDto {
  type?:
    | 'sensor'
    | 'chip'
    | 'lens'
    | 'power'
    | 'storage'
    | 'protection'
    | 'waterproof';
  label: string; // 後端返回 label
  value: string; // 後端返回 value
}

// 產品分類 DTO (後端返回的 category 是完整對象)
export interface ProductCategoryResDto {
  id: string;
  name: string;
  description: string | null;
  value: string; // 如 "license"
  sort: number;
}

// 產品 DTO (匹配後端實際返回的字段名)
export interface ProductResDto {
  id: string;
  tag?: string; // 標籤如 "熱銷新品"
  slug: string;
  title: string; // ✅ 後端返回 title 不是 product_name
  category: ProductCategoryResDto; // ✅ 後端返回完整對象不是 category_id
  image: string; // ✅ 後端返回 image 不是 cover_image_url
  href?: string; // 後端可能會返回 href
  model: string; // 型號如 "SRT-LPR-X1"
  tags: string[];
  specs: ProductSpecResDto[]; // ✅ 後端返回 specs 不是 specifications
  description?: string; // 產品描述
  features?: string[]; // 產品特性列表
  images?: string[]; // 詳細圖片列表
  downloads?: any[]; // 下載資源
  createdAt?: any;
  updatedAt?: any;
}

export type ProductListResponse = PaginatedResDto<ProductResDto>;

// ---------------------------------------------------------------------------
// 產品詳細頁面
// ---------------------------------------------------------------------------

// 產品下載資源 DTO
export interface ProductDownloadResDto {
  id: string;
  url: string;
  date: string; // ISO date string
  size: number; // bytes
  type: string; // 文件類型如 "PDF", "ZIP"
  title: string; // 下載資源標題
}

// 產品詳情 DTO（擴展自列表 DTO，包含更多詳細信息）
export interface ProductDetailResDto extends ProductResDto {
  features?: string[]; // 產品特性列表
  images?: string[]; // 詳細圖片列表（畫廊）
  downloads?: ProductDownloadResDto[]; // 下載資源列表
}
