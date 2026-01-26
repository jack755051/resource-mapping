// src/hooks/useContactForm.ts
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactFormData, contactFormSchema } from '@/schema/contact';

// 模擬 API Service
const submitContactForm = async (data: ContactFormData) => {
    return new Promise((resolve) => setTimeout(resolve, 1500));
};

export function useContactForm() {
    const [isSuccess, setIsSuccess] = useState(false);

    // 1. 初始化表單
    const form = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            type: [],
        },
    });

    const { setValue, watch, reset } = form;

    // 2. 監聽選中的 Tags
    const selectedTags = watch('type') || [];

    // 3. Tag 切換邏輯
    const toggleTag = (tagKey: string) => {
        const current = selectedTags;
        if (current.includes(tagKey)) {
            setValue('type', current.filter((t) => t !== tagKey));
        } else {
            setValue('type', [...current, tagKey]);
        }
    };

    // 4. 送出邏輯
    const onSubmit = async (data: ContactFormData) => {
        try {
            console.log("正在送出資料:", data);
            await submitContactForm(data);

            setIsSuccess(true);
            reset();

            // 5秒後重置成功狀態
            setTimeout(() => setIsSuccess(false), 5000);
        } catch (error) {
            console.error("送出失敗", error);
        }
    };

    // 5. 重置成功畫面 (給 "發送新諮詢" 按鈕用)
    const resetSuccess = () => setIsSuccess(false);

    return {
        form,           // 把整個 form 物件回傳 (包含 register, formState 等)
        selectedTags,   // UI 需要做高亮判斷
        toggleTag,      // UI 需要綁定點擊事件
        onSubmit,       // UI 綁定 form submit
        isSuccess,      // UI 切換成功畫面
        resetSuccess,   // UI 切換回表單
    };
}