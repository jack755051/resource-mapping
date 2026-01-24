import { HeaderBrandData, HeaderSearch, HeaderUserNav } from '@/type';
import { useNavigation } from '@/hooks/useNavigation';

export function useHeader() {
  const { items: navigationItems } = useNavigation();
  /**
   * header brand
   */
  const headerBrand: HeaderBrandData = {
    logo: {
      href: '/',
      alt: 'San Ring Tech Logo',
      src: '', // 記得放一張圖片到 public/images 或是暫時留空
    },
    title: 'San Ring Tech.',
  };

  /**
   * header user nav
   */
  const headerUserNav: HeaderUserNav = {
    trigger: 'User',
    groups: [
      {
        menuTitle: 'Account',
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

  const headerSearch: HeaderSearch = {
    placeholder: 'Search...',
  };

  return {
    headerBrand,
    headerUserNav,
    headerSearch,
    headerNavigation: navigationItems,
  };
}
