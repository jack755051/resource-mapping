import { ProductCardData, ProductCategory } from '@/type/page/product';
import { ProductResDto } from '../response/product.response';
import { PaginatedList } from '@/type/common';
import { PaginatedResDto } from '../response/common.response';
import { ProductSpecItem } from '@/type/page/proudct-detail';
import { ConstantProductsCategoriesResDto } from '../response/constant.response';

export class ProductMapper {
  // ==========================================
  // Product Categories 轉換
  // ==========================================

  /**
   * 單一轉換：將 API 分類 DTO 轉為 UI 用的 Domain Model (ProductCategory)
   *
   * 後端字段映射：
   * - dto.id (UUID) → id - 用於 API 請求的分類 UUID
   * - dto.value (string) → slug - URL 友好的分類識別碼（如 "underwater", "5mp"）
   * - dto.name (string) → label - 已翻譯的分類名稱
   * - dto.sort (number) → sort - 排序順序
   *
   * ⚠️ 重要：
   * 1. ✅ id 使用 UUID（dto.id），用於 API 過濾請求
   * 2. ✅ slug 使用 value（dto.value），用於 URL 和顯示
   * 3. 後端的 I18nInterceptor 已根據 accept-language header 自動翻譯 name
   */
  static toDomainCategory(dto: ConstantProductsCategoriesResDto): ProductCategory {
    return {
      id: dto.id,         // ✅ 使用真實的 UUID
      label: dto.name,    // ✅ 後端已翻譯，直接使用
      sort: dto.sort,     // ✅ 保留排序順序
      slug: dto.value     // ✅ URL 友好的識別碼
    };
  }

  /**
   * 批次轉換分類
   */
  static toDomainCategoryList(dtos: ConstantProductsCategoriesResDto[]): ProductCategory[] {
    if (!Array.isArray(dtos)) return [];
    return dtos.map(dto => this.toDomainCategory(dto));
  }

  // ==========================================
  // Product List 轉換
  // ==========================================
  /**
   * 根據規格 key 推斷規格類型
   */
  private static inferSpecType(specKey: string): ProductSpecItem['type'] {
    const key = specKey.toLowerCase();
    if (key.includes('sensor') || key.includes('感測器')) return 'sensor';
    if (key.includes('chip') || key.includes('晶片') || key.includes('處理器')) return 'chip';
    if (key.includes('lens') || key.includes('鏡頭') || key.includes('焦距')) return 'lens';
    if (key.includes('power') || key.includes('電源') || key.includes('供電')) return 'power';
    if (key.includes('storage') || key.includes('儲存') || key.includes('記憶')) return 'storage';
    if (key.includes('protection') || key.includes('防護') || key.includes('保護')) return 'protection';
    if (key.includes('waterproof') || key.includes('防水') || key.includes('ip')) return 'waterproof';
    return 'sensor'; // 默認類型
  }
  /**
   * 單筆轉換：後端 DTO → 前端 ProductCardData
   *
   * 字段映射：
   * - dto.title → title ✅
   * - dto.category.value → category (使用 value 作為 category id)
   * - dto.image → image ✅
   * - dto.specs → specs ✅ (已匹配)
   */
  static toProductCardData(dto: ProductResDto): ProductCardData {
    return {
      id: dto.id,
      slug: dto.slug,
      title: dto.title,              // ✅ 後端返回 title
      category: dto.category.value,  // ✅ 使用 category.value 作為分類 id
      image: dto.image,              // ✅ 後端返回 image
      href: dto.href || `/products/${dto.slug}`, // 優先使用後端的 href，否則組裝
      specs: dto.specs?.map(spec => ({
        label: spec.label,           // ✅ 後端已返回 label
        value: spec.value,           // ✅ 後端已返回 value
        type: spec.type ?? this.inferSpecType(spec.label), // 優先使用後端類型
      })) ?? [],
      tags: dto.tags ?? [],
    };
  }

  /**
   * 🔥 列表轉換：後端分頁結構 → 前端 PaginatedList
   *
   * 字段映射：
   * - dto.items → list ✅
   * - dto.meta.page → pagination.current ✅
   * - dto.meta.limit → pagination.pageSize ✅
   * - dto.meta.total → pagination.total ✅
   * - dto.meta.lastPage → pagination.totalPages ✅
   */
  static toPaginatedList(
    dto: PaginatedResDto<ProductResDto>
  ): PaginatedList<ProductCardData> {
    console.log('📦 原始後端數據', dto);
    console.log('📦 原始產品列表', dto.items);

    // 轉換產品列表
    const list = dto.items?.map(item => this.toProductCardData(item)) ?? [];

    // 轉換分頁信息
    const pagination = {
      current: dto.meta.page,       // ✅ 後端返回 page
      pageSize: dto.meta.limit,     // ✅ 後端返回 limit
      total: dto.meta.total,        // ✅ 後端返回 total
      totalPages: dto.meta.lastPage, // ✅ 後端返回 lastPage
    };

    console.log('✅ 轉換後的產品列表', list);
    console.log('✅ 轉換後的分頁信息', pagination);

    return {
      list,
      pagination,
    };
  }
}
