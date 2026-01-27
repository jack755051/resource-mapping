'use client';

import { FileText, Download, FileCode, FileArchive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// 定義下載資源的資料結構
interface DownloadItem {
    title: string;
    type: 'PDF' | 'Driver' | 'Firmware' | 'Software';
    size: string;
    date: string;
    url: string;
}

interface ProductDownloadsProps {
    downloads: DownloadItem[];
}

export function ProductDownloads({ downloads }: ProductDownloadsProps) {
    if (!downloads || downloads.length === 0) return null;

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
                <Download className="w-5 h-5 text-primary" />
                Technical Resources
            </h3>

            <div className="grid gap-3">
                {downloads.map((item, idx) => (
                    <div
                        key={idx}
                        className="group flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-md transition-all duration-300"
                    >
                        {/* 檔案類型 Icon */}
                        <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                            item.type === 'PDF' ? "bg-red-500/10 text-red-600" :
                                item.type === 'Driver' || item.type === 'Firmware' ? "bg-blue-500/10 text-blue-600" :
                                    "bg-muted text-muted-foreground"
                        )}>
                            {item.type === 'PDF' ? <FileText className="w-5 h-5" /> :
                                item.type === 'Driver' ? <FileCode className="w-5 h-5" /> :
                                    <FileArchive className="w-5 h-5" />}
                        </div>

                        {/* 檔案資訊 */}
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-sm text-foreground truncate group-hover:text-primary transition-colors">
                                {item.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground font-mono">
                                <span className="bg-muted px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider">
                                    {item.type}
                                </span>
                                <span>{item.size}</span>
                                <span className="hidden sm:inline-block">• {item.date}</span>
                            </div>
                        </div>

                        {/* 下載按鈕 */}
                        <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground group-hover:text-primary">
                            <Download className="w-4 h-4" />
                        </Button>

                        {/* 隱形連結 */}
                        <a href={item.url} target="_blank" rel="noreferrer" className="absolute inset-0" aria-label={`Download ${item.title}`}></a>
                    </div>
                ))}
            </div>
        </div>
    );
}