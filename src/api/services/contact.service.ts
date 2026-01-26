import { ContactMapper } from "@/api/mapper/contact.mapper";
import { MOCK_CONTACT_API_RESPONSE } from "@/mock/contact";
import { OfficeLocation } from "@/type/page/contact";
import { CommonUrl } from "../url";
import { ofetch } from "ofetch";


// tpyes
import { ContactFormResDto } from "../response/contact.response";
import { ContactFormReqDto } from "../request/contact.request";


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
    },


    /**
     * 處理聯絡表單
     * @param payload 
     * @returns 
     */
    handlePostContactForm: async (payload: ContactFormReqDto): Promise<ContactFormResDto> => {
        const data = await ofetch<ContactFormResDto>(CommonUrl.CONTACT_FORM, {
            method: 'POST',
            body: payload,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return data;
    }
};