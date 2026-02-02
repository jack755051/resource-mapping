import { apiClient } from '../client';
import { CommonUrl } from '../url';
import { ProductListResponse } from '../response/product.response';
import { ProductListReqDto } from '../request/product.request';
import { ProductMapper } from '../mapper/product.mapper';
import { PaginatedList } from '@/type/common';
import { ProductCardData, ProductCategory } from '@/type/page/product';
import { ConstantProductsCategoriesResDto } from '../response/constant.response';

export const ProductService = {
  /**
   * 取得產品分類列表
   * @param lang 當前語系代碼 (e.g. 'zh', 'en')
   */
  handleGetProductCategories: async (lang: string): Promise<ProductCategory[]> => {
    const res = await apiClient<{ data: ConstantProductsCategoriesResDto[] }>(
      CommonUrl.CONSTANTS_PRODUCTS_CATEGORIES,
      {
        method: 'GET',
        headers: {
          'Accept-Language': lang,
        },
      }
    );
    // 🔥 後端返回 { success, code, message, data: [...] }
    // 需要訪問 res.data 獲取實際陣列
    return ProductMapper.toDomainCategoryList(res.data);
  },

  /**
   * 取得產品列表
   * @param lang 當前語系代碼 (e.g. 'zh', 'en')
   */
  handleGetProducts: async (
    params: ProductListReqDto,
    lang: string
  ): Promise<PaginatedList<ProductCardData>> => {
    const data = await apiClient<ProductListResponse>(CommonUrl.PRODUCTS, {
      method: 'GET',
      query: {
        page: params.page,
        limit: params.limit,
        category: params.category, // 如果是 undefined，ofetch 會自動過濾掉不傳
        keyword: params.keyword,
        sort: params.sort,
      },
      headers: {
        'Accept-Language': lang,
      },
    });

    return ProductMapper.toPaginatedList(data);
  },

  // handleGetProductDetail: async (slug: string, lang: string): Promise<ProductDetailResponse> => {
  //     const data = await ofetch<ProductDetailResponse>(CommonUrl.PRODUCT_DETAIL, {
  //         method: 'GET',
  //         headers: {
  //             'Content-Type': 'application/json',
  //             'Accept-Language': lang,
  //         },
  //     });

  //     return data;
  // }
};
