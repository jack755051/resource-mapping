import { MOCK_LOCATIONS } from '@/mock/contact';

export function useContact() {
    return {
        data: {
            locations: MOCK_LOCATIONS,
            formConfig: {
                inquiryTags: ['community', 'lpr', 'dvr', 'maintenance', 'other'],
            },
        },
    };
}