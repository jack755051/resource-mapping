'use client';

import { useState, useEffect } from 'react';
import { Search, Laptop, Smartphone, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";

interface ProductSearchProps {
    categories: { id: string; name: string }[];
    onCategorySelect?: (id: string) => void;
}

export function ProductSearch({ categories, onCategorySelect }: ProductSearchProps) {
    const [open, setOpen] = useState(false);

    // 監聽鍵盤快捷鍵
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const handleSelectCategory = (id: string) => {
        if (onCategorySelect) onCategorySelect(id);
        setOpen(false);
    };

    return (
        <>
            {/* 觸發按鈕 */}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(true)}
                className="text-muted-foreground hover:bg-muted hover:text-foreground transition-colors relative"
            >
                <Search className="w-5 h-5" />
                <kbd className="pointer-events-none absolute -bottom-4 right-0 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>

            {/* 搜尋彈窗 */}
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="搜尋產品型號、規格或分類..." />
                <CommandList>
                    <CommandEmpty>找不到相關結果。</CommandEmpty>

                    <CommandGroup heading="熱門搜尋">
                        <CommandItem onSelect={() => console.log("Selected IP50")}>
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
                            <CommandItem key={cat.id} onSelect={() => handleSelectCategory(cat.id)}>
                                <span>{cat.name}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}