import { LocalizedString } from "@/type/i18n";

/** * 模擬後端 API 回傳的原始資料結構 (Data Transfer Object)
 * 通常後端習慣用 snake_case (底線命名)
 */
export interface OfficeLocationResDto {
    id: string;
    type: string; // 後端可能是回傳字串 'hq', 'branch'
    title: LocalizedString; // 支援多語系的物件
    address: {
        label: LocalizedString;
        map_url: string;
        embed_code: string;
    };
    contact_info: {
        phones: string[];
        fax?: string;
        email: string;
    };
}

export interface ContactFormResDto {
    success: boolean;
    message: string;
}