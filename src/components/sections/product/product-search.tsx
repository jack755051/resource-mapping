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
} from '@/components/ui/command';
import { ProductCategory } from '@/type/page/product';
import { useTranslation } from '@/hooks/useTranslation';
import { getLocalizedContent } from '@/type/i18n';

interface ProductSearchProps {
  categories: ProductCategory[];
  onCategorySelect?: (id: string) => void;
}

export function ProductSearch({
  categories,
  onCategorySelect,
}: ProductSearchProps) {
  const [open, setOpen] = useState(false);
  const { language, t } = useTranslation();

  // Cmd+K 鍵盤監聽保留 (這是 Event Listener，不屬於 Derived State 範疇)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelectCategory = (id: string) => {
    if (onCategorySelect) onCategorySelect(id);
    setOpen(false);
  };

  return (
    <>
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

      <CommandDialog open={open} onOpenChange={setOpen}>
        {/* 可以用 t() 翻譯 placeholder */}
        <CommandInput placeholder="Search products..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Popular">
            <CommandItem onSelect={() => console.log('Selected IP50')}>
              <Laptop className="mr-2 h-4 w-4" />
              <span>GC-IP50 Flagship</span>
            </CommandItem>
            {/* ...其他靜態項目... */}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Categories">
            {categories.map((cat) => {
              const localizedName = getLocalizedContent(cat.label, language);
              return (
                <CommandItem
                  key={cat.id}
                  // value 屬性幫助 Command 進行搜尋過濾
                  value={`${cat.id} ${localizedName}`}
                  onSelect={() => handleSelectCategory(cat.id)}
                >
                  <span>{localizedName}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}