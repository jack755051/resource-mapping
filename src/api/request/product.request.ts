export interface ProductListReqDto {
  page: number;
  limit: number;
  categoryId?: string;  // ✅ 改為 categoryId 以匹配後端 DTO
  keyword?: string;
  sort?: string;
}

export interface ProductDetailReqDto {
  slug: string;
}
