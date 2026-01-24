import { FooterData } from '@/type';
import { generateFooterText } from '@/utils/footer-helper';

export function useFooter(overrideData?: Partial<FooterData>) {
  // 1. 預設資料 (或從 API/Context 來的資料)
  const defaultData: FooterData = {
    companyName: 'San Ring Tech.',
    startYear: 2020,
    remark: 'All rights reserved.',
  };

  // 2. 合併資料 (如果有傳入 override)
  const data = { ...defaultData, ...overrideData };

  // 3. 處理邏輯 (Logic)：直接在這裡計算出最終文字
  // 這樣 Component 就不用管怎麼組裝字串了
  const footerText = generateFooterText({
    companyName: data.companyName,
    startYear: data.startYear,
    remark: data.remark,
  });

  // 4. 只回傳資料
  return {
    data,
    footerText,
  };
}
