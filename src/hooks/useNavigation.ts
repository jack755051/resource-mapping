import { useMemo } from 'react';
import { HeaderNavigationItem } from '@/type';
import { appRoutes } from '@/config/routes';

export function useNavigation() {
  const navigationItems = useMemo(
    () => appRoutes.filter(route => !route.hideInMenu),
    []
  );

  return {
    items: navigationItems,
  };
}
