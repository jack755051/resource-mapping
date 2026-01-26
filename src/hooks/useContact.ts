import { useState, useEffect } from 'react';
import { OfficeLocation } from '@/type/page/contact';
import { ContactService } from '@/services/contact.service';

export function useContact() {
    // 因為變成模擬非同步，建議加上 loading 狀態
    const [locations, setLocations] = useState<OfficeLocation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const data = await ContactService.getLocations();
                setLocations(data);
            } catch (error) {
                console.error("Failed to fetch locations", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, []);

    return {
        data: {
            locations, // 這裡拿到的已經是經過 Mapper 轉換後的乾淨資料
            formConfig: {
                inquiryTags: ['community', 'lpr', 'dvr', 'maintenance', 'other'],
            },
        },
        loading,
    };
}