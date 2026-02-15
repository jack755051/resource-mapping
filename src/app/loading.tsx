'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

export default function Loading() {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden">
      {/* 1. 背景裝飾 (延續全站風格) */}
      <div className="absolute inset-0 z-0">
        {/* 微弱網格 */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* 四角鎖定框 (HUD Corners) */}
        <div className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-primary/20"></div>
        <div className="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-primary/20"></div>
        <div className="absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2 border-primary/20"></div>
        <div className="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-primary/20"></div>
      </div>

      {/* 2. 中央核心動畫 */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* 動畫圖形區 */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* 外圈 1: 慢速旋轉的虛線圈 */}
          <motion.div
            className="absolute inset-0 rounded-full border border-dashed border-primary/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />

          {/* 外圈 2: 反向旋轉的刻度圈 */}
          <motion.div
            className="absolute inset-2 rounded-full border-2 border-t-primary/50 border-r-transparent border-b-primary/50 border-l-transparent"
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />

          {/* 內圈: 脈衝光暈 */}
          <motion.div
            className="absolute inset-8 rounded-full bg-primary/20 blur-md"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* 核心點: 實心圓點 */}
          <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.8)]" />
        </div>

        {/* 3. 文字數據區 */}
        <div className="text-center space-y-2">
          <motion.h2
            className="text-lg font-bold tracking-[0.2em] text-foreground uppercase"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {t('system.loading.title')}
          </motion.h2>

          <div className="flex flex-col items-center gap-1">
            <p className="font-mono text-[10px] text-primary/60 tracking-widest uppercase">
              {t('system.loading.subtitle')}
            </p>

            {/* 假進度條裝飾 */}
            <div className="w-32 h-1 bg-muted rounded-full overflow-hidden mt-2">
              <motion.div
                className="h-full bg-primary"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 底部版權/系統字樣 */}
      <div className="absolute bottom-8 font-mono text-[10px] text-muted-foreground/30 tracking-widest uppercase">
        {t('system.loading.version')} // v2.0
      </div>
    </div>
  );
}
