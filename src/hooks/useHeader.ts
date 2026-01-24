import {
  HeaderBrandData,
  HeaderSearch,
  HeaderSearchData,
  HeaderUserNav,
  HeaderUserNavData,
} from '@/type';
import { useNavigation } from '@/hooks/useNavigation';
import { useTranslation } from '@/hooks/useTranslation';

export function useHeader() {
  const { items: navigationItems } = useNavigation();
  const { t } = useTranslation();

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
  const headerUserNav: HeaderUserNavData = { // 使用新 Type
    trigger: 'User', // 或是 { src: '...', ... }
    groups: [
      {
        menuTitle: 'Account',
        menuItems: [
          {
            icon: 'user',
            label: 'Profile',
            shortcut: '⇧⌘P',
          },
          {
            icon: 'settings',
            label: 'Settings',
            children: [ // 測試遞迴結構
              { label: 'Display', icon: 'monitor' },
              { label: 'Security', icon: 'lock' }
            ]
          },
        ],
      },
      {
        menuItems: [
          { label: 'Logout', icon: 'log-out', onClick: () => console.log('logout') }
        ]
      }
    ],
  };

  /**
   * header search
   */
  const headerSearch: HeaderSearchData = {
    placeholder: t('nav.search.placeholder', { defaultValue: 'Search...' }),
    disabled: false,
    // defaultValue: '預設值' // 如果需要
  };

  return {
    headerBrand,
    headerUserNav,
    headerSearch,
    headerNavigation: navigationItems,
  };
}
