/**
 * 後端實際返回的資料結構
 * ⚠️ 後端 I18nInterceptor 已經翻譯了 name 和 address，返回的是字符串而非 LocalizedString
 */
export interface OfficeLocationResDto {
  id: string;
  name: string; // 🔥 已翻譯的據點名稱（如 "新北總公司"）
  address: string; // 🔥 已翻譯的地址字符串
  mapUrl: string; // Google Maps 連結
  phones: string[];
  fax?: string;
  email: string;
  officeType: {
    id: string;
    name: string; // 🔥 已翻譯的類型名稱（如 "區域總部"）
  };
  sort: number;
}

export interface ContactFormResDto {
  success: boolean;
  message: string;
}
