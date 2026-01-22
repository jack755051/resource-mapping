'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { HeaderNavigationItem } from '@/type';

interface HeaderNavigationClasses {
  container?: string; // 最外層 nav
  list?: string;      // ul
  item?: string;      // li
  link?: string;      // a (Link)
};

export interface HeaderNavigationProps {
  className?: string;
  classNames?: HeaderNavigationClasses;
  items: HeaderNavigationItem[];
};

export default function HeaderNavigation({
  className,
  classNames,
  items,
}: HeaderNavigationProps) {
  return (
    <nav className={cn('header__navigation', classNames?.container, className)}>
      <ul className={cn('header__navigation__list flex gap-4', classNames?.list)}>
        {items.map(item => (
          <li
            key={item.href}
            className={cn('header__navigation__list__item', classNames?.item)}
          >
            <Link
              href={item.href}
              className={cn(
                'header__navigation__list__item__link hover:text-primary transition-colors',
                classNames?.link
              )}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
