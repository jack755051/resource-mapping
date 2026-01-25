'use client';
import { motion } from 'framer-motion';

export function ProductHeroSection() {
    return (
        <div className="relative bg-muted/20 border-b border-border/40 overflow-hidden">
            {/* 背景裝飾 */}
            <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] opacity-5" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 blur-3xl rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-32 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12">

                    {/* 左側：文字區 */}
                    <motion.div
                        className="flex-1 text-center md:text-left space-y-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-wider uppercase">
                            San Ring Tech
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
                            Vision <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                                Redefined.
                            </span>
                        </h1>

                        <p className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed">
                            從深海作業到智慧城市，我們提供全方位的視覺解決方案。
                            <span className="text-foreground font-medium">嚴選硬體，在地化深度整合。</span>
                        </p>
                    </motion.div>

                    {/* 右側：Hero Image */}
                    <motion.div
                        className="flex-1 relative w-full max-w-lg aspect-square md:aspect-[4/3]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="relative w-full h-full">
                            {/* 記得確保圖片路徑正確，或使用 Image 組件 */}
                            <img
                                src="/images/hero-camera.png"
                                alt="Flagship Camera"
                                className="object-contain w-full h-full drop-shadow-2xl"
                            />

                            <motion.div
                                className="absolute -bottom-6 -left-6 bg-card/80 backdrop-blur border border-white/20 p-4 rounded-2xl shadow-xl hidden md:block"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        AI
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold">Smart Detection</div>
                                        <div className="text-xs text-muted-foreground">99.9% Accuracy</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}