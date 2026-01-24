/**定義 Footer 的核心資料 (純資料) */
export interface FooterData {
  companyName: string;
  startYear: number | string;
  remark?: string;
}

/**定義 Footer 的 Slot 樣式 (純樣式) */
export interface FooterClasses {
  wrapper?: string; // 對應 footer 標籤
  text?: string; // 對應 span 標籤
}

/**
 * 定義 Component 接收的 Props
 * 組件只需要關心樣式，因為資料是從 Hook 來的 (或者是選填的 override)
 */
export interface FooterProps {
  className?: string; // 最外層快速設定
  classNames?: FooterClasses; // 細部設定
  data?: Partial<FooterData>; // (選填) 允許父層覆蓋預設資料
}
