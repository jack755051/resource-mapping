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
    'nav.products.title': '產品與服務',
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

    // =================================================================
    // About Page: Section 1 - Manifesto (企業宣言)
    // =================================================================
    'about.manifesto.est': 'EST. 2004',
    'about.manifesto.title.prefix': '我們不只是製造監控器材，',
    'about.manifesto.title.middle': '我們是在製造',
    'about.manifesto.title.highlight': '信任',
    'about.manifesto.desc.p1': '光訊科技（San Ring Tech）於監控領域已有 20 年經驗。在這個快速迭代的科技業，20 年代表的不是陳舊，而是對品質近乎偏執的堅持。',
    'about.manifesto.desc.p2': '從早期的 CCTV 生產，到如今佈局車牌辨識與深海監控，我們始終相信：',
    'about.manifesto.desc.highlight': '僅有不斷的研發與創新，才能呈現高實用性與高質量的商品。',

    // =================================================================
    // About Page: Section 2 - Image Grid (硬體實力)
    // =================================================================
    // Box 1: Integration Center
    'about.grid.integration.badge': '技術整合中心',
    'about.grid.integration.title': '嚴選國際級硬體標準',
    'about.grid.integration.desc': '我們不生產晶片，我們負責篩選最強悍的設備。匯集國際一線大廠硬體資源，經過我們內部的相容性測試與韌體優化，確保交到您手中的，是能適應台灣在地環境的穩定系統。',

    // Box 2: Special Field
    'about.grid.special.badge': '特殊場域實戰',
    'about.grid.special.title': '極限環境部署',
    'about.grid.special.desc': '水下、高溫、高腐蝕抗性測試',

    // Box 3: QC
    'about.grid.qc.badge': '出貨壓力測試',
    'about.grid.qc.title': '品質控管',
    'about.grid.qc.desc': '拒絕新品不良，確保系統穩定運行',

    // =================================================================
    // About Page: Section 3 - Pillars (核心價值)
    // =================================================================
    // Professional
    'about.pillars.pro.title': '專業 Professional',
    'about.pillars.pro.desc': '主要致力於 CCTV 監控攝影機之生產製造。我們擁有專業的研發人員負責，致力開發高品質、多功能攝影機。對於每樣產品出貨，光訊提供最高級別的把關。',

    // Innovation
    'about.pillars.inn.title': '創新 Innovation',
    'about.pillars.inn.desc.prefix': '近年光訊佈局多領域系列監控設備，如：',
    'about.pillars.inn.desc.highlight': '車牌辨識、水下攝影機、高速球攝影機',
    'about.pillars.inn.desc.suffix': '系列。我們堅信僅有不斷的研發，才能滿足現代化場域的嚴苛需求。',

    // Service
    'about.pillars.srv.title': '服務 Service',
    'about.pillars.srv.desc': '光訊傾聽每位顧客的需求。我們不只賣產品，更提供相應的優質售後服務。力求落實專業服務，以提高對每位顧客的服務品質。',

    // =================================================================
    // About Page: Section 4 - Timeline (發展歷程)
    // =================================================================
    'about.timeline.header.title': '持續領先業界，並永續發展。',
    'about.timeline.header.desc': '二十年的足跡，見證了我們從傳統類比監控，走向 AI 智能與特殊場域應用的歷程。',
    'about.timeline.header.cta': '聯繫我們',

    // Node 1: 2004
    'about.timeline.2004.year': '2004',
    'about.timeline.2004.label': 'Foundation',
    'about.timeline.2004.title': '專注製造',
    'about.timeline.2004.desc': '成立初期致力於高品質 CCTV 生產與代工，建立紮實的光學基礎，成為多家國際品牌指定合作夥伴。',

    // Node 2: 2015
    'about.timeline.2015.year': '2015',
    'about.timeline.2015.label': 'Expansion',
    'about.timeline.2015.title': '特殊領域佈局',
    'about.timeline.2015.desc': '突破一般監控環境限制，成功開發水下攝影機與高速球技術，應用於水利工程與高腐蝕場域。',

    // Node 3: 2022
    'about.timeline.2022.year': '2022',
    'about.timeline.2022.label': 'Integration',
    'about.timeline.2022.title': '智慧化整合',
    'about.timeline.2022.desc': '全面導入車牌辨識與 AI 影像分析系統，從單純的「看得見」進化為「看得懂」的智慧安防。',

    // Node 4: Future
    'about.timeline.future.year': 'Future',
    'about.timeline.future.label': 'Vision',
    'about.timeline.future.title': '視覺管理夥伴',
    'about.timeline.future.desc': '不僅是設備供應商，更是企業資產管理的策略夥伴。我們將持續探索 AIoT 與雲端管理的無限可能。',

    // =================================================================
    // Products Page: Hero Section (產品頁主視覺)
    // =================================================================
    'products.hero.badge': 'San Ring Tech', // 品牌名通常不翻，但保留彈性
    'products.hero.title.prefix': '視野，',
    'products.hero.title.suffix': '重新定義。',
    // 如果您中文版想保留英文標題 "Vision Redefined."，請將上面兩行改成英文即可

    'products.hero.desc.main': '從深海作業到智慧城市，我們提供全方位的視覺解決方案。',
    'products.hero.desc.highlight': '嚴選硬體，在地化深度整合。',

    // AI Floating Card
    'products.hero.ai.tag': 'AI',
    'products.hero.ai.title': '智慧偵測',
    'products.hero.ai.accuracy': '99.9% 準確率',
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

    // =================================================================
    // About Page: Section 1 - Manifesto
    // =================================================================
    'about.manifesto.est': 'EST. 2004',
    'about.manifesto.title.prefix': 'We don’t just build surveillance gear,',
    'about.manifesto.title.middle': 'We build',
    'about.manifesto.title.highlight': 'Trust',
    'about.manifesto.desc.p1': 'San Ring Tech has over 20 years of experience in the surveillance industry. In this rapidly iterating tech world, 20 years signifies not obsolescence, but a paranoid persistence for quality.',
    'about.manifesto.desc.p2': 'From early CCTV production to today’s license plate recognition and deep-sea monitoring, we have always believed:',
    'about.manifesto.desc.highlight': 'Only continuous R&D and innovation can deliver products of high utility and quality.',

    // =================================================================
    // About Page: Section 2 - Image Grid
    // =================================================================
    // Box 1: Integration Center
    'about.grid.integration.badge': 'Integration Center',
    'about.grid.integration.title': 'Global Hardware Standards',
    'about.grid.integration.desc': 'We don’t make chips; we select the toughest equipment. By pooling resources from top-tier global manufacturers and optimizing them with our compatibility tests, we ensure the system in your hands is stable and adapted to local environments.',

    // Box 2: Special Field
    'about.grid.special.badge': 'Field Operations',
    'about.grid.special.title': 'Extreme Deployment',
    'about.grid.special.desc': 'Tested for underwater, high-heat, and corrosive environments.',

    // Box 3: QC
    'about.grid.qc.badge': 'Stress Testing',
    'about.grid.qc.title': 'Quality Control',
    'about.grid.qc.desc': 'Rejecting DOAs to ensure stable system operation.',

    // =================================================================
    // About Page: Section 3 - Pillars
    // =================================================================
    // Professional
    'about.pillars.pro.title': 'Professional',
    'about.pillars.pro.desc': 'Dedicated primarily to CCTV camera manufacturing. Our expert R&D team is committed to developing high-quality, multi-functional cameras. We provide the highest level of quality assurance for every product shipped.',

    // Innovation
    'about.pillars.inn.title': 'Innovation',
    'about.pillars.inn.desc.prefix': 'Recently, we have expanded into diverse monitoring fields, such as: ',
    'about.pillars.inn.desc.highlight': 'LPR, Underwater Cameras, and Speed Dome',
    'about.pillars.inn.desc.suffix': ' series. We believe that only continuous R&D can meet the rigorous demands of modern environments.',

    // Service
    'about.pillars.srv.title': 'Service',
    'about.pillars.srv.desc': 'We listen to every customer\'s needs. We don\'t just sell products; we provide corresponding premium after-sales service. We strive to implement professional service to enhance the quality of experience for every client.',

    // =================================================================
    // About Page: Section 4 - Timeline
    // =================================================================
    'about.timeline.header.title': 'Leading the industry, sustainably.',
    'about.timeline.header.desc': 'Twenty years of footprints witnessing our journey from traditional analog monitoring to AI intelligence and specialized field applications.',
    'about.timeline.header.cta': 'Contact Us',

    // Node 1: 2004
    'about.timeline.2004.year': '2004',
    'about.timeline.2004.label': 'Foundation',
    'about.timeline.2004.title': 'Manufacturing Focus',
    'about.timeline.2004.desc': 'Established with a focus on high-quality CCTV production and OEM, building a solid optical foundation and becoming a designated partner for international brands.',

    // Node 2: 2015
    'about.timeline.2015.year': '2015',
    'about.timeline.2015.label': 'Expansion',
    'about.timeline.2015.title': 'Specialized Fields',
    'about.timeline.2015.desc': 'Breaking through standard monitoring limitations by successfully developing underwater cameras and speed dome technology for hydraulic engineering and corrosive areas.',

    // Node 3: 2022
    'about.timeline.2022.year': '2022',
    'about.timeline.2022.label': 'Integration',
    'about.timeline.2022.title': 'Smart Integration',
    'about.timeline.2022.desc': 'Fully adopted License Plate Recognition and AI video analytics, evolving from simply "seeing" to "understanding" smart security.',

    // Node 4: Future
    'about.timeline.future.year': 'Future',
    'about.timeline.future.label': 'Vision',
    'about.timeline.future.title': 'Visual Partner',
    'about.timeline.future.desc': 'More than just a supplier, we are your strategic partner in asset management. We continue to explore the infinite possibilities of AIoT and cloud management.',

    // =================================================================
    // Products Page: Hero Section
    // =================================================================
    'products.hero.badge': 'San Ring Tech',
    'products.hero.title.prefix': 'Vision',
    'products.hero.title.suffix': 'Redefined.',

    'products.hero.desc.main': 'From deep-sea operations to smart cities, we provide comprehensive visual solutions.',
    'products.hero.desc.highlight': 'Premium hardware, deeply integrated locally.',

    // AI Floating Card
    'products.hero.ai.tag': 'AI',
    'products.hero.ai.title': 'Smart Detection',
    'products.hero.ai.accuracy': '99.9% Accuracy',
  },
};
