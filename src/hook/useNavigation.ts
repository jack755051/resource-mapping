import { usePathname } from 'next/navigation';
import { HeaderNavigationItem } from '@/type';

export function useNavigation() {
  const items: HeaderNavigationItem[] = [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'Contact',
      href: '/contact',
    },
  ];

  return {
    items,
  };
}
