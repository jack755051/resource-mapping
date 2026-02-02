export interface SupportCategoryResDto {
    id: string;
    name: string;  // 🔥 後端已根據 accept-language 返回翻譯後的字符串
}

export interface SupportListResDto {
    id: number;
    title: string;
    category: string; // 後端通常給 string，不一定會剛好對應你的 Frontend Enum
    date: string;     // ISO String (e.g., "2025-10-15T00:00:00Z")
    type: string;     // file extension usually (e.g., "pdf", "zip")
    size: number;     // 修改：建議後端回傳 Bytes (e.g., 2621440)
}