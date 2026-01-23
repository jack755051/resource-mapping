import { HeaderBrand, HeaderUserNav } from '@/type';

export function useHeader() {
  // 組件資料

  /**
   * header brand
   */
  const headerBrand: HeaderBrand = {
    logo: {
      href: '/',
      alt: 'Logo',
      src: '/logo.png',
    },
    title: 'Header',
  };

  /**
   * header user nav
   */
  const headerUserNav: HeaderUserNav = {
    trigger: 'User',
    groups: [
      {
        menuTitle: 'User',
        menuItems: [
          {
            icon: 'user',
            label: 'User',
            shortcut: 'Ctrl + U',
          },
        ],
      },
    ],
  };

  return {
    headerBrand,
    headerUserNav,
  };
}
