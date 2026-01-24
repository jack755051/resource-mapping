import {
  ArrowRight,
  Factory,        // 用於工廠
  Store,          // 新增：用於店鋪 (需確認 lucide-react 版本，如無可改 Building2)
  Anchor,         // 新增：用於特殊/水下 (需確認 lucide-react 版本)
  ShieldCheck,
  Activity,
  Eye,            // 新增：用於視覺管理
  Wrench,         // 新增：用於安裝服務
  HomeIcon            // 新增：用於家庭
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">

      {/* -----------------------------------------------------------------
          SECTION A: HERO - Enterprise & Management Focus (50% Weight)
          核心概念：資產保全、無死角管理
      ----------------------------------------------------------------- */}
      <section className="relative w-full py-24 md:py-32 lg:min-h-[90vh] flex flex-col items-center justify-center overflow-hidden border-b border-border/40">

        {/* 1. 背景層 */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-10" />
          {/* 建議換成更有工業/科技感的圖片，例如伺服器機房或繁忙的物流中心 */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 contrast-125 grayscale" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] z-20" />
        </div>

        {/* 2. 內容層 */}
        <div className="relative z-30 text-center px-4 max-w-5xl mx-auto space-y-8">

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium animate-in fade-in zoom-in duration-1000">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            Industrial Grade Security
          </div>

          {/* Main Headline - 針對老闆的痛點 */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight">
            Your Assets Should Have <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
              No Blind Spots.
            </span>
          </h1>

          {/* Sub Headline - 強調管理權 */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From production lines to retail chains, we provide more than just recording.
            <br className="hidden md:block" />
            We deliver <strong>Visual Management</strong> and <strong>Total Control</strong> when you are not there.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link
              href="/enterprise"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/40"
            >
              Consult for Business
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>

            <Link
              href="/special-solutions"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-border bg-background/60 backdrop-blur hover:bg-muted font-medium transition-colors"
            >
              See Special Solutions
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent w-full" />
      </section>

      {/* -----------------------------------------------------------------
          SECTION B: CLIENT TYPES & SCENARIOS
          修改為：工廠、店鋪、特殊工程
      ----------------------------------------------------------------- */}
      <section className="py-16 border-b border-border/40 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-10">
            Trusted by Industries & Professionals
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* 1. Manufacturing (The 50%) */}
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg">
              <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                <Factory className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Industrial & Factory</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Monitor production flow, prevent accidents, and secure inventory with 24/7 durability.
                </p>
              </div>
            </div>

            {/* 2. Retail/Commercial (The 50%) */}
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg">
              <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Retail & Commercial</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Resolve disputes instantly and manage multiple store locations from a single device.
                </p>
              </div>
            </div>

            {/* 3. Special Projects (The 35%) - 秀肌肉 */}
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg">
              <div className="p-3 rounded-xl bg-cyan-100 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400">
                <Anchor className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Specialized Fields</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Underwater cams, Speed Domes, and High-Speed capture for challenging environments.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------------
          SECTION C: CAPABILITIES (Strategy Mix)
          Big Box: Visual Management (Boss)
          Small Box 1: Extreme Tech (Special)
          Small Box 2: Installation Service (Pain Point)
          Wide Box: Home (Family)
      ----------------------------------------------------------------- */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="mb-12 md:text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Why Choose Us?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We don't just sell cameras. We provide a complete visual strategy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">

          {/* [大格 2x2] VISUAL MANAGEMENT (針對老闆) */}
          <div className="md:col-span-2 md:row-span-2 rounded-[2rem] border border-border bg-card p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/50 group">
            <div className="relative z-10 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                <Activity className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Visual Management System</h3>
              <p className="text-muted-foreground leading-relaxed">
                Turn "I don't know" into "Let's verify." <br />
                Our system gives you the power to manage personnel efficiency and resolve disputes instantly.
                It's not just security; it's your operational leverage.
              </p>
            </div>
            {/* 裝飾 */}
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors" />
          </div>

          {/* [小格 1x1] EXTREME VISION (針對特殊場景 35%) */}
          <div className="md:col-span-1 rounded-[2rem] border border-border bg-card p-6 flex flex-col justify-between transition-all duration-300 hover:bg-cyan-500/5 hover:border-cyan-500/50 hover:shadow-lg hover:-translate-y-1">
            <Eye className="w-8 h-8 text-cyan-500 mb-4" />
            <div>
              <h3 className="text-lg font-bold text-foreground">Beyond Limits</h3>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>Waterproof (IP68)</strong> & <strong>High-Speed Domes</strong>. We see what others can't.
              </p>
            </div>
          </div>

          {/* [小格 1x1] INSTALLATION (針對安裝痛點) */}
          <div className="md:col-span-1 rounded-[2rem] border border-border bg-card p-6 flex flex-col justify-between transition-all duration-300 hover:bg-orange-500/5 hover:border-orange-500/50 hover:shadow-lg hover:-translate-y-1">
            <Wrench className="w-8 h-8 text-orange-500 mb-4" />
            <div>
              <h3 className="text-lg font-bold text-foreground">Pro Installation</h3>
              <p className="text-sm text-muted-foreground mt-2">
                No messy wires. We pride ourselves on aesthetic, industrial-grade cabling.
              </p>
            </div>
          </div>

          {/* [長格 2x1] HOME / FAMILY (針對家庭 15%) */}
          <div className="md:col-span-2 rounded-[2rem] border border-border bg-card p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden transition-all duration-300 hover:border-green-500/50 hover:shadow-lg hover:bg-green-50/50 dark:hover:bg-green-900/10">
            <div className="space-y-2 relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <HomeIcon className="w-6 h-6 text-green-500" />
                <span className="text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Residential
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground">Enterprise Grade for Home</h3>
              <p className="text-muted-foreground text-sm max-w-sm">
                Protect your family with the same technology used by factories.
                Stable, secure, and always connected to what matters most.
              </p>
            </div>

            <div className="hidden md:block relative w-24 h-24 opacity-10">
              <ShieldCheck className="w-full h-full text-foreground" />
            </div>
          </div>

        </div>
      </section>

      {/* -----------------------------------------------------------------
          SECTION D: CTA
          痛點：別讓未知成為成本
      ----------------------------------------------------------------- */}
      <section className="py-24 px-6 text-center bg-muted/20">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Don't let "Unknown" be a cost.
          </h2>
          <p className="text-muted-foreground text-lg">
            Get a professional site assessment for your facility or specialized project today.
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