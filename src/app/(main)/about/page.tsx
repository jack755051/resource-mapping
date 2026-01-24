'use client';

import {
  BadgeCheck,
  Microscope,
  Headset,
  ArrowRight,
  History
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
            我們不只是製造監控器材，<br />
            我們是在製造<span className="text-primary underline decoration-4 decoration-primary/20 underline-offset-4">信任</span>。
          </h1>

          <div className="flex flex-col md:flex-row gap-12 items-start border-l-2 border-primary/20 pl-8 md:pl-12">
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              光訊科技（San Ring Tech）於監控領域已有 20 年經驗。
              在這個快速迭代的科技業，20 年代表的不是陳舊，而是對品質近乎偏執的堅持。
              <br /><br />
              從早期的 CCTV 生產，到如今佈局車牌辨識與深海監控，
              我們始終相信：<strong>僅有不斷的研發與創新，才能呈現高實用性與高質量的商品。</strong>
            </p>
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------------
          SECTION 2: THE IMAGE GRID (工廠/研發實景)
          差異點：這裡展示「硬體」的細節，電路板、鏡頭結構，強調「製造商」身份
      ----------------------------------------------------------------- */}
      <section className="w-full border-y border-border/40 bg-muted/20">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[500px] md:h-[600px]">

            {/* 左側大圖：強調精密研發 (建議找一張工程師拿著電路板或鏡頭特寫的圖) */}
            <div className="md:col-span-8 relative rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm font-mono opacity-80 mb-1">R&D LAB</p>
                <h3 className="text-2xl font-bold">精密光學研發中心</h3>
              </div>
            </div>

            {/* 右側兩張圖：強調特殊場景 (水下/工廠) */}
            <div className="md:col-span-4 flex flex-col gap-4">
              <div className="flex-1 relative rounded-2xl overflow-hidden group">
                {/* 水下/嚴苛環境示意圖 */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544551763-46a8723ba3f9?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-blue-900/40" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold">水下與極限場域</h3>
                </div>
              </div>
              <div className="flex-1 relative rounded-2xl overflow-hidden group">
                {/* 測試/品管示意圖 */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531297461136-82lw9z21z9a5?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold">100% 出廠測試</h3>
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
              主要致力於 CCTV 監控攝影機之生產製造。我們擁有專業的研發人員負責，致力開發高品質、多功能攝影機。對於每樣產品出貨，光訊提供最高級別的把關。
            </p>
          </div>

          {/* Pillar 2: 創新 */}
          <div className="space-y-4">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-xl flex items-center justify-center">
              <Microscope className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold">創新 Innovation</h3>
            <p className="text-muted-foreground leading-relaxed">
              近年光訊佈局多領域系列監控設備，如：<span className="font-semibold text-foreground">車牌辨識、水下攝影機、高速球攝影機</span>系列。我們堅信僅有不斷的研發，才能滿足現代化場域的嚴苛需求。
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
          SECTION 4: TIMELINE (歷史沿革 - 增加厚度)
          差異點：這是首頁沒有的，專屬於「關於我們」的內容
      ----------------------------------------------------------------- */}
      <section className="border-t border-border/40 py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 md:items-center">
            <div className="md:w-1/3">
              <h2 className="text-3xl font-bold mb-4">持續領先業界，<br />並永續發展。</h2>
              <p className="text-muted-foreground mb-6">
                二十年的足跡，見證了我們從傳統類比監控，走向 AI 智能與特殊場域應用的歷程。
              </p>
              <button className="inline-flex items-center text-primary font-medium hover:underline">
                聯繫我們 <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>

            {/* 簡單的時間軸示意 */}
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="border-l-2 border-primary/20 pl-6 py-2">
                <span className="text-sm font-mono text-muted-foreground">FOUNDATION</span>
                <h4 className="text-lg font-bold mt-1">專注製造</h4>
                <p className="text-sm text-muted-foreground mt-2">致力於高品質 CCTV 生產與代工，建立紮實的光學基礎。</p>
              </div>
              <div className="border-l-2 border-primary/20 pl-6 py-2">
                <span className="text-sm font-mono text-muted-foreground">EXPANSION</span>
                <h4 className="text-lg font-bold mt-1">特殊領域佈局</h4>
                <p className="text-sm text-muted-foreground mt-2">開發水下攝影與高速球技術，突破一般監控的環境限制。</p>
              </div>
              <div className="border-l-2 border-primary/20 pl-6 py-2">
                <span className="text-sm font-mono text-muted-foreground">INTEGRATION</span>
                <h4 className="text-lg font-bold mt-1">智慧化整合</h4>
                <p className="text-sm text-muted-foreground mt-2">導入車牌辨識與 AI 系統，提供軟硬體整合的解決方案。</p>
              </div>
              <div className="border-l-2 border-primary pl-6 py-2">
                <span className="text-sm font-mono text-primary">FUTURE</span>
                <h4 className="text-lg font-bold mt-1">視覺管理夥伴</h4>
                <p className="text-sm text-muted-foreground mt-2">不僅是供應商，更是企業資產管理的策略夥伴。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}