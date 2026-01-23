'use client';

import { FooterProps as BaseFooterProps } from '../../type';
import { generateFooterText } from '@/utils/footer-helper';
import { cn } from '@/lib/utils'; // 記得引入 cn

// 1. 定義 Slot ClassNames
export interface FooterClasses {
  wrapper?: string; // 最外層
  text?: string;    // 文字內容
}

// 2. 擴充 Props
// 假設 BaseFooterProps 只有 startYear 等資料欄位
export interface FooterProps extends BaseFooterProps {
  className?: string; // 為了方便，保留最外層的快速設定
  classNames?: FooterClasses;
}

export default function Footer({
  className,
  classNames,
  ...props // 其餘資料 props (startYear, etc.)
}: FooterProps) {

  const footerText = generateFooterText(props);

  return (
    <footer
      className={cn(
        // 預設樣式
        "footer__wrapper w-full flex items-center justify-center py-4 text-sm text-gray-600",
        // 傳入的樣式
        classNames?.wrapper,
        className
      )}
    >
      <span className={cn("text-center", classNames?.text)}>
        {footerText}
      </span>
    </footer>
  );
}