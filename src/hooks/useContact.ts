// src/hooks/useContact.ts
import { useState, useEffect } from 'react';
import { OfficeLocation } from '@/type/page/contact';
import { ContactService } from '@/api/services/contact.service';

export function useContact() {
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
            locations,
            formConfig: {
                inquiryTags: ['community', 'lpr', 'dvr', 'maintenance', 'other'],
            },
        },
        loading,
    };
}