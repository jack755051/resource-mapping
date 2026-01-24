'use client';

import { ShieldCheck, Cpu, Lightbulb, History, Target, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">

      {/* -----------------------------------------------------------------
          SECTION 1: HERO & INTRO
      ----------------------------------------------------------------- */}
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* 左側：標題與導言 */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <History className="w-4 h-4" />
              <span>Since 2004</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
              二十年磨一劍，<br />
              只為守住您的<span className="text-primary">底線</span>。
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              San Ring Tech (光訊科技) 於監控領域深耕二十載。
              我們不只是一家設備製造商，更是工業級「視覺管理」的先行者。
              <br /><br />
              從早期的 CCTV 生產，到如今佈局車牌辨識、水下攝影與高速球技術，
              我們始終堅持一個信念：**唯有工業級的耐用度，才能承載商業級的安全需求。**
            </p>
          </div>

          {/* 右側：意象圖 (建議放一張研發或精密組裝的照片) */}
          <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10" />
            {/* 這裡可以放一張稍微偏「黑白/高對比」的工程師修設備圖，或者電路板特寫，強調「研發」 */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092921461-eab6245b09bed?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale contrast-125" />
          </div>
        </div>
      </div>

      {/* -----------------------------------------------------------------
          SECTION 2: CORE VALUES (舊有的「專業/創新/服務」轉化升級)
      ----------------------------------------------------------------- */}
      <div className="bg-muted/30 py-16 border-y border-border/40">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">我們的核心信仰</h2>
            <p className="text-muted-foreground">
              從產品研發到售後服務，我們將傳統的「專業、創新、服務」，
              轉化為更具體的行動準則。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1: R&D */}
            <div className="bg-background p-8 rounded-2xl border border-border hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">極限技術研發</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                我們不滿足於標準品。針對嚴苛環境（如水下、高溫工廠），我們投入專業研發團隊，開發車牌辨識與高速球攝影機，確保在極限條件下，視野依然清晰。
              </p>
            </div>

            {/* Value 2: QC */}
            <div className="bg-background p-8 rounded-2xl border border-border hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">最高級別把關</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                對於每樣產品出貨，我們堅持嚴格的出貨前測試。我們深信，設備的穩定性是安全的基石。我們提供的不是消耗品，而是能陪伴企業長久運作的資產。
              </p>
            </div>

            {/* Value 3: Service */}
            <div className="bg-background p-8 rounded-2xl border border-border hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">視覺解決方案</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                光訊傾聽每位顧客的需求。從單純的錄影，到複雜的場域視覺管理，我們提供優質的售後服務與諮詢，確保您的投資發揮最大效益。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* -----------------------------------------------------------------
          SECTION 3: STATS (社會證明) - 可根據實際情況修改數字
      ----------------------------------------------------------------- */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-border/40">
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold text-primary">20+</div>
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Years Experience</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold text-primary">500+</div>
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Projects Completed</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold text-primary">98%</div>
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Client Satisfaction</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold text-primary">24/7</div>
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Technical Support</div>
          </div>
        </div>
      </div>

      {/* -----------------------------------------------------------------
          SECTION 4: VISION / CTA
      ----------------------------------------------------------------- */}
      <div className="bg-primary text-primary-foreground py-24">
        <div className="container mx-auto px-6 text-center max-w-3xl space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            力求完美，領先業界
          </h2>
          <p className="text-primary-foreground/80 text-lg leading-relaxed">
            我們堅信，僅有不斷的研發與創新，才能呈現高實用性與高質量的商品。
            San Ring Tech 將繼續在監控領域永續發展，成為您最值得信賴的視覺管理夥伴。
          </p>
          <div className="pt-4">
            <div className="inline-block p-4 border border-primary-foreground/30 rounded-lg bg-primary-foreground/10 backdrop-blur">
              <p className="text-xl font-serif italic">
                "看得見，才能守住底線。"
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}