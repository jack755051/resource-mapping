'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useIcon } from '@/hooks/useIcon';
import { LucideIcon } from 'lucide-react';

// 引入我們剛做好的 config 和 hook
import { languages, LanguageCode } from '@/config/i18n';
import { useLanguage } from '@/provider/language-provider';

export default function LanguageSwitcher() {
    const { getIcon } = useIcon();
    const LanguageIconComponent = getIcon('language') as LucideIcon;

    // 1. 從全域 Context 取得目前的語系跟設定方法
    const { language, setLanguage } = useLanguage();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    {LanguageIconComponent && (
                        <LanguageIconComponent className="h-[1.2rem] w-[1.2rem]" />
                    )}
                    <span className="sr-only">切換語言</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                {/* 2. 使用 RadioGroup 來管理互斥狀態 */}
                <DropdownMenuRadioGroup
                    value={language}
                    onValueChange={(val) => setLanguage(val as LanguageCode)}
                >
                    {/* 3. 跑迴圈產生選項，這樣以後加日文不用改這裡 */}
                    {languages.map((lang) => (
                        <DropdownMenuRadioItem key={lang.code} value={lang.code}>
                            {lang.label}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}