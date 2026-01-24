import { ArrowRight, Building2, GraduationCap, Factory, ShieldCheck, Activity, Users, Radio } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">

      {/* -----------------------------------------------------------------
          SECTION A: HERO - Smart City Guardian
          修正：加入具體的背景圖層感，減少「空曠」的感覺
          保留：System Operational 的呼吸燈 (客戶喜歡)
      ----------------------------------------------------------------- */}
      <section className="relative w-full py-24 md:py-32 lg:min-h-[90vh] flex flex-col items-center justify-center overflow-hidden border-b border-border/40">

        {/* 1. 背景層：模擬城市/園區的氛圍 */}
        <div className="absolute inset-0 z-0">
          {/* 漸層底色 */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-10" />

          {/* 這裡可以放一張高品質的「現代建築」或「智慧園區」圖片作為底圖 */}
          {/* 示意用 placeholder */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 contrast-125 grayscale" />

          {/* 網格疊加 (保留科技感，但降低透明度) */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] z-20" />
        </div>

        {/* 2. 內容層 */}
        <div className="relative z-30 text-center px-4 max-w-5xl mx-auto space-y-6">

          {/* 狀態燈 (你喜歡的部分) */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium animate-in fade-in zoom-in duration-1000">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            System Operational
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
            Smarter Security for <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
              Modern Spaces.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Protecting what matters most. Advanced surveillance solutions tailored for universities, residential complexes, and enterprise facilities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/40"
            >
              Explore Solutions
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-border bg-background/60 backdrop-blur hover:bg-muted font-medium transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>

        {/* 底部裝飾：雷達掃描線 (保留科技感) */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent w-full" />
      </section>

      {/* -----------------------------------------------------------------
          SECTION B: CLIENT TYPES - 對號入座
          針對你的客戶群 (大學、華夏、廠辦) 建立信任感
          這解決了「留白過多」的問題，用明確的分類填補空間
      ----------------------------------------------------------------- */}
      <section className="py-16 border-b border-border/40 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-10">
            Trusted by organizations across Taiwan
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 卡片 1: 校園 */}
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg">
              <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Universities</h3>
                <p className="text-sm text-muted-foreground mt-1">Campus-wide safety monitoring with AI integration for student protection.</p>
              </div>
            </div>

            {/* 卡片 2: 社區 */}
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg">
              <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Residential</h3>
                <p className="text-sm text-muted-foreground mt-1">Smart access control and perimeter defense for modern living complexes.</p>
              </div>
            </div>

            {/* 卡片 3: 廠辦 */}
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg">
              <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
                <Factory className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Enterprise</h3>
                <p className="text-sm text-muted-foreground mt-1">Industrial-grade surveillance for factories, warehouses, and offices.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------------
          SECTION C: BENTO GRID - Technology (Civilian Friendly)
          修正：使用 rounded-2xl (24px) 增加親切感
          修正：內容聚焦在「穩定、清晰、易用」
      ----------------------------------------------------------------- */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="mb-12 md:text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Engineered for Reliability</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our systems are designed to be powerful yet easy to manage for property managers and security staff.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[280px]">

          {/* 大格：AI 辨識 (強調精準而非軍事) */}
          <div className="md:col-span-2 md:row-span-2 rounded-3xl border border-border bg-card p-8 flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">Smart Motion Detection</h3>
              <p className="text-muted-foreground">
                Reduce false alarms with our advanced AI algorithms that distinguish between people, vehicles, and animals. Perfect for quiet residential nights.
              </p>
            </div>
            {/* 背景動態波紋 */}
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
          </div>

          {/* 小格：雲端存取 */}
          <div className="md:col-span-1 rounded-3xl border border-border bg-card p-6 flex flex-col justify-between hover:border-primary/50 transition-colors">
            <Radio className="w-8 h-8 text-blue-500 mb-4" />
            <div>
              <h3 className="text-lg font-bold">Remote Access</h3>
              <p className="text-sm text-muted-foreground mt-1">Monitor from anywhere via mobile app.</p>
            </div>
          </div>

          {/* 小格：人員管理 */}
          <div className="md:col-span-1 rounded-3xl border border-border bg-card p-6 flex flex-col justify-between hover:border-primary/50 transition-colors">
            <Users className="w-8 h-8 text-indigo-500 mb-4" />
            <div>
              <h3 className="text-lg font-bold">Visitor Log</h3>
              <p className="text-sm text-muted-foreground mt-1">Digital tracking for guest entry.</p>
            </div>
          </div>

          {/* 中格 (橫向)：隱私與安全 */}
          <div className="md:col-span-2 rounded-3xl border border-border bg-card p-8 flex items-center justify-between group overflow-hidden hover:bg-muted/50 transition-colors">
            <div className="space-y-2 relative z-10">
              <ShieldCheck className="w-8 h-8 text-green-500 mb-2" />
              <h3 className="text-xl font-bold">Data Privacy First</h3>
              <p className="text-muted-foreground text-sm max-w-xs">
                Secure local storage options combined with encrypted cloud backup.
              </p>
            </div>
            {/* 裝飾線條 */}
            <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-background to-transparent opacity-50" />
          </div>

        </div>
      </section>

      {/* -----------------------------------------------------------------
          SECTION D: CTA - Friendly Invite
      ----------------------------------------------------------------- */}
      <section className="py-24 px-6 text-center bg-muted/20">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Ready to upgrade your facility's security?
          </h2>
          <p className="text-muted-foreground text-lg">
            Get a free consultation for your community or campus today.
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl">
              Book a Site Visit
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}