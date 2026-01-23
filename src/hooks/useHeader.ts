import { HeaderBrand, HeaderSearch, HeaderUserNav } from '@/type';

export function useHeader() {
    // 組件資料

    /**
     * header brand
     */
    const headerBrand: HeaderBrand = {
        logo: {
            href: '/',
            alt: 'Logo',
            src: '',
        },
        title: 'Title',
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

    const headerSearch: HeaderSearch = {
        placeholder: 'Search...',
    };

    return {
        headerBrand,
        headerUserNav,
        headerSearch,
    };
}
