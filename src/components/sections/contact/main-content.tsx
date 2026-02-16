'use client';

import { ContactForm } from './form';
import { ContactInfo } from './info';
import { useContact } from '@/hooks/useContact';
import { useAppSelector } from '@/store/hooks';
import { selectLocationsCategories } from '@/store/slices/system.slice';

export function ContactMainContent() {
  const { data } = useContact();
  const { formConfig } = data;

  // 🔥 从 Redux 获取 locations（系统参数）
  const locations = useAppSelector(selectLocationsCategories);

  return (
    <div className="section-container section-y">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* 左側：表單組件 */}
        <ContactForm inquiryTags={formConfig.inquiryTags} />

        {/* 右側：資訊組件 */}
        <ContactInfo locations={locations} />
      </div>
    </div>
  );
}
