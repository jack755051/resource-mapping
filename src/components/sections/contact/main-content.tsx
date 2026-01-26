'use client';

import { useContact } from '@/hooks/useContact';
import { ContactForm } from './form';
import { ContactInfo } from './info';

export function ContactMainContent() {
    const { data } = useContact();
    const { locations, formConfig } = data;

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