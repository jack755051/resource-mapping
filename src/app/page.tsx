import { ArrowRight, ShieldCheck, Activity, Eye, Server } from 'lucide-react';
import Link from 'next/link';

export default function Home() {


  return (
    <div className="flex flex-col min-h-screen">

      {/* -----------------------------------------------------------------
          SECTION A: HERO - The Omni-Watch
          利用 relative + overflow-hidden 創造深邃感
          加入 animate-scan 營造監控氛圍
      ----------------------------------------------------------------- */}
      <section className="relative w-full h-[85vh] flex flex-col items-center justify-center overflow-hidden border-b border-border/50">

        {/* 背景特效層 */}
        <div className="absolute inset-0 bg-background z-0">
          {/* 網格背景 (Grid Pattern) */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

          {/* 雷達掃描光束 (呼叫我們剛設定的 scan 動畫) */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-[200%] w-full animate-scan opacity-30 pointer-events-none" />

          {/* 中心光暈 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[100px] rounded-full" />
        </div>

        {/* 內容層 */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-primary/30 bg-primary/10 text-primary text-xs font-mono tracking-widest uppercase mb-4 animate-pulse-slow">
            <span className="w-2 h-2 rounded-full bg-primary" />
            System Operational
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50">
            Total Situational <br /> Awareness.
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Next-generation surveillance infrastructure defined by precision, AI-integration, and invisibility.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center h-12 px-8 rounded bg-primary text-primary-foreground font-medium transition-all hover:opacity-90 hover:scale-105"
            >
              Start Monitoring
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>

            <Link
              href="/demo"
              className="inline-flex items-center justify-center h-12 px-8 rounded border border-border bg-background/50 backdrop-blur hover:bg-muted/50 font-medium transition-colors"
            >
              View Live Demo
            </Link>
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------------------
          SECTION B: BENTO GRID - Modular Defense
          模擬監控室的多螢幕佈局
      ----------------------------------------------------------------- */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Core Architectures</h2>
          <p className="text-muted-foreground">Built for scale. Designed for speed.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">

          {/* 大格子 (跨兩列) */}
          <div className="md:col-span-2 row-span-1 rounded border border-border bg-card p-8 flex flex-col justify-between group overflow-hidden relative hover:border-primary/50 transition-colors">
            <div className="relative z-10">
              <ShieldCheck className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold">Military-Grade Encryption</h3>
              <p className="text-muted-foreground mt-2 text-sm">End-to-end data protection standards.</p>
            </div>
            {/* 裝飾用的背景圖示或線條 */}
            <div className="absolute right-[-20px] bottom-[-20px] opacity-5 group-hover:opacity-10 transition-opacity">
              <ShieldCheck className="w-48 h-48" />
            </div>
          </div>

          {/* 小格子 */}
          <div className="rounded border border-border bg-card p-8 flex flex-col justify-between hover:border-primary/50 transition-colors">
            <Activity className="w-8 h-8 text-secondary mb-4" /> {/* 用 Secondary 色 */}
            <div>
              <h3 className="text-xl font-bold">Real-time Analytics</h3>
              <p className="text-muted-foreground mt-2 text-sm">0.2ms latency detection.</p>
            </div>
          </div>

          {/* 小格子 */}
          <div className="rounded border border-border bg-card p-8 flex flex-col justify-between hover:border-primary/50 transition-colors">
            <Server className="w-8 h-8 text-primary mb-4" />
            <div>
              <h3 className="text-xl font-bold">Edge Computing</h3>
              <p className="text-muted-foreground mt-2 text-sm">Process data locally.</p>
            </div>
          </div>

          {/* 大格子 (跨兩列) */}
          <div className="md:col-span-2 rounded border border-border bg-card p-8 flex flex-col justify-between relative overflow-hidden hover:border-primary/50 transition-colors">
            <div className="relative z-10">
              <Eye className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold">Computer Vision AI</h3>
              <p className="text-muted-foreground mt-2 text-sm">Behavioral analysis and object recognition.</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent w-[200%] animate-scan pointer-events-none" />
          </div>

        </div>
      </section>

      {/* -----------------------------------------------------------------
          SECTION C: DATA STRIP - Trust in Numbers
          單色背景，強調數據
      ----------------------------------------------------------------- */}
      <section className="border-y border-border/50 bg-muted/20 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Active Sensors", value: "50,000+" },
            { label: "Data Processed", value: "2PB/Day" },
            { label: "Uptime Guaranteed", value: "99.99%" },
            { label: "Global Partners", value: "120+" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold tracking-tight text-foreground font-mono">
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground mt-2">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* -----------------------------------------------------------------
          SECTION D: CTA - Final Command
      ----------------------------------------------------------------- */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Ready to secure your perimeter?
          </h2>
          <p className="text-muted-foreground text-lg">
            Consult with our security architects today.
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded hover:bg-primary/90 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
