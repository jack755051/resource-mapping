import { SupportReqDto } from "../request/support.request";
import { CommonUrl } from '../url';
import { ofetch } from "ofetch";
import { SupportCategoryResDto, SupportListResDto } from '../response/support.response';
import { PaginatedResDto } from '../response/common.response';
import { SupportMapper } from "../mapper/support.mapper";
import { PaginatedSupportResource, SupportCategory } from "@/type/page/support";

export const SupportService = {
    /** 取得支援分類 */
    handleGetSupportCategories: async (): Promise<SupportCategory[]> => {
        try {
            const res = await ofetch<SupportCategoryResDto[]>(CommonUrl.SUPPORT_CATEGORIES);
            return SupportMapper.toDomainCategoryList(res);
        } catch (error) {
            console.warn('[SupportService] Get Categories Failed:', error);
            return []; // 失敗時回傳空陣列，避免卡死
        }
    },

    /** 取得支援資源列表 (含防呆保護) */
    handleGetSupportList: async (payload: SupportReqDto): Promise<PaginatedSupportResource> => {
        try {
            const res = await ofetch<PaginatedResDto<SupportListResDto>>(CommonUrl.SUPPORT_RESOURCES, {
                params: payload
            });
            const { pagination } = res.meta;

            return {
                data: SupportMapper.toDomainList(res.data),
                total: pagination.total_items,
                page: pagination.current_page,
                limit: pagination.items_per_page,
            };
        } catch (error) {
            // 重點：當 404 或 API 錯誤時，不拋出錯誤，而是回傳「空的分頁資料」
            // 這樣前端就會自然呈現「查無資料」，而不會崩潰
            console.warn('[SupportService] Get List Failed (404 or Error), returning empty list.', error);

            return {
                data: [],
                total: 0,
                page: payload.page,
                limit: payload.limit,
            };
        }
    }
}