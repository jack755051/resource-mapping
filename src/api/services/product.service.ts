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
   *
   * ✅ apiClient 已自動解包 APIResponse，直接獲得 data 內容
   */
  handleGetProductCategories: async (lang: string): Promise<ProductCategory[]> => {
    console.log('取得產品分類列表');
    // apiClient 自動解包後返回的是 ConstantProductsCategoriesResDto[]
    const categories = await apiClient<ConstantProductsCategoriesResDto[]>(
      CommonUrl.CONSTANTS_PRODUCTS_CATEGORIES,
      {
        method: 'GET',
        headers: {
          'Accept-Language': lang,
        },
      }
    );

    console.log('✅ 分類列表（已解包）', categories);

    return ProductMapper.toDomainCategoryList(categories);
  },

  /**
   * 取得產品列表
   * @param lang 當前語系代碼 (e.g. 'zh', 'en')
   *
   * ✅ apiClient 已自動解包 APIResponse，返回 { items, meta }
   */
  handleGetProducts: async (
    params: ProductListReqDto,
    lang: string
  ): Promise<PaginatedList<ProductCardData>> => {
    console.log('🔍 請求產品列表', params);

    // apiClient 自動解包後返回 { items: [...], meta: {...} }
    const data = await apiClient<ProductListResponse>(CommonUrl.PRODUCTS, {
      method: 'GET',
      query: {
        page: params.page,
        limit: params.limit,
        categoryId: params.categoryId, // ✅ 改為 categoryId，如果是 undefined，ofetch 會自動過濾掉不傳
        keyword: params.keyword,
        sort: params.sort,
      },
      headers: {
        'Accept-Language': lang,
      },
    });

    console.log('✅ 後端返回數據（已解包）', data);

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
