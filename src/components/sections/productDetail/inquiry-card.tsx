'use client';

import { cn } from '@/lib/utils';
import { MessageCircleQuestion } from 'lucide-react'; // 引入一個適合的 icon
import { useTranslation } from '@/hooks/useTranslation';
import { ProductInquiryCardProps } from '@/type/page/proudct-detail';

export function ProductInquiryCard({
  className,
  classNames,
  props,
}: ProductInquiryCardProps) {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        'p-6 bg-muted/30 rounded-2xl border border-primary/10',
        className,
        classNames?.container
      )}
    >
      <h4 className={cn('font-bold mb-2 text-foreground', classNames?.title)}>
        {t('cta.interested.title')}
      </h4>

      <p
        className={cn(
          'text-sm text-muted-foreground mb-4 leading-relaxed',
          classNames?.description
        )}
      >
        {t('cta.interested.desc')}
      </p>

      <button
        onClick={props.onClickContact}
        className={cn(
          'w-full bg-primary text-primary-foreground h-12 rounded-full font-medium shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group',
          classNames?.button
        )}
      >
        {/* 加入 Icon 增加視覺引導 */}
        <MessageCircleQuestion className="w-4 h-4 transition-transform group-hover:scale-110" />
        <span>{t('cta.interested.button')}</span>
      </button>
    </div>
  );
}
