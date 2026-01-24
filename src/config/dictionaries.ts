import { LanguageCode } from './i18n';

// 定義翻譯的結構
type Dictionary = Record<string, string>;

export const dictionaries: Record<LanguageCode, Dictionary> = {
  zh: {
    // --- Navigation: 一般頁面 ---
    'nav.home': '首頁',
    'nav.about': '關於我們',
    'nav.contact': '聯絡我們',
    'nav.privacy': '隱私權政策',
    'nav.terms': '服務條款', // 預留

    // --- Navigation: 產品中心 ---
    'nav.products.title': '監控產品',
    'nav.products.cameras': '監視攝影機',
    'nav.products.recorders': '錄影主機',
    'nav.products.accessories': '周邊配件',

    // --- Navigation: 解決方案 (服務) ---
    'nav.solutions.title': '專業服務',
    'nav.solutions.home': '居家防護',
    'nav.solutions.business': '商務監控',
    'nav.solutions.construction': '弱電工程規劃',

    // --- Navigation: 資源與實績 ---
    'nav.cases': '安裝實績',
    'nav.support': '技術支援',

    // --- Components: Search (搜尋) ---
    'nav.search.placeholder': '請輸入關鍵字...',
    'nav.search.button': '搜尋', // 預留按鈕文字

    // --- Components: Footer (頁尾) ---
    'footer.rights': '版權所有。',
    'footer.company': 'San Ring Tech.',
  },
  en: {
    // --- Navigation: General ---
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.contact': 'Contact Us',
    'nav.privacy': 'Privacy Policy',
    'nav.terms': 'Terms of Service',

    // --- Navigation: Products ---
    'nav.products.title': 'Products',
    'nav.products.cameras': 'Cameras',
    'nav.products.recorders': 'Recorders',
    'nav.products.accessories': 'Accessories',

    // --- Navigation: Solutions ---
    'nav.solutions.title': 'Solutions',
    'nav.solutions.home': 'Residential',
    'nav.solutions.business': 'Commercial',
    'nav.solutions.construction': 'Engineering',

    // --- Navigation: Resources & Cases ---
    'nav.cases': 'Case Studies',
    'nav.support': 'Support',

    // --- Components: Search ---
    'nav.search.placeholder': 'Search...',
    'nav.search.button': 'Search',

    // --- Components: Footer ---
    'footer.rights': 'All rights reserved.',
    'footer.company': 'San Ring Tech.',
  },
};