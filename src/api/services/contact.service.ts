import { apiClient } from '../client';
import { ContactMapper } from '@/api/mapper/contact.mapper';
import { OfficeLocation } from '@/type/page/contact';
import { CommonUrl } from '../url';

// Types
import { ContactFormReqDto } from '../request/contact.request';
import {
  ContactFormResDto,
  OfficeLocationResDto,
} from '../response/contact.response';

export const ContactService = {
  /**
   * 取得據點列表 (GET)
   * @param lang 當前語系代碼 (e.g. 'zh', 'en')
   */
  handleGetLocations: async (lang: string): Promise<OfficeLocation[]> => {
    const res = await apiClient<{ data: OfficeLocationResDto[] }>(
      CommonUrl.CONTACT_LOCATIONS,
      {
        method: 'GET',
        headers: {
          // 🔥 關鍵：告訴後端我現在是哪個語言
          'Accept-Language': lang,
        },
      }
    );

    // 🔥 後端返回 { success, code, message, data: [...] }
    // 需要訪問 res.data 獲取實際陣列
    return ContactMapper.toDomainList(res.data);
  },

  /**
   * 送出聯絡表單 (POST)
   * @param payload 表單資料
   * @param lang 當前語系 (用於決定後端回傳的 message 語言)
   */
  handlePostContactForm: async (
    payload: ContactFormReqDto,
    lang: string
  ): Promise<ContactFormResDto> => {
    const data = await apiClient<ContactFormResDto>(CommonUrl.CONTACT_FORM, {
      method: 'POST',
      body: payload,
      headers: {
        // 🔥 關鍵：讓後端回傳的 error message (如 "驗證失敗") 是對應語言
        'Accept-Language': lang,
      },
    });

    return data;
  },
};
