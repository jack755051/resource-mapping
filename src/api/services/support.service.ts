import { apiClient } from '../client';
import { SupportReqDto } from "../request/support.request";
import { CommonUrl } from '../url';
import { SupportCategoryResDto, SupportListResDto } from '../response/support.response';
import { PaginatedResDto } from '../response/common.response';
import { SupportMapper } from "../mapper/support.mapper";
import { PaginatedSupportResource, SupportCategory } from "@/type/page/support";

export const SupportService = {
    /** 取得支援分類 */
    handleGetSupportCategories: async (lang: string): Promise<SupportCategory[]> => {
        const res = await apiClient<SupportCategoryResDto[]>(CommonUrl.CONSTANTS_SUPPORT_CATEGORIES, {
            method: 'GET',
            headers: {
                'Accept-Language': lang
            }
        });
        return SupportMapper.toDomainCategoryList(res);
    },


    /** 取得支援資源列表 (含防呆保護) */
    handleGetSupportList: async (payload: SupportReqDto, lang: string): Promise<PaginatedSupportResource> => {
        try {
            const res = await apiClient<PaginatedResDto<SupportListResDto>>(CommonUrl.SUPPORT_RESOURCES, {
                params: payload,
                headers: {
                    'Accept-Language': lang ?? 'zh'
                }
            });
            const { pagination } = res.meta;

            return {
                data: SupportMapper.toDomainList(res.data),
                total: pagination.total_items,
                page: pagination.current_page,
                limit: pagination.items_per_page,
            };
        } catch (error: any) {
            // ★ 特規處理：如果後端回傳 404，視為「空資料」並回傳，不拋出錯誤
            if (error?.response?.status === 404) {
                return {
                    data: [],
                    total: 0,
                    page: payload.page,
                    limit: payload.limit,
                };
            }
            // 其他錯誤 (500, 401...) 繼續往上拋，讓 Hook 處理
            throw error;
        }
    }
}