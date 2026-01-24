'use client';

// type
import { FooterProps } from '@/type';

// components
import { generateFooterText } from '@/utils/footer-helper';
import { cn } from '@/lib/utils'; // 記得引入 cn

// hooks
import { useFooter } from '@/hooks/useFooter';


export default function Footer({
  className,
  classNames,
  data: overrideData, // 接收外部可能傳入的資料覆蓋
}: FooterProps) {
  const { footerText } = useFooter(overrideData);

  return (
    <footer
      className={cn(
        // 1. 基礎樣式
        "footer__wrapper w-full flex items-center justify-center py-4 text-sm text-gray-600",
        // 2. 外部傳入的 Slot 樣式
        classNames?.wrapper,
        // 3. 最外層的樣式
        className
      )}
    >
      <span className={cn("text-center", classNames?.text)}>
        {footerText}
      </span>
    </footer>
  );
}
