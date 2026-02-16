'use client';

import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

// hooks
import { useTranslation } from '@/hooks/useTranslation';

import { cn } from '@/lib/utils';
import { useContactForm } from '@/hooks/useContactForm';
import { SendSuccess } from './send-success';

interface ContactFormProps {
  inquiryTags: string[];
}

export function ContactForm({ inquiryTags }: ContactFormProps) {
  const { t } = useTranslation();

  // 🔥 使用 Custom Hook，一行搞定所有邏輯
  const {
    form,
    selectedTags,
    toggleTag,
    onSubmit,
    isSuccess,
    resetSuccess,
    handleClear,
  } = useContactForm();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <motion.div
      className="lg:col-span-7 space-y-8"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          {t('contact.form.title')}
        </h2>
        <p className="text-muted-foreground">{t('contact.form.desc')}</p>
      </div>

      {isSuccess ? (
        // 成功畫面
        <SendSuccess
          props={{
            onReset: resetSuccess,
          }}
        />
      ) : (
        // 表單畫面
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">{t('contact.form.label.name')}</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder={t('contact.form.placeholder.name')}
                className={cn(
                  'bg-muted/20 border-border/50 h-11 sm:h-12',
                  errors.name &&
                    'border-destructive focus-visible:ring-destructive'
                )}
              />
              {errors.name && (
                <span className="text-xs text-destructive">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{t('contact.form.label.phone')}</Label>
              <Input
                id="phone"
                {...register('phone')}
                placeholder={t('contact.form.placeholder.phone')}
                className={cn(
                  'bg-muted/20 border-border/50 h-11 sm:h-12',
                  errors.phone &&
                    'border-destructive focus-visible:ring-destructive'
                )}
              />
              {errors.phone && (
                <span className="text-xs text-destructive">
                  {errors.phone.message}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t('contact.form.label.email')}</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder={t('contact.form.placeholder.email')}
              className={cn(
                'bg-muted/20 border-border/50 h-11 sm:h-12',
                errors.email &&
                  'border-destructive focus-visible:ring-destructive'
              )}
            />
            {errors.email && (
              <span className="text-xs text-destructive">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label>{t('contact.form.label.type')}</Label>
            <div className="flex flex-wrap gap-2">
              {inquiryTags.map(tagKey => {
                const isSelected = selectedTags.includes(tagKey);
                return (
                  <button
                    type="button"
                    key={tagKey}
                    onClick={() => toggleTag(tagKey)}
                    className={cn(
                      'px-4 py-2 rounded-full border text-sm transition-all duration-200',
                      isSelected
                        ? 'bg-primary text-primary-foreground border-primary shadow-md'
                        : 'border-border/50 hover:border-primary hover:text-primary hover:bg-primary/5 bg-background'
                    )}
                  >
                    {t(`contact.form.tags.${tagKey}`)}
                  </button>
                );
              })}
            </div>
            {errors.type && (
              <span className="text-xs text-destructive">
                {errors.type.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{t('contact.form.label.message')}</Label>
            <Textarea
              id="message"
              {...register('message')}
              placeholder={t('contact.form.placeholder.message')}
              className={cn(
                'min-h-[150px] bg-muted/20 border-border/50 resize-none',
                errors.message &&
                  'border-destructive focus-visible:ring-destructive'
              )}
            />
            {errors.message && (
              <span className="text-xs text-destructive">
                {errors.message.message}
              </span>
            )}
          </div>

          {/* 按鈕行動列：調整為靠右對齊群組 */}
          <div className="flex flex-col-reverse md:flex-row md:justify-end md:items-center gap-4 pt-4">
            {/* 1. 清除按鈕：弱化為 Ghost 樣式 */}
            <Button
              type="button"
              variant="ghost"
              onClick={handleClear}
              disabled={isSubmitting}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              {t('contact.form.clear')}
            </Button>

            {/* 2. 送出按鈕：主要行動，移除 ml-auto */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                'h-12 px-8 rounded-full text-base font-medium transition-all shadow-lg',
                'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-primary/25 hover:-translate-y-0.5',
                'w-full md:w-auto'
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t('contact.form.submitting')}
                </>
              ) : (
                <>
                  {t('contact.form.submit')}
                  <Send className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </form>
      )}
    </motion.div>
  );
}
