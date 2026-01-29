import { Cctv } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingSpinner({
  className,
  size = 'md',
}: LoadingSpinnerProps) {
  // 定義尺寸映射
  const sizeClasses = {
    sm: { container: 'w-12 h-12', icon: 'w-5 h-5', border: 'border-2' },
    md: { container: 'w-16 h-16', icon: 'w-7 h-7', border: 'border-4' },
    lg: { container: 'w-24 h-24', icon: 'w-10 h-10', border: 'border-[5px]' },
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      {/* 1. 外圈：旋轉的圓環 */}
      <div
        className={cn(
          'animate-spin rounded-full border-primary/20 border-t-primary',
          currentSize.container,
          currentSize.border
        )}
      />

      {/* 2. 中間：CCTV Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Cctv
          className={cn(
            'text-primary/80 animate-pulse', // 加上呼吸效果更有質感
            currentSize.icon
          )}
        />
      </div>
    </div>
  );
}
