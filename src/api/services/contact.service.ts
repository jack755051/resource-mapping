import { ContactMapper } from "@/api/mapper/contact.mapper";
import { OfficeLocation } from "@/type/page/contact";
import { CommonUrl } from "../url";
import { ofetch } from "ofetch";


// tpyes
import { ContactFormResDto, OfficeLocationResDto } from "../response/contact.response";
import { ContactFormReqDto } from "../request/contact.request";
import { MOCK_CONTACT_API_RESPONSE } from "@/mock/contact";


export const ContactService = {
    /**
     * 取得據點列表
     * @returns Promise<OfficeLocation[]>
     */
    handleGetLocations: async (): Promise<OfficeLocation[]> => {
        // 直接請求，不包 try-catch
        const data = await ofetch<OfficeLocationResDto[]>(CommonUrl.CONTACT_LOCATIONS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

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