import { LanguageCode } from "./i18n";

// 定義翻譯的結構
type Dictionary = Record<string, string>;

export const dictionaries: Record<LanguageCode, Dictionary> = {
    zh: {
        'nav.home': '首頁',
        'nav.about': '關於我們',

        // 產品
        'nav.products.title': '監控產品',
        'nav.products.cameras': '監視攝影機',
        'nav.products.recorders': '錄影主機',
        'nav.products.accessories': '周邊配件',

        // 解決方案 (服務)
        'nav.solutions.title': '專業服務', // 或 "解決方案"
        'nav.solutions.home': '居家防護',
        'nav.solutions.business': '商務監控',
        'nav.solutions.construction': '弱電工程規劃',

        // 其他
        'nav.cases': '安裝實績', // 業界常用詞
        'nav.contact': '聯絡我們',
        'nav.privacy': '隱私權政策',
        'nav.support': '技術支援',
    },
    en: {
        'nav.home': 'Home',
        'nav.about': 'About Us',

        // Products
        'nav.products.title': 'Products',
        'nav.products.cameras': 'Cameras',
        'nav.products.recorders': 'Recorders',
        'nav.products.accessories': 'Accessories',

        // Solutions
        'nav.solutions.title': 'Solutions',
        'nav.solutions.home': 'Residential',
        'nav.solutions.business': 'Commercial',
        'nav.solutions.construction': 'Engineering',

        // Others
        'nav.cases': 'Case Studies', // 或 Portfolio
        'nav.contact': 'Contact Us',
        'nav.privacy': 'Privacy Policy',
        'nav.support': 'Support',
    },
};