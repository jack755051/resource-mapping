'use client';

import { ContactForm } from './form';
import { ContactInfo } from './info';
import { useContact } from '@/hooks/useContact';
import { useSystem } from '@/provider/systemProvider';

export function ContactMainContent() {
  const { data } = useContact();
  const { formConfig } = data;

  // 🔥 從 SystemProvider 獲取 locations（系統參數）
  const { resources } = useSystem();
  const { locations } = resources;

  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* 左側：表單組件 */}
        <ContactForm inquiryTags={formConfig.inquiryTags} />

        {/* 右側：資訊組件 */}
        <ContactInfo locations={locations} />
      </div>
    </div>
  );
}
