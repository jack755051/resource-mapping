import { SupportReqDto } from "../request/support.request";
import { CommonUrl } from '../url';
import { ofetch } from "ofetch";
import { SupportCategoryResDto, SupportListResDto } from '../response/support.response';
import { PaginatedResDto } from '../response/common.response';
import { SupportMapper } from "../mapper/support.mapper";
import { PaginatedSupportResource } from "@/type/page/support";

/**
 * 取得支援資源列表
 */
export const SupportService = {
    /** 取得支援分類 */
    handleGetSupportCategories: async (): Promise<SupportCategoryResDto[]> => {
        const res = await ofetch<SupportCategoryResDto[]>(CommonUrl.SUPPORT_CATEGORIES);
        return res;
    },
    /** 取得支援資源列表 */
    handleGetSupportList: async (payload: SupportReqDto): Promise<PaginatedSupportResource> => {
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
    }
}