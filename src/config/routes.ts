import { AppRoute } from '@/type/route';

export const appRoutes: AppRoute[] = [
  {
    title: 'nav.home',
    href: '/',
    icon: 'home',
  },
  {
    title: 'nav.about',
    href: '/about',
    icon: 'info', // 建議換成 info 或 building
  },
  {
    title: 'nav.products.title',
    href: '/products',
    icon: 'camera', // Lucide 有 camera icon
    children: [
      {
        title: 'nav.products.cameras',
        href: '/products/cameras', // 攝影機 (槍型/球型/PTZ)
      },
      {
        title: 'nav.products.recorders',
        href: '/products/recorders', // 錄影主機 (NVR/DVR)
      },
      {
        title: 'nav.products.accessories',
        href: '/products/accessories', // 周邊 (線材/支架/硬碟)
      },
    ],
  },
  {
    title: 'nav.solutions.title', // 解決方案 (強調安裝服務與場景)
    href: '/solutions',
    icon: 'wrench', // 代表技術/安裝
    children: [
      {
        title: 'nav.solutions.home',
        href: '/solutions/residential', // 居家安全
      },
      {
        title: 'nav.solutions.business',
        href: '/solutions/business', // 商用監控
      },
      {
        title: 'nav.solutions.construction',
        href: '/solutions/construction', // 工地/案場規劃
      },
    ],
  },
  {
    title: 'nav.support', // 技術支援 (下載專區/常見問題) - 可選，看是否有資源維護
    href: '/support',
    icon: 'download',
  },
  // {
  //   title: 'nav.cases', // 實績案例 (非常重要！客戶要看走線漂不漂亮)
  //   href: '/cases',
  //   icon: 'images',
  // },
  {
    title: 'nav.contact', // 聯絡我們 (免費估價)
    href: '/contact',
    icon: 'phone',
  },
  // 隱藏路由
  {
    title: 'nav.fileDownload', // 下載專區
    href: '/fileDownload',
    icon: 'download',
    hideInMenu: true,
  },
];
