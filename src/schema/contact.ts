import { z } from 'zod';

// 定義表單驗證規則
export const contactFormSchema = z.object({
  name: z.string().min(2, { message: '請輸入姓名' }),
  phone: z.string().min(8, { message: '請輸入有效的電話號碼' }),
  email: z.string().email({ message: '請輸入有效的 Email' }),
  type: z.array(z.string()).min(1, { message: '請至少選擇一個諮詢項目' }), // 修改為陣列支援複選
  message: z.string().min(10, { message: '需求描述至少需要 10 個字' }),
});

// 導出 TypeScript 型別
export type ContactFormData = z.infer<typeof contactFormSchema>;
