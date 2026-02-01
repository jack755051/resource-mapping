import { apiClient } from '../client';
import { CommonUrl } from '../url';
import { ProductListResponse } from '../response/product.response';
import { ProductListReqDto } from '../request/product.request';
import { ProductMapper } from '../mapper/product.mapper';
import { PaginatedList } from '@/type/common';
import { ProductCardData } from '@/type/page/product';

export const ProductService = {
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
