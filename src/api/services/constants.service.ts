import { apiClient } from '../client';
import { CommonUrl } from '../url';
import { ConstantProductsCategoriesResDto } from '../response/constant.response';

export const ConstantsService = {
  /**
   * 取得產品分類列表
   *
   * ✅ apiClient 已自動解包 APIResponse，直接獲得 data 內容
   */
  handleGetProductsCategories: async (
    language?: string
  ): Promise<ConstantProductsCategoriesResDto[]> => {
    const categories = await apiClient<ConstantProductsCategoriesResDto[]>(
      CommonUrl.CONSTANTS_PRODUCTS_CATEGORIES,
      {
        method: 'GET',
        headers: {
          'Accept-Language': language ?? 'zh',
        },
      }
    );

    console.log('✅ 產品分類列表（已解包）', categories);

    return categories;
  },
};
