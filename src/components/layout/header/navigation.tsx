'use client';

import { usePathname } from 'next/navigation';
import { HeaderNavigationProps } from '@/type';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';
// 1. 引入 motion
import { motion } from 'framer-motion';

export default function Navigation({
  className,
  classNames,
  items,
}: HeaderNavigationProps) {
  const { t } = useTranslation();
  const pathname = usePathname();

  return (
    <nav className={cn('header__navigation', classNames?.container, className)}>
      <ul className={cn('header__navigation__list flex gap-4', classNames?.list)}>
        {items.map((item) => {
          // 判斷是否啟用
          const isActive =
            item.href === '/'
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <li
              key={item.href}
              className={cn(
                'header__navigation__list__item relative px-3 py-1.5', // 增加 padding 給背景色塊空間
                classNames?.item
              )}
            >
              {/* 2. 背景滑動色塊 (Magic Motion) */}
              {/* 只有在 isActive 時才渲染這個 motion.span */}
              {isActive && (
                <motion.span
                  layoutId="navbar-active"
                  className={cn(
                    // 1. 不填滿，只留在底部 (bottom-0)
                    "absolute bottom-0 left-0 right-0 -z-10",
                    // 2. 高度設為 2px
                    "h-[2px]",
                    // 3. 實心顏色 + 光暈
                    "bg-primary shadow-[0_0_8px_rgba(var(--primary),0.6)]",
                    classNames?.active
                  )}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 35,
                    bounce: 0
                  }}
                />
              )}

              <Link
                href={item.href}
                className={cn(
                  'header__navigation__list__item__link transition-colors relative z-10', // z-10 確保文字在背景之上
                  'hover:text-primary',
                  classNames?.link,
                  // 3. 文字顏色變化
                  isActive ? 'text-primary font-medium' : 'text-muted-foreground'
                )}
              >
                {t(item.title)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}