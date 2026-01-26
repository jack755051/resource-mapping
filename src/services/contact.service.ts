import { ContactMapper } from "@/api/mapper/contact.mapper";
import { MOCK_CONTACT_API_RESPONSE } from "@/mock/contact";
import { OfficeLocation } from "@/type/page/contact";

export const ContactService = {
    /**
     * 取得據點列表
     * @returns Promise<OfficeLocation[]>
     */
    getLocations: async (): Promise<OfficeLocation[]> => {
        // 1. 模擬 API 請求 (未來這裡改成 axios.get)
        // const { data } = await httpClient.get<OfficeLocationResDto[]>('/contact/locations');
        const data = MOCK_CONTACT_API_RESPONSE;

        // 模擬網路延遲 (可選)
        await new Promise(resolve => setTimeout(resolve, 300));

        // 2. 透過 Mapper 轉換資料
        return ContactMapper.toDomainList(data);
    }
};