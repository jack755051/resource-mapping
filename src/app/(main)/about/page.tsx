'use client';

import Image from 'next/image';

import {
  BadgeCheck,
  Microscope,
  Headset,
  ArrowRight,
  History,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* -----------------------------------------------------------------
          SECTION 1: THE MANIFESTO (純文字開場，強調沈穩與真實)
          差異點：這裡不放全版大圖，改用乾淨的排版，像雜誌一樣。
      ----------------------------------------------------------------- */}
      <section className="container mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm font-medium">
            <History className="w-4 h-4" />
            <span>EST. 2004</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.15] mb-8">
            我們不只是製造監控器材，
            <br />
            我們是在製造
            <span className="text-primary underline decoration-4 decoration-primary/20 underline-offset-4">
              信任
            </span>
            。
          </h1>

          <div className="flex flex-col md:flex-row gap-12 items-start border-l-2 border-primary/20 pl-8 md:pl-12">
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              光訊科技（San Ring Tech）於監控領域已有 20 年經驗。
              在這個快速迭代的科技業，20
              年代表的不是陳舊，而是對品質近乎偏執的堅持。
              <br />
              <br />
              從早期的 CCTV 生產，到如今佈局車牌辨識與深海監控， 我們始終相信：
              <strong>
                僅有不斷的研發與創新，才能呈現高實用性與高質量的商品。
              </strong>
            </p>
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------------
          SECTION 2: THE IMAGE GRID (硬體實力 / 測試與整合)
          修改重點：
          1. 玻璃擬態改為「底部滿版貼合」，不再懸浮。
          2. 使用 border-t (上邊框) 來區隔圖片與資訊區。
      ----------------------------------------------------------------- */}
      <section className="w-full border-y border-border/40 bg-muted/20">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">

            {/* 左側大圖 */}
            <div className="md:col-span-8 relative rounded-[2rem] overflow-hidden group min-h-[400px]">
              {/* 背景圖 */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />

              {/* 漸層遮罩 (讓文字區塊的背景融合得更自然) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

              {/* 毛玻璃資訊面板 (改為貼底滿版) */}
              <div className="absolute bottom-0 left-0 w-full p-8 border-t border-white/10 bg-black/40 backdrop-blur-md">
                <div className="flex flex-col items-start gap-3">
                  {/* Badge 標籤 */}
                  <span className="px-3 py-1 rounded-md text-xs font-bold bg-primary text-primary-foreground tracking-wider shadow-sm">
                    技術整合中心
                  </span>

                  <div className="space-y-2">
                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                      嚴選國際級硬體標準
                    </h3>
                    <p className="text-sm md:text-base text-gray-200 leading-relaxed max-w-3xl">
                      我們不生產晶片，我們負責篩選最強悍的設備。
                      匯集國際一線大廠硬體資源，經過我們內部的相容性測試與韌體優化，
                      確保交到您手中的，是能適應台灣在地環境的穩定系統。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 右側兩張圖 */}
            <div className="md:col-span-4 flex flex-col gap-6">

              {/* 右上：特殊場域 */}
              <div className="flex-1 relative rounded-[2rem] overflow-hidden group min-h-[250px]">
                <Image
                  src="/images/about_me-underwater_work.jpg"
                  alt="特殊場域實戰經驗"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-blue-950/30 mix-blend-multiply" />

                {/* 毛玻璃資訊面板 (改為貼底滿版) */}
                <div className="absolute bottom-0 left-0 w-full p-6 border-t border-white/10 bg-black/40 backdrop-blur-md">
                  <div className="flex flex-col items-start gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white tracking-wider shadow-sm">
                      特殊場域實戰
                    </span>
                    <div>
                      <h3 className="font-bold text-lg text-white">極限環境部署</h3>
                      <p className="text-xs text-gray-200 mt-0.5 hidden md:block">
                        水下、高溫、高腐蝕抗性測試
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 右下：壓力測試 */}
              <div className="flex-1 relative rounded-[2rem] overflow-hidden group min-h-[250px]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20" />

                {/* 毛玻璃資訊面板 (改為貼底滿版) */}
                <div className="absolute bottom-0 left-0 w-full p-6 border-t border-white/10 bg-black/40 backdrop-blur-md">
                  <div className="flex flex-col items-start gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-600 text-white tracking-wider shadow-sm">
                      出貨壓力測試
                    </span>
                    <div>
                      <h3 className="font-bold text-lg text-white">品質控管</h3>
                      <p className="text-xs text-gray-200 mt-0.5 hidden md:block">
                        拒絕新品不良，確保系統穩定運行
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------------
          SECTION 3: THREE PILLARS (專業 / 創新 / 服務)
          差異點：用更乾淨、結構化的方式呈現您的核心理念
      ----------------------------------------------------------------- */}
      <section className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Pillar 1: 專業 */}
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <BadgeCheck className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold">專業 Professional</h3>
            <p className="text-muted-foreground leading-relaxed">
              主要致力於 CCTV
              監控攝影機之生產製造。我們擁有專業的研發人員負責，致力開發高品質、多功能攝影機。對於每樣產品出貨，光訊提供最高級別的把關。
            </p>
          </div>

          {/* Pillar 2: 創新 */}
          <div className="space-y-4">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-xl flex items-center justify-center">
              <Microscope className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold">創新 Innovation</h3>
            <p className="text-muted-foreground leading-relaxed">
              近年光訊佈局多領域系列監控設備，如：
              <span className="font-semibold text-foreground">
                車牌辨識、水下攝影機、高速球攝影機
              </span>
              系列。我們堅信僅有不斷的研發，才能滿足現代化場域的嚴苛需求。
            </p>
          </div>

          {/* Pillar 3: 服務 */}
          <div className="space-y-4">
            <div className="w-12 h-12 bg-orange-500/10 text-orange-600 rounded-xl flex items-center justify-center">
              <Headset className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold">服務 Service</h3>
            <p className="text-muted-foreground leading-relaxed">
              光訊傾聽每位顧客的需求。我們不只賣產品，更提供相應的優質售後服務。力求落實專業服務，以提高對每位顧客的服務品質。
            </p>
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------------
    SECTION 4: EVOLUTION TIMELINE (修正版：垂直時間軸)
    設計重點：
    1. 加入明確的年份 (2004, 2015...) 強化時間感。
    2. 使用 border-l (左側線條) 串接所有節點。
    3. 最後一個節點 (Future) 保持 Highlight，但透過圓點動畫來強調。
----------------------------------------------------------------- */}
      <section className="border-t border-border/40 py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* 左側：標題區 (維持不變，作為引導) */}
            <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit">
              <h2 className="text-3xl font-bold mb-4 leading-tight">
                持續領先業界，
                <br />
                並永續發展。
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                二十年的足跡，見證了我們從傳統類比監控，走向 AI
                智能與特殊場域應用的歷程。
              </p>
              <button className="inline-flex items-center text-primary font-medium hover:underline group">
                聯繫我們
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* 右側：時間軸主體 */}
            <div className="lg:w-2/3 ml-4 lg:ml-0">
              <div className="relative border-l-2 border-border/60 space-y-12 pl-8 md:pl-12">
                {/* Node 1: 過去 (Foundation) */}
                <div className="relative">
                  {/* 時間軸圓點 */}
                  <span className="absolute -left-[41px] md:-left-[57px] top-1 flex h-6 w-6 items-center justify-center rounded-full border-4 border-background bg-muted-foreground/30 ring-4 ring-background"></span>

                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                    <span className="text-xl font-bold text-foreground">
                      2004
                    </span>
                    <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
                      Foundation
                    </span>
                  </div>
                  <h4 className="text-lg font-bold">專注製造</h4>
                  <p className="text-muted-foreground mt-2 max-w-md">
                    成立初期致力於高品質 CCTV
                    生產與代工，建立紮實的光學基礎，成為多家國際品牌指定合作夥伴。
                  </p>
                </div>

                {/* Node 2: 擴張 (Expansion) */}
                <div className="relative">
                  <span className="absolute -left-[41px] md:-left-[57px] top-1 flex h-6 w-6 items-center justify-center rounded-full border-4 border-background bg-muted-foreground/30 ring-4 ring-background"></span>

                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                    <span className="text-xl font-bold text-foreground">
                      2015
                    </span>
                    <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
                      Expansion
                    </span>
                  </div>
                  <h4 className="text-lg font-bold">特殊領域佈局</h4>
                  <p className="text-muted-foreground mt-2 max-w-md">
                    突破一般監控環境限制，成功開發水下攝影機與高速球技術，應用於水利工程與高腐蝕場域。
                  </p>
                </div>

                {/* Node 3: 整合 (Integration) */}
                <div className="relative">
                  <span className="absolute -left-[41px] md:-left-[57px] top-1 flex h-6 w-6 items-center justify-center rounded-full border-4 border-background bg-muted-foreground/30 ring-4 ring-background"></span>

                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                    <span className="text-xl font-bold text-foreground">
                      2022
                    </span>
                    <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
                      Integration
                    </span>
                  </div>
                  <h4 className="text-lg font-bold">智慧化整合</h4>
                  <p className="text-muted-foreground mt-2 max-w-md">
                    全面導入車牌辨識與 AI
                    影像分析系統，從單純的「看得見」進化為「看得懂」的智慧安防。
                  </p>
                </div>

                {/* Node 4: 未來 (Future) - Highlight */}
                <div className="relative">
                  {/* 特殊圓點：脈衝動畫，代表現在進行式/未來 */}
                  <span className="absolute -left-[41px] md:-left-[57px] top-1 flex h-6 w-6">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-6 w-6 border-4 border-background bg-primary ring-4 ring-background"></span>
                  </span>

                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                    <span className="text-xl font-bold text-primary">
                      Future
                    </span>
                    <span className="text-sm font-mono text-primary/80 uppercase tracking-wider">
                      Vision
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-foreground">
                    視覺管理夥伴
                  </h4>
                  <p className="text-muted-foreground mt-2 max-w-md">
                    不僅是設備供應商，更是企業資產管理的策略夥伴。我們將持續探索
                    AIoT 與雲端管理的無限可能。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
