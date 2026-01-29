import { SupportListResDto } from '../response/support.response';
import { SupportResource, CategoryId, ResourceType } from '@/type/page/support';

export class SupportMapper {
    /**
     * 單一轉換：將 API DTO 轉為 UI 用的 Domain Model
     */
    static toDomain(dto: SupportListResDto): SupportResource {
        return {
            id: dto.id,
            title: dto.title,
            date: dto.date, // 如果需要格式化日期，可在此引入 date-fns 處理

            // 1. 處理 Category (強轉型 + 安全檢查)
            category: this.mapCategory(dto.category),

            // 2. 處理 Type (強轉型)
            type: this.mapType(dto.type),

            // 3. 處理 Size (假設後端已改為 number，若後端仍給 string 需在此 parseFloat)
            size: dto.size
        };
    }

    /**
     * 批次轉換
     */
    static toDomainList(dtos: SupportListResDto[]): SupportResource[] {
        // 加上保護：確保 dtos 存在且是陣列
        if (!Array.isArray(dtos)) return [];
        return dtos.map((dto) => this.toDomain(dto));
    }

    // --- Helper Methods (處理字串對應 Enum 的髒活) ---

    private static mapCategory(cat: string): CategoryId {
        // 將後端可能的大寫轉小寫，確保對應
        const normalized = cat.toLowerCase();

        // 檢查是否為合法的 CategoryId，若不是則給個預設值 (如 'faq' 或 'manual')
        const validCategories: CategoryId[] = ['manual', 'firmware', 'software', 'faq'];

        if (validCategories.includes(normalized as CategoryId)) {
            return normalized as CategoryId;
        }
        return 'manual'; // Fallback 預設值，避免前端報錯
    }

    private static mapType(type: string): ResourceType {
        const normalized = type.toUpperCase(); // 假設前端定義 ResourceType 是 'PDF' (大寫)

        const validTypes: ResourceType[] = ['PDF', 'ZIP', 'Article', 'EXE'];

        if (validTypes.includes(normalized as ResourceType)) {
            return normalized as ResourceType;
        }
        return 'Article'; // Fallback
    }
}