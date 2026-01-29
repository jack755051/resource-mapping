import { PaginatedResDto, PaginationDto } from './common.response';

export interface ProductSpecResDto {
  spec_key: string; // 對應前端的 label
  spec_value: string; // 對應前端的 value
}

export interface ProductResDto {
  id: string;
  slug: string;
  product_name: string; // 後端可能叫 product_name
  category_id: string; // 後端可能給 ID 或 code
  cover_image_url: string; // 後端慣用的命名
  specifications: ProductSpecResDto[]; // 規格列表
  tags: string[];
  // href 不需要後端給，前端自己組
}

export type ProductListResponse = PaginatedResDto<ProductResDto>;

// ---------------------------------------------------------------------------
// 產品詳細頁面
// ---------------------------------------------------------------------------
export interface ProductDetailResDto {}
