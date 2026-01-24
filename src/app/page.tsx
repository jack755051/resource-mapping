import { ArrowRight, Building2, GraduationCap, Factory, ShieldCheck, Activity, Users, Radio } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">

      {/* -----------------------------------------------------------------
          SECTION A: HERO - Smart City Guardian
      ----------------------------------------------------------------- */}
      <section className="relative w-full py-24 md:py-32 lg:min-h-[90vh] flex flex-col items-center justify-center overflow-hidden border-b border-border/40">

        {/* 1. 背景層 */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-10" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 contrast-125 grayscale" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] z-20" />
        </div>

        {/* 2. 內容層 */}
        <div className="relative z-30 text-center px-4 max-w-5xl mx-auto space-y-6">
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

        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent w-full" />
      </section>

      {/* -----------------------------------------------------------------
          SECTION B: CLIENT TYPES
      ----------------------------------------------------------------- */}
      <section className="py-16 border-b border-border/40 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-10">
            Trusted by organizations across Taiwan
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg">
              <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Universities</h3>
                <p className="text-sm text-muted-foreground mt-1">Campus-wide safety monitoring with AI integration for student protection.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg">
              <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Residential</h3>
                <p className="text-sm text-muted-foreground mt-1">Smart access control and perimeter defense for modern living complexes.</p>
              </div>
            </div>

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
          SECTION C: SYSTEM CAPABILITIES (Bento Grid)
          修正：
          1. 移除 hover:bg-muted/40 (避免變髒灰)
          2. 改用 hover:bg-primary/5 (極淡品牌光) + hover:shadow-lg + hover:-translate-y-1 (輕微浮起)
      ----------------------------------------------------------------- */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="mb-12 md:text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">System Capabilities</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Everything you need to manage security, simplified into one dashboard.
            <br className="hidden md:block" />
            <span className="text-sm opacity-80">(Designed for ease of use by non-technical staff)</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">

          {/* [大格 2x2] Smart AI Detection */}
          <div className="md:col-span-2 md:row-span-2 rounded-[2rem] border border-border bg-card p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/50 group">
            <div className="relative z-10 space-y-4">
              {/* Icon 區塊：加入 group-hover 動畫 */}
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                <Activity className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Smart AI Detection</h3>
              <p className="text-muted-foreground leading-relaxed">
                Automatically distinguish between residents, delivery vehicles, and potential intruders.
                Our system filters out 95% of false alarms caused by rain or animals.
              </p>
            </div>
            {/* 裝飾：底部光暈 (Hover 時稍微變亮) */}
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors" />
          </div>

          {/* [小格 1x1] Remote App */}
          {/* 修正：移除 bg-muted，加入 translateY 和 shadow */}
          <div className="md:col-span-1 rounded-[2rem] border border-border bg-card p-6 flex flex-col justify-between transition-all duration-300 hover:bg-primary/5 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1">
            <Radio className="w-8 h-8 text-blue-500 mb-4" />
            <div>
              <h3 className="text-lg font-bold text-foreground">Remote App</h3>
              <p className="text-sm text-muted-foreground mt-2">View live feeds from iOS & Android.</p>
            </div>
          </div>

          {/* [小格 1x1] Visitor Logs */}
          {/* 修正：移除 bg-muted，加入 translateY 和 shadow */}
          <div className="md:col-span-1 rounded-[2rem] border border-border bg-card p-6 flex flex-col justify-between transition-all duration-300 hover:bg-primary/5 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1">
            <Users className="w-8 h-8 text-indigo-500 mb-4" />
            <div>
              <h3 className="text-lg font-bold text-foreground">Visitor Logs</h3>
              <p className="text-sm text-muted-foreground mt-2">Digital entry tracking & history.</p>
            </div>
          </div>

          {/* [長格 2x1] Privacy & Encryption */}
          <div className="md:col-span-2 rounded-[2rem] border border-border bg-card p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden transition-all duration-300 hover:border-green-500/50 hover:shadow-lg hover:bg-green-50/50 dark:hover:bg-green-900/10">
            <div className="space-y-2 relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-6 h-6 text-green-500" />
                <span className="text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Bank-Level Security
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground">Privacy & Encryption</h3>
              <p className="text-muted-foreground text-sm max-w-sm">
                Your footage belongs to you. We offer local storage options with AES-256 cloud backup redundancy.
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