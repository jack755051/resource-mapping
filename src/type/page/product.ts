// src/type/page/product.ts

/** * 定義產品規格的單一項目 
 */
export interface ProductSpec {
    label: string;
    value: string;
}

/** * 定義 Product Card 的核心資料 (純資料)
 * 包含連結 href，這樣組件不需要知道路由邏輯
 */
export interface ProductCardData {
    title: string;
    category: string;
    image: string; // 圖片路徑
    href: string;  // 點擊後跳轉的連結 (例如: /products/camera-01)
    specs: ProductSpec[];
    tags: string[];
}

/** * 定義 Product Card 的 Slot 樣式 (純樣式)
 * 讓外部可以針對特定區塊進行樣式覆蓋
 */
export interface ProductCardClasses {
    container?: string;      // 最外層卡片
    imageWrapper?: string;   // 圖片容器
    image?: string;          // NextImage 本體
    badge?: string;          // 分類標籤
    content?: string;        // 中間文字區塊
    title?: string;          // 標題
    specsGrid?: string;      // 規格列表容器
    footer?: string;         // 底部按鈕區
}

/**
 * 定義 Component 接收的 Props
 */
export interface ProductCardProps {
    data: ProductCardData;
    className?: string;       // 用於覆蓋 container 的樣式 (最常用)
    classNames?: ProductCardClasses; // 用於覆蓋內部細節樣式
}