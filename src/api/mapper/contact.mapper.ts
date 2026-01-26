
import { OfficeLocation, OfficeType } from '@/type/page/contact';
import { OfficeLocationResDto } from '../response/contact.response';

export class ContactMapper {
    /**
     * 將 API DTO 轉換為 Domain Model
     */
    static toDomain(dto: OfficeLocationResDto): OfficeLocation {
        return {
            id: dto.id,
            type: dto.type as OfficeType,

            title: dto.title,

            address: {
                label: dto.address.label,
                mapLink: dto.address.map_url,
                embedSrc: dto.address.embed_code,
            },

            contact: {
                phones: dto.contact_info.phones,
                fax: dto.contact_info.fax,
                email: dto.contact_info.email,
            }
        };
    }

    /**
     * 批次轉換 (陣列處理)
     */
    static toDomainList(dtos: OfficeLocationResDto[]): OfficeLocation[] {
        return dtos.map(dto => this.toDomain(dto));
    }
}