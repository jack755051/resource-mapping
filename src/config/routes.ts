import { AppRoute } from '@/type/route';

export const appRoutes: AppRoute[] = [
    {
        title: '首頁',
        href: '/',
        icon: 'home',
    },
    {
        title: '資源地圖',
        href: '/map',
        icon: 'map',
        children: [
            {
                title: '醫院查詢',
                href: '/map/hospitals',
            },
            {
                title: '診所查詢',
                href: '/map/clinics',
            }
        ]
    },
    {
        title: '隱私權政策',
        href: '/privacy',
        hideInMenu: true
    }
]