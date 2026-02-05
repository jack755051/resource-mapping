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
   * - dto.value (string) → id - 使用 value 作為 id（如 "all", "iot-devices"）
   * - dto.name (string) → label - 已翻譯的分類名稱
   * - dto.sort (number) → sort - 排序順序
   *
   * ⚠️ 重要：
   * 1. 使用 value 而非 id（UUID），因為需要用 "all", "iot-devices" 等值來匹配
   * 2. 後端的 I18nInterceptor 已根據 accept-language header 自動翻譯 name
   * 3. 保留 sort 字段用於前端排序
   */
  static toDomainCategory(dto: ConstantProductsCategoriesResDto): ProductCategory {
    return {
      id: dto.value,      // ✅ 使用 value 作為 id
      label: dto.name,    // ✅ 後端已翻譯，直接使用
      sort: dto.sort,     // ✅ 保留排序順序
      slug: dto.value     // ✅ slug 同 value
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
   * 單筆轉換 (Snake Case -> Camel Case)
   */
  static toProductCardData(dto: ProductResDto): ProductCardData {
    return {
      id: dto.id,
      slug: dto.slug,
      title: dto.product_name,
      category: dto.category_id, // 這裡之後可以接 i18n 轉換
      image: dto.cover_image_url,
      href: `/products/${dto.slug}`, // 組裝前端路由
      specs:
        dto.specifications?.map(spec => ({
          label: spec.spec_key,
          value: spec.spec_value,
          type: spec.spec_type ?? this.inferSpecType(spec.spec_key), // 優先使用後端類型，否則推斷
        })) ?? [], // 防呆：如果 spec 是 null，給空陣列
      tags: dto.tags ?? [],
    };
  }

  /**
   * 🔥 列表轉換 (Array)
   * 這裡的好處是：可以在這裡做防呆，如果後端回傳 null，這裡直接給 []，前端就不會爆掉
   */
  static toPaginatedList(
    dto: PaginatedResDto<ProductResDto>
  ): PaginatedList<ProductCardData> {
    console.log('轉換後的列表', dto.data?.map(item => this.toProductCardData(item)));

    const list = dto.data?.map(item => this.toProductCardData(item)) ?? [];

    const pagination = {
      current: dto.meta.pagination.current_page,
      pageSize: dto.meta.pagination.items_per_page,
      total: dto.meta.pagination.total_items,
      totalPages: dto.meta.pagination.total_pages,
    };

    console.log('轉換後的列表', list);
    console.log('轉換後的列表', pagination);

    return {
      // 1. 轉換列表資料
      list: list,
      // 2. 轉換分頁資訊 (Snake -> Camel)
      pagination: pagination,

    };
  }
}
