import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation'; // 引入 hook
import { useSearchParams } from 'next/navigation';

import { ContactFormData, contactFormSchema } from '@/schema/contact';
import { ContactService } from '@/api/services/contact.service';
import { ContactFormReqDto } from '@/api/request/contact.request';

export function useContactForm() {
  // 1. 取得當前語系
  const { language } = useTranslation();
  const [isSuccess, setIsSuccess] = useState(false);
  const searchParams = useSearchParams();

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

  // 2. 從 URL 參數初始化表單
  useEffect(() => {
    const message = searchParams.get('message');
    const type = searchParams.get('type');

    if (message) {
      form.setValue('message', decodeURIComponent(message));
    }

    if (type) {
      const tags = type.split(',');
      form.setValue('type', tags);
    }
  }, [searchParams, form]);

  const { setValue, watch, reset } = form;
  const selectedTags = watch('type') || [];

  const toggleTag = (tagKey: string) => {
    const current = selectedTags;
    if (current.includes(tagKey)) {
      setValue(
        'type',
        current.filter(t => t !== tagKey)
      );
    } else {
      setValue('type', [...current, tagKey]);
    }
  };

  /**
   * 提交表單
   */
  const onSubmit = async (data: ContactFormData) => {
    try {
      const payload: ContactFormReqDto = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        type: data.type,
        message: data.message,
      };

      // 2. 傳遞 language 給 Service (讓後端知道要回傳中文還英文的訊息)
      const response = await ContactService.handlePostContactForm(
        payload,
        language
      );

      toast.success(response.message || '諮詢已送出成功！');

      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error: any) {
      console.error('送出失敗', error);
      const errorMsg =
        error?.data?.message || error?.message || '發送失敗，請稍後再試';
      toast.error(errorMsg);
    }
  };

  const resetSuccess = () => setIsSuccess(false);

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
