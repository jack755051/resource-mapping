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
      <ul
        className={cn('header__navigation__list flex gap-4', classNames?.list)}
      >
        {items.map(item => {
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
                  // 🔴 關鍵修改 1：讓 layoutId 變為唯一值 (加上 item.href)
                  // 這樣 Framer 就不會試圖從上一頁的位置「滑」過來，而是視為新元素
                  layoutId={`navbar-active-${item.href}`}
                  // 🟢 關鍵修改 2：加入進場動畫 (原地淡入 + 微放大)
                  // 這樣即使沒有滑動，看起來也很有科技感，像是指示燈亮起
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  // 離場動畫 (選用)
                  exit={{ opacity: 0, scale: 0.8 }}
                  className={cn(
                    'absolute inset-0 -z-10 rounded-sm',
                    'bg-primary/10 border border-primary/20',
                    'shadow-[0_0_8px_rgba(59,130,246,0.15)]',
                    classNames?.active
                  )}
                  transition={{
                    type: 'spring',
                    stiffness: 350,
                    damping: 30,
                    bounce: 0,
                    duration: 0.2, // 進場速度稍微快一點
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
                  isActive
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground'
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
