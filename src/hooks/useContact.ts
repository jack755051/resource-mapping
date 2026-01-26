import { useState, useEffect } from 'react';
import { OfficeLocation } from '@/type/page/contact';
import { ContactService } from '@/api/services/contact.service';

// 1. 引入 Mock 資料與 Mapper (為了 fallback 用)
import { MOCK_CONTACT_API_RESPONSE } from '@/mock/contact';
import { ContactMapper } from '@/api/mapper/contact.mapper';

export function useContact() {
    const [locations, setLocations] = useState<OfficeLocation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                setLoading(true);
                // 2. 嘗試呼叫真實 API
                const data = await ContactService.handleGetLocations();
                setLocations(data);
            } catch (error) {
                // 3. 捕捉錯誤：當 API 失敗 (404/500) 時進入這裡
                console.warn("API Request Failed, falling back to Mock Data.", error);

                // 4. 執行 Fallback：將 Mock DTO 轉為 Domain Model 並設定回去
                const fallbackData = ContactMapper.toDomainList(MOCK_CONTACT_API_RESPONSE);
                setLocations(fallbackData);
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, []);

    return {
        data: {
            locations,
            formConfig: {
                inquiryTags: ['community', 'lpr', 'dvr', 'maintenance', 'other'],
            },
        },
        loading,
    };
}