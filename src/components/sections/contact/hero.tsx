'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

export function ContactHero() {
  const { t } = useTranslation();

  return (
    <div className="relative bg-muted/20 border-b border-border/40 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] opacity-5" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />

      <div className="section-container section-y relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-wider uppercase mb-6">
            {t('contact.hero.badge')}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
            {t('contact.hero.title')}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            {t('contact.hero.desc.line1')}
            <br className="hidden md:block" />
            {t('contact.hero.desc.line2')}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
