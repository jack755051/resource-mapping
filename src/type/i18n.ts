// 這是未來資料庫欄位會長成的樣子
export interface LocalizedString {
  zh: string;
  en: string;
}

// 輔助 helper：根據當前語系，取出正確的字串
// 如果找不到該語系，預設回傳 zh
export function getLocalizedContent(
  content: LocalizedString | string,
  lang: string
): string {
  if (typeof content === 'string') return content; // 如果是純字串，直接回傳
  // @ts-ignore - 簡單處理 key access
  return content[lang] || content['zh'];
}
