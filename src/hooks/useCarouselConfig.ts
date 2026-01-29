// hooks/useCarouselConfig.ts
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';

// 定義常數
const AUTOPLAY_DELAY_MS = 4000; // 停留時間 (4秒)
const STOP_ON_INTERACTION = false; // 互動後是否"永久"停止 (設為 false 代表滑鼠移開後會繼續)
const STOP_ON_MOUSE_ENTER = true; // 滑鼠移入是否暫停

export function useCarouselConfig() {
  // 使用 useRef 確保 plugin 實例在 render 間保持穩定
  const plugin = useRef(
    Autoplay({
      delay: AUTOPLAY_DELAY_MS,
      stopOnInteraction: STOP_ON_INTERACTION,
      stopOnMouseEnter: STOP_ON_MOUSE_ENTER,
    })
  );

  return {
    plugin: plugin.current,
    config: {
      align: 'start' as const,
      loop: true,
      axis: 'y' as const, // 關鍵：垂直方向
    },
  };
}
