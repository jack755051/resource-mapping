// types/contact.ts

import { LocalizedString } from "../i18n";

/** 定義據點類型，方便前端做樣式區隔 (例如 HQ 顯示比較大，分公司顯示比較小) */
export type OfficeType = 'hq' | 'branch' | 'warehouse';

export interface OfficeAddress {
    label: LocalizedString;
    mapLink: string;    // Google Maps 外部連結 (導航用)
    embedSrc: string;   // Google Maps iframe src (嵌入地圖用)
}

export interface OfficeContact {
    phones: string[];   // 支援多組電話
    fax?: string;       // 傳真 (選填，因為有些辦事處可能沒有)
    email: string;
}

// 單一據點的完整資訊結構
export interface OfficeLocation {
    id: string;         // 唯一識別碼 (用於 React key)
    type: OfficeType;   // 類型：總公司 vs 分公司
    title: LocalizedString;  // 據點名稱 (例如: "台北總公司", "台中辦事處") - i18n key
    address: OfficeAddress;
    contact: OfficeContact;
}

// 表單設定 (維持不變)
export interface ContactFormConfig {
    inquiryTags: string[];
}

// 最終頁面資料結構
export interface ContactPageData {
    formConfig: ContactFormConfig;
    locations: OfficeLocation[]; // 修改這裡：變成陣列，支援多個據點
}