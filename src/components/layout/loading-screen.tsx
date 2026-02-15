'use client';

import { LoadingSpinner } from './loading-spinner';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

interface LoadingScreenProps {
  className?: string;
  message?: string;
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingScreen({
  className,
  message,
  fullScreen = false,
  size = 'lg',
}: LoadingScreenProps) {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center bg-background gap-4',
        fullScreen ? 'min-h-screen w-full' : 'min-h-[400px] w-full',
        className
      )}
    >
      <LoadingSpinner size={size} />
      <p className="text-sm text-muted-foreground animate-pulse font-medium tracking-wide">
        {message || t('system.initializing')}
      </p>
    </div>
  );
}
