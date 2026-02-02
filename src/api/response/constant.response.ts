export interface ConstantProductsCategoriesResDto {
  id: string;
  name: string;  // 🔥 後端 I18nInterceptor 已翻譯
  value: string; // 分類的值（如 "all", "iot-devices"）
  sort: number;  // 排序順序
  description?: string;  // 可選描述
}
