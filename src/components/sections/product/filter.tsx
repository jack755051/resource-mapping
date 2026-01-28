'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Search, Grid3X3, Laptop, Smartphone, Server } from 'lucide-react';

// 引入 Shadcn Command 組件
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { Button } from '@/components/ui/button';

interface FilterSectionProps {
    categories: { id: string; name: string }[];
    activeCategory: string;
    onCategoryChange: (id: string) => void;
}

export function ProductFilterSection({ categories, activeCategory, onCategoryChange }: FilterSectionProps) {
    const [open, setOpen] = useState(false);

    // 監聽鍵盤快捷鍵 (Cmd+K 或 Ctrl+K)
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        }
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <>
            <div className="sticky top-0 z-40 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between h-16 md:h-20 gap-4">
                        {/* 左側：分類按鈕 (維持原樣) */}
                        <div className="flex-1 overflow-x-auto scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
                            <div className="flex items-center gap-1">
                                {categories.map((cat) => {
                                    const isActive = activeCategory === cat.id;
                                    return (
                                        <button
                                            key={cat.id}
                                            onClick={() => onCategoryChange(cat.id)}
                                            className={cn(
                                                "relative whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300",
                                                isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeCategoryPill"
                                                    className="absolute inset-0 bg-primary rounded-full shadow-lg shadow-primary/25"
                                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                    style={{ borderRadius: 9999 }}
                                                />
                                            )}
                                            <span className="relative z-10">{cat.name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 右側工具列 */}
                        <div className="hidden md:flex items-center gap-2 border-l border-border pl-4 ml-2">
                            {/* 搜尋按鈕：點擊觸發彈窗 */}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setOpen(true)}
                                className="text-muted-foreground hover:bg-muted hover:text-foreground transition-colors relative"
                            >
                                <Search className="w-5 h-5" />
                                {/* 顯示快捷鍵提示 (選擇性) */}
                                <kbd className="pointer-events-none absolute -bottom-4 right-0 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
                                    <span className="text-xs">⌘</span>K
                                </kbd>
                            </Button>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                            >
                                <Grid3X3 className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 搜尋彈窗 (Command Palette) */}
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="搜尋產品型號、規格或分類..." />
                <CommandList>
                    <CommandEmpty>找不到相關結果。</CommandEmpty>

                    <CommandGroup heading="熱門搜尋">
                        <CommandItem onSelect={() => {
                            // 這裡寫跳轉邏輯
                            console.log("Selected IP50");
                            setOpen(false);
                        }}>
                            <Laptop className="mr-2 h-4 w-4" />
                            <span>GC-IP50 深海旗艦款</span>
                        </CommandItem>
                        <CommandItem>
                            <Server className="mr-2 h-4 w-4" />
                            <span>NVR Pro 64CH</span>
                        </CommandItem>
                        <CommandItem>
                            <Smartphone className="mr-2 h-4 w-4" />
                            <span>Smart Eye X1</span>
                        </CommandItem>
                    </CommandGroup>

                    <CommandSeparator />

                    <CommandGroup heading="產品分類">
                        {categories.slice(1).map(cat => (
                            <CommandItem key={cat.id} onSelect={() => {
                                onCategoryChange(cat.id);
                                setOpen(false);
                            }}>
                                <span>{cat.name}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}