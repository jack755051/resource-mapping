'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import type { SendSuccessProps } from '@/type/page/contact';

export function SendSuccess({
  props,
  className,
  classNames,
}: SendSuccessProps) {
  const { t } = useTranslation();

  // 從 props 解構資料，同時處理 props 可能為 null 的情況 (雖然通常會有 onReset)
  const { onReset, title, desc, resetText } = props || {};

  // 如果沒有傳入 onReset，這個組件無法運作 (或者可以隱藏按鈕)
  if (!onReset) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        'p-8 rounded-3xl bg-accent-green/10 border border-accent-green/20 text-center space-y-4',
        className,
        classNames?.container
      )}
    >
      {/* Icon 區塊 */}
      <div
        className={cn(
          'w-16 h-16 bg-accent-green/15 text-accent-green rounded-full flex items-center justify-center mx-auto',
          classNames?.iconWrapper
        )}
      >
        <CheckCircle2 className={cn('w-8 h-8', classNames?.icon)} />
      </div>

      {/* 標題：優先使用傳入的 title，沒有則用翻譯檔 */}
      <h3
        className={cn(
          'text-xl font-bold text-accent-green',
          classNames?.title
        )}
      >
        {title || t('contact.success.title')}
      </h3>

      {/* 描述 */}
      <p
        className={cn(
          'text-accent-green/80 leading-relaxed',
          classNames?.description
        )}
      >
        {desc || t('contact.success.desc')}
      </p>

      {/* 重置按鈕 */}
      <Button
        variant="outline"
        onClick={onReset}
        className={cn(
          'mt-2 border-accent-green/30 text-accent-green hover:bg-accent-green/10 hover:text-accent-green',
          classNames?.button
        )}
      >
        {resetText || t('contact.success.reset')}
      </Button>
    </motion.div>
  );
}
