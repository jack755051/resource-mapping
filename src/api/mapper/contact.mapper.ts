import { OfficeLocation, OfficeType } from '@/type/page/contact';
import { OfficeLocationResDto } from '../response/contact.response';

export class ContactMapper {
  /**
   * 從 officeType.name 映射到 OfficeType
   * 根據中英文名稱判斷類型
   */
  private static mapOfficeType(typeName: string): OfficeType {
    const name = typeName.toLowerCase();
    if (name.includes('總部') || name.includes('headquarters') || name.includes('hq')) {
      return 'hq';
    }
    if (name.includes('倉庫') || name.includes('warehouse')) {
      return 'warehouse';
    }
    return 'branch'; // 默認為分公司
  }

  /**
   * 從 Google Maps 分享連結生成 iframe embed src
   *
   * ⚠️ 注意：最準確的方式是後端直接提供 embedUrl
   * 這裡使用簡化方法：通過地址查詢生成 embed URL（不需要 API key）
   */
  private static generateEmbedSrc(mapUrl: string, address: string): string {
    // 如果已經是 embed 格式，直接返回
    if (mapUrl.includes('/maps/embed')) {
      return mapUrl;
    }

    // 使用 Google Maps 查詢模式嵌入地圖（不需要 API key）
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
  }

  /**
   * 將 API DTO 轉換為 Domain Model
   * ⚠️ 後端返回的 name/address 已經是翻譯後的字符串
   */
  static toDomain(dto: OfficeLocationResDto): OfficeLocation {
    return {
      id: dto.id,
      type: this.mapOfficeType(dto.officeType.name),

      // 🔥 後端已翻譯，直接使用字符串
      title: dto.name,

      address: {
        // 🔥 後端已翻譯，直接使用字符串
        label: dto.address,
        mapLink: dto.mapUrl,
        embedSrc: this.generateEmbedSrc(dto.mapUrl, dto.address),
      },

      contact: {
        phones: dto.phones,
        fax: dto.fax,
        email: dto.email,
      },
    };
  }

  /**
   * 批次轉換 (陣列處理)
   */
  static toDomainList(dtos: OfficeLocationResDto[]): OfficeLocation[] {
    return dtos.map(dto => this.toDomain(dto));
  }
}
