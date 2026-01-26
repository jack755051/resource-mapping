import { OfficeLocation } from '@/type/page/contact';

export const MOCK_LOCATIONS: OfficeLocation[] = [
    {
        id: 'hq',
        type: 'hq',
        title: {
            zh: '台北總公司 (HQ)',
            en: 'Taipei Headquarters'
        },
        address: {
            label: {
                zh: '241 新北市新莊區福壽街 164 巷 17 號 1 樓',
                en: '1F., No. 17, Ln. 164, Fushou St., Xinzhuang Dist., New Taipei City 242, Taiwan'
            },
            mapLink: 'https://maps.google.com/?q=San+Ring+Tech',
            embedSrc: 'https://www.google.com/maps/embed?...',
        },
        contact: {
            phones: ['(02) 2999-0707', '(02) 2999-0298'],
            fax: '(02) 2999-1755',
            email: 'gxunmail@yahoo.com.tw',
        },
    },
];