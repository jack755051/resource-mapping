import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ToolbarProps {
  children?: ReactNode; // 接受任何內容
  className?: string;
}

export default function Toolbar({ children, className }: ToolbarProps) {
  return (
    <div
      className={cn(
        'header__toolbar__wrapper flex items-center gap-2',
        className
      )}
    >
      {children}
    </div>
  );
}
