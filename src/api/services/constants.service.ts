import { apiClient } from '../client';
import { CommonUrl } from '../url';
import { ConstantProductsCategoriesResDto } from '../response/constant.response';

export const ConstantsService = {
  handleGetProductsCategories: async (
    language?: string
  ): Promise<ConstantProductsCategoriesResDto[]> => {
    const data = await apiClient<ConstantProductsCategoriesResDto[]>(
      CommonUrl.CONSTANTS_PRODUCTS_CATEGORIES,
      {
        method: 'GET',
        headers: {
          'Accept-Language': language ?? 'zh',
        },
      }
    );

    return data;
  },
};
