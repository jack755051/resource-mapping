// src/hooks/useContactForm.ts
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner'; // 1. 引入 toast

import { ContactFormData, contactFormSchema } from '@/schema/contact';
import { ContactService } from '@/api/services/contact.service'; // 2. 引入 Service
import { ContactFormReqDto } from '@/api/request/contact.request'; // 引入 DTO

export function useContactForm() {
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: '',
            phone: '',
            email: '',
            type: [],
            message: '',
        },
    });

    const { setValue, watch, reset } = form;
    const selectedTags = watch('type') || [];

    const toggleTag = (tagKey: string) => {
        const current = selectedTags;
        if (current.includes(tagKey)) {
            setValue('type', current.filter((t) => t !== tagKey));
        } else {
            setValue('type', [...current, tagKey]);
        }
    };

    // 3. 修改送出邏輯：串接真實 API 與 Toast
    const onSubmit = async (data: ContactFormData) => {
        try {
            // 轉換 Form Data 為 API Request DTO (如果欄位名稱完全一樣可省略轉換)
            const payload: ContactFormReqDto = {
                name: data.name,
                phone: data.phone,
                email: data.email,
                type: data.type,
                message: data.message
            };

            // 呼叫 Service
            const response = await ContactService.handlePostContactForm(payload);

            // 成功提示
            toast.success(response.message || '諮詢已送出成功！'); // 假設後端回傳有 message

            setIsSuccess(true);
            reset();

            // 5秒後重置成功狀態
            setTimeout(() => setIsSuccess(false), 5000);

        } catch (error: any) {
            // 4. 錯誤處理 (解決 TS 報錯)
            console.error("送出失敗", error);

            // 這裡使用 error?.message 或是 fallback 文字
            // 如果 error 是 axios/fetch error，通常在 error.data 或 error.message 裡
            const errorMsg = error?.data?.message || error?.message || '發送失敗，請稍後再試';
            toast.error('發送失敗，請稍後再試');
        }
    };

    const resetSuccess = () => setIsSuccess(false);

    // 新增：清除表單邏輯
    const handleClear = () => {
        reset();
    };

    return {
        form,
        selectedTags,
        toggleTag,
        onSubmit,
        isSuccess,
        resetSuccess,
        handleClear,
    };
}