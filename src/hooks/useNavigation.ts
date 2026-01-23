import { usePathname } from 'next/navigation';
import { HeaderNavigationItem } from '@/type';
import { appRoutes } from '@/config/routes';

export function useNavigation() {

    const pathname = usePathname();

    const navigationItems = appRoutes.filter(route => !route.hideInMenu);

    return {
        items: navigationItems,
    };
}
