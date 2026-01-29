import { ProductCardData } from '@/type/page/product';
import { ProductResDto } from '../response/product.response';
import { PaginatedList } from '@/type/common';
import { PaginatedResDto } from '../response/common.response';

export class ProductMapper {
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
    return {
      // 1. 轉換列表資料
      list: dto.data?.map(item => this.toProductCardData(item)) ?? [],

      // 2. 轉換分頁資訊 (Snake -> Camel)
      pagination: {
        current: dto.meta.pagination.current_page,
        pageSize: dto.meta.pagination.items_per_page,
        total: dto.meta.pagination.total_items,
        totalPages: dto.meta.pagination.total_pages,
      },
    };
  }
}
