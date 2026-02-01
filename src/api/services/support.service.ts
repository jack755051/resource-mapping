import { SupportReqDto } from "../request/support.request";
import { CommonUrl } from '../url';
import { ofetch } from "ofetch";
import { SupportCategoryResDto, SupportListResDto } from '../response/support.response';
import { PaginatedResDto } from '../response/common.response';
import { SupportMapper } from "../mapper/support.mapper";
import { PaginatedSupportResource, SupportCategory } from "@/type/page/support";

export const SupportService = {
    /** 取得支援分類 */
    handleGetSupportCategories: async (lang: string): Promise<SupportCategory[]> => {
        const baseURL = '/api/v1';
        const res = await ofetch<SupportCategoryResDto[]>(CommonUrl.SUPPORT_CATEGORIES, {
            method: 'GET',
            baseURL,
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': lang
            }
        });
        return SupportMapper.toDomainCategoryList(res);
    },


    /** 取得支援資源列表 (含防呆保護) */
    handleGetSupportList: async (payload: SupportReqDto, lang: string): Promise<PaginatedSupportResource> => {
        const baseURL = '/api/v1';
        try {
            const res = await ofetch<PaginatedResDto<SupportListResDto>>(CommonUrl.SUPPORT_RESOURCES, {
                baseURL,
                params: payload,
                headers: {
                    'Content-Type': 'application/json',
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