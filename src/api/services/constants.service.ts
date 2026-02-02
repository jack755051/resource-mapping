import { apiClient } from '../client';
import { CommonUrl } from '../url';
import { ConstantProductsCategoriesResDto } from '../response/constant.response';

export const ConstantsService = {
  handleGetProductsCategories: async (
    language?: string
  ): Promise<ConstantProductsCategoriesResDto[]> => {
    const res = await apiClient<{ data: ConstantProductsCategoriesResDto[] }>(
      CommonUrl.CONSTANTS_PRODUCTS_CATEGORIES,
      {
        method: 'GET',
        headers: {
          'Accept-Language': language ?? 'zh',
        },
      }
    );

    // 🔥 後端返回格式: { success, code, message, data: [...] }
    // 需要訪問 res.data 才能拿到真正的數組
    return res.data;
  },
};
