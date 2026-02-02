import { OfficeLocationResDto } from '@/api/response/contact.response';

/**
 * Mock 數據 - 模擬後端返回格式
 * ⚠️ 注意：模擬的是「中文」語系的返回結果
 * 實際使用時，後端會根據 Accept-Language header 返回對應語言
 */
export const MOCK_CONTACT_API_RESPONSE: OfficeLocationResDto[] = [
  {
    id: 'a7adc330-15cd-426d-ab33-72c957bc22be',
    name: '新北總公司', // 🔥 已翻譯（假設為中文）
    address: '241 新北市新莊區福壽街 164 巷 17 號 1 樓', // 🔥 已翻譯
    mapUrl: 'https://maps.app.goo.gl/fvDkzWnfEkrXXPuQ9',
    phones: ['(02) 2999-0707', '(02) 2999-0298'],
    fax: '(02) 2999-1755',
    email: 'gxunmail@yahoo.com.tw',
    officeType: {
      id: '8a28cb22-3f21-4817-9d7c-744e0a3c3aa1',
      name: '區域總部', // 🔥 已翻譯
    },
    sort: 1,
  },
  {
    id: 'mock-branch-01',
    name: '台中辦事處', // 🔥 已翻譯（假設為中文）
    address: '408 台中市南屯區文心路一段 123 號 3 樓', // 🔥 已翻譯
    mapUrl: 'https://maps.google.com/?q=台中市南屯區文心路一段123號',
    phones: ['(04) 2123-4567'],
    fax: '(04) 2123-4568',
    email: 'taichung@example.com.tw',
    officeType: {
      id: 'mock-type-branch',
      name: '分公司', // 🔥 已翻譯
    },
    sort: 2,
  },
];
