import { ofetch } from "ofetch";
import { CommonUrl } from "../url";
import { ConstantProductsCategoriesResDto } from "../response/constant.response";

export const ConstantsService = {
    handleGetProductsCategories: async (language?: string): Promise<ConstantProductsCategoriesResDto[]> => {
        const data = await ofetch<ConstantProductsCategoriesResDto[]>(CommonUrl.CONSTANTS_PRODUCTS_CATEGORIES, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': language ?? 'zh',
            },
        });

        return data;
    },
}