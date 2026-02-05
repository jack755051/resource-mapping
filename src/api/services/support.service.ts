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
        // ✅ apiClient 已自動解包 APIResponse，直接獲得 data 內容
        const categories = await apiClient<SupportCategoryResDto[]>(CommonUrl.CONSTANTS_SUPPORT_CATEGORIES, {
            method: 'GET',
            headers: {
                'Accept-Language': lang
            }
        });

        console.log('✅ 支援分類列表（已解包）', categories);

        return SupportMapper.toDomainCategoryList(categories);
    },


    /** 取得支援資源列表 (含防呆保護) */
    handleGetSupportList: async (payload: SupportReqDto, lang: string): Promise<PaginatedSupportResource> => {
        try {
            // ✅ apiClient 已自動解包 APIResponse，返回 { items, meta }
            const res = await apiClient<PaginatedResDto<SupportListResDto>>(CommonUrl.SUPPORT_RESOURCES, {
                params: payload,
                headers: {
                    'Accept-Language': lang ?? 'zh'
                }
            });

            console.log('✅ 支援資源列表（已解包）', res);

            // ✅ 使用新的分頁結構：meta.total, meta.page, meta.limit
            return {
                data: SupportMapper.toDomainList(res.items),  // ✅ 使用 items 而非 data
                total: res.meta.total,      // ✅ 使用 meta.total
                page: res.meta.page,        // ✅ 使用 meta.page
                limit: res.meta.limit,      // ✅ 使用 meta.limit
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