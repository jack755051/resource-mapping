import { LanguageCode } from './i18n';

// 定義翻譯的結構
type Dictionary = Record<string, string>;

export const dictionaries: Record<LanguageCode, Dictionary> = {
  zh: {
    // =================================================================
    // Global Navigation & Footer (原有部分)
    // =================================================================
    'nav.home': '首頁',
    'nav.about': '關於我們',
    'nav.contact': '聯絡我們',
    'nav.privacy': '隱私權政策',
    'nav.terms': '服務條款',
    'nav.products.title': '監控產品',
    'nav.products.cameras': '監視攝影機',
    'nav.products.recorders': '錄影主機',
    'nav.products.accessories': '周邊配件',
    'nav.solutions.title': '專業服務',
    'nav.solutions.home': '居家防護',
    'nav.solutions.business': '商務監控',
    'nav.solutions.construction': '弱電工程規劃',
    'nav.cases': '安裝實績',
    'nav.support': '技術支援',
    'nav.search.placeholder': '請輸入關鍵字...',
    'nav.search.button': '搜尋',
    'footer.rights': '版權所有。',
    'footer.company': 'San Ring Tech.',

    // =================================================================
    // Home Page: Section A - Hero (首頁主視覺)
    // =================================================================
    'home.hero.badge': '工業級安防標準',
    'home.hero.title.prefix': '看得見，',
    'home.hero.title.highlight': '才能守住底線。',
    'home.hero.subtitle':
      '安全不該只是被動紀錄，而是主動防禦。從產線細節到園區死角，我們用工業級視野，將風險阻絕於發生之前。',
    'home.hero.cta.business': '企業諮詢',
    'home.hero.cta.special': '查看特殊方案',

    // =================================================================
    // Home Page: Section B - Client Types (客戶類型)
    // =================================================================
    'home.clients.label': '備受行業與專家信賴',
    'home.clients.factory.title': '工廠與製造業',
    'home.clients.factory.desc':
      '監控生產流程、預防意外，並透過 24/7 耐用設備保全庫存。',
    'home.clients.retail.title': '零售與商業空間',
    'home.clients.retail.desc':
      '發生糾紛即時釐清，並透過單一裝置管理多個分店。',
    'home.clients.special.title': '特殊場域工程',
    'home.clients.special.desc':
      '水下攝影、高速球型攝影機，針對嚴苛環境的高速捕捉方案。',

    // =================================================================
    // Home Page: Section C - Capabilities (核心優勢)
    // =================================================================
    'home.capabilities.title': '為什麼選擇我們？',
    'home.capabilities.subtitle': '我們不只賣監視器，我們提供完整的視覺策略。',

    // Visual Management (Boss)
    'home.capabilities.visual.title': '視覺化管理系統',
    'home.capabilities.visual.desc':
      '將「我不知道」轉變為「讓我們確認」。這套系統讓您能管理人員效率並即時解決糾紛。這不只是安防，更是您的營運槓桿。',

    // Extreme Tech (Special)
    'home.capabilities.extreme.title': '超越極限',
    'home.capabilities.extreme.desc':
      'IP68 防水與高速球機。我們能看見別人看不見的細節。',

    // Installation (Pain Point)
    'home.capabilities.install.title': '專業施工',
    'home.capabilities.install.desc':
      '拒絕雜亂線路。我們引以為傲的是美觀、工業級的佈線品質。',

    // Home (Family)
    'home.capabilities.home.tag': '居家方案',
    'home.capabilities.home.title': '企業級的居家防護',
    'home.capabilities.home.desc':
      '用工廠級的技術保護您的家人。穩定、安全，時刻連接您最珍視的一切。',

    // =================================================================
    // Home Page: Section D - CTA (行動呼籲)
    // =================================================================
    'home.cta.title': '別讓「未知」成為成本',
    'home.cta.subtitle': '立即為您的設施或特殊專案預約專業場勘。',
    'home.cta.button': '預約免費場勘',
  },

  en: {
    // =================================================================
    // Global Navigation & Footer
    // =================================================================
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.contact': 'Contact Us',
    'nav.privacy': 'Privacy Policy',
    'nav.terms': 'Terms of Service',
    'nav.products.title': 'Products',
    'nav.products.cameras': 'Cameras',
    'nav.products.recorders': 'Recorders',
    'nav.products.accessories': 'Accessories',
    'nav.solutions.title': 'Solutions',
    'nav.solutions.home': 'Residential',
    'nav.solutions.business': 'Commercial',
    'nav.solutions.construction': 'Engineering',
    'nav.cases': 'Case Studies',
    'nav.support': 'Support',
    'nav.search.placeholder': 'Search...',
    'nav.search.button': 'Search',
    'footer.rights': 'All rights reserved.',
    'footer.company': 'San Ring Tech.',

    // =================================================================
    // Home Page: Section A - Hero
    // =================================================================
    'home.hero.badge': 'Industrial Grade Security',
    'home.hero.title.prefix': 'Only Visibility Can',
    'home.hero.title.highlight': 'Secure the Bottom Line.',
    'home.hero.subtitle':
      'Security requires active defense, not just passive recording. From production details to perimeter blind spots, we use industrial-grade vision to preempt risks before they occur.',
    'home.hero.cta.business': 'Consult for Business',
    'home.hero.cta.special': 'See Special Solutions',

    // =================================================================
    // Home Page: Section B - Client Types
    // =================================================================
    'home.clients.label': 'Trusted by Industries & Professionals',
    'home.clients.factory.title': 'Industrial & Factory',
    'home.clients.factory.desc':
      'Monitor production flow, prevent accidents, and secure inventory with 24/7 durability.',
    'home.clients.retail.title': 'Retail & Commercial',
    'home.clients.retail.desc':
      'Resolve disputes instantly and manage multiple store locations from a single device.',
    'home.clients.special.title': 'Specialized Fields',
    'home.clients.special.desc':
      'Underwater cams, Speed Domes, and High-Speed capture for challenging environments.',

    // =================================================================
    // Home Page: Section C - Capabilities
    // =================================================================
    'home.capabilities.title': 'Why Choose Us?',
    'home.capabilities.subtitle':
      "We don't just sell cameras. We provide a complete visual strategy.",

    // Visual Management
    'home.capabilities.visual.title': 'Visual Management System',
    'home.capabilities.visual.desc':
      'Turn "I don\'t know" into "Let\'s verify." Our system gives you the power to manage personnel efficiency and resolve disputes instantly. It\'s not just security; it\'s your operational leverage.',

    // Extreme Tech
    'home.capabilities.extreme.title': 'Beyond Limits',
    'home.capabilities.extreme.desc':
      "Waterproof (IP68) & High-Speed Domes. We see what others can't.",

    // Installation
    'home.capabilities.install.title': 'Pro Installation',
    'home.capabilities.install.desc':
      'No messy wires. We pride ourselves on aesthetic, industrial-grade cabling.',

    // Home
    'home.capabilities.home.tag': 'Residential',
    'home.capabilities.home.title': 'Enterprise Grade for Home',
    'home.capabilities.home.desc':
      'Protect your family with the same technology used by factories. Stable, secure, and always connected to what matters most.',

    // =================================================================
    // Home Page: Section D - CTA
    // =================================================================
    'home.cta.title': 'Don\'t let "Unknown" be a cost.',
    'home.cta.subtitle':
      'Get a professional site assessment for your facility or specialized project today.',
    'home.cta.button': 'Book a Site Visit',
  },
};
