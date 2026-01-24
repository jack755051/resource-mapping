'use client';

import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            // 1. 初始狀態：稍微往下偏移 (y: 20) 且透明
            initial={{ opacity: 0, y: 20 }}
            // 2. 進場動畫：回到原位 (y: 0) 且顯現
            animate={{ opacity: 1, y: 0 }}
            // 3. (選用) 離場動畫：這裡設定通常在 page 切換時較難被觸發，
            // 但 template 重新掛載會觸發 initial -> animate
            transition={{ ease: 'easeInOut', duration: 0.5 }}
            className="w-full"
        >
            {children}
        </motion.div>
    );
}