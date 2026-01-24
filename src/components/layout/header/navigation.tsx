'use client';

// 1. 引入剛剛定義好的 Type
import { HeaderNavigationProps } from '@/type';

// components
import Link from 'next/link';
import { cn } from '@/lib/utils';
// hooks
import { useTranslation } from '@/hooks/useTranslation';

// 2. 移除原本在這裡定義的 Interface (保持檔案乾淨)

export default function Navigation({
  className,
  classNames,
  items,
}: HeaderNavigationProps) {
  // 3. 使用統一的 Props 定義

  const { t } = useTranslation();

  return (
    <nav className={cn('header__navigation', classNames?.container, className)}>
      <ul
        className={cn('header__navigation__list flex gap-4', classNames?.list)}
      >
        {items.map(item => (
          <li
            // 建議：如果有唯一 id 用 id，沒有的話 href 也行
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
              {t(item.title)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
