'use client';

import Link from 'next/link';
import { HeaderBrandProps } from '@/type'; // 直接引用定義好的 Props
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

export default function Brand({
  data,
  className,
  classNames,
  isShowCompanyName,
}: HeaderBrandProps) {
  const { t } = useTranslation();
  // 解構資料，讓程式碼更乾淨
  const { logo, title } = data;

  return (
    <Link
      href={logo.href} // 修正：讀取資料中的路徑，而不是寫死 '/'
      className={cn(
        // 基礎佈局
        'header__brand flex items-center gap-2',
        // 互動效果
        'select-none cursor-pointer transition-opacity hover:opacity-80',
        className
      )}
    >
      {/* 圖片區域 */}
      {logo.src ? (
        <img
          src={logo.src}
          alt={logo.alt}
          // h-8 w-auto 是控制 Logo 大小的關鍵，確保它不會變形
          className={cn('h-8 w-auto object-contain', classNames?.image)}
        />
      ) : (
        // 如果沒有圖片，顯示一個佔位方塊 (開發階段好用)
        <div className="h-8 w-8 bg-muted rounded-md flex items-center justify-center text-xs font-bold text-muted-foreground">
          {t('common.brand.logoPlaceholder')}
        </div>
      )}

      {/* 文字區域 */}
      {title && isShowCompanyName && (
        <span
          className={cn(
            'header__brand__title font-bold text-lg whitespace-nowrap',
            // RWD: 手機版通常只顯示 Logo，隱藏文字以節省空間 (可選)
            'hidden md:block',
            classNames?.title
          )}
        >
          {title}
        </span>
      )}
    </Link>
  );
}
