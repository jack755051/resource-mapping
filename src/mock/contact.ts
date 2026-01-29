import { OfficeLocationResDto } from '@/api/response/contact.response';

export const MOCK_CONTACT_API_RESPONSE: OfficeLocationResDto[] = [
  {
    id: 'hq',
    type: 'hq',
    title: {
      zh: '台北總公司 (HQ)',
      en: 'Taipei Headquarters',
    },
    address: {
      label: {
        zh: '241 新北市新莊區福壽街 164 巷 17 號 1 樓',
        en: '1F., No. 17, Ln. 164, Fushou St., Xinzhuang Dist., New Taipei City 242, Taiwan',
      },
      // 模擬後端是用底線
      map_url: 'https://maps.google.com/?q=San+Ring+Tech',
      embed_code: 'https://www.google.com/maps/embed?...',
    },
    contact_info: {
      phones: ['(02) 2999-0707', '(02) 2999-0298'],
      fax: '(02) 2999-1755',
      email: 'gxunmail@yahoo.com.tw',
    },
  },
];
