/**
 * 路由映射表 (Route Mapping)
 * ------------------------------------------------------------------
 * 用途：
 * 主要用於 Breadcrumb (麵包屑) 組件。
 * 當程式讀取到網址的某一段 (Slug) 時，透過此表查找對應的 i18n 翻譯 Key。
 *
 * 規則：
 * Key: URL 的 slug (例如 'about', 'cameras')
 * Value: dictionaries.ts 裡面的 key (例如 'nav.about', 'nav.products.cameras')
 */

export const routeMapping: Record<string, string> = {
  // === 第一層頁面 (對應 routes.ts 的根目錄) ===
  about: 'nav.about',
  products: 'nav.products.title',
  solutions: 'nav.solutions.title',
  cases: 'nav.cases',
  contact: 'nav.contact',
  support: 'nav.support', // 雖然目前隱藏，但建議先寫好

  // === 底部功能頁面 (對應 dictionaries.ts 但不在 Main Nav) ===
  privacy: 'nav.privacy',
  terms: 'nav.terms',

  // === 第二層：產品子頁面 (Products Children) ===
  // 網址: /products/cameras -> slug: cameras
  cameras: 'nav.products.cameras',
  recorders: 'nav.products.recorders',
  accessories: 'nav.products.accessories',

  // === 第二層：解決方案子頁面 (Solutions Children) ===
  // 網址: /solutions/residential -> slug: residential
  residential: 'nav.solutions.home',
  business: 'nav.solutions.business',
  construction: 'nav.solutions.construction',
};
