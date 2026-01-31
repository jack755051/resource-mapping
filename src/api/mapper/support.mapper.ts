import { SupportCategoryResDto, SupportListResDto } from '../response/support.response';
import { SupportResource, CategoryId, ResourceType, SupportCategory } from '@/type/page/support';

export class SupportMapper {
    // ==========================================
    // Public Methods: 列表資源轉換 (Resource List)
    // ==========================================

    /**
     * 單一轉換：將 API DTO 轉為 UI 用的 Domain Model (SupportResource)
     */
    static toDomain(dto: SupportListResDto): SupportResource {
        return {
            id: dto.id,
            title: dto.title,
            date: dto.date,
            // 這裡呼叫統一的 Helper 處理字串轉 Enum
            category: this.mapCategory(dto.category),
            type: this.mapType(dto.type),
            size: dto.size
        };
    }

    /**
     * 批次轉換列表資源
     */
    static toDomainList(dtos: SupportListResDto[]): SupportResource[] {
        if (!Array.isArray(dtos)) return [];
        return dtos.map((dto) => this.toDomain(dto));
    }

    // ==========================================
    // Public Methods: 分類轉換 (Categories)
    // ==========================================

    /**
     * 單一轉換：將 API 分類 DTO 轉為 UI 用的 Domain Model (SupportCategory)
     */
    static toDomainCategory(dto: SupportCategoryResDto): SupportCategory {
        return {
            id: this.mapCategoryId(dto.id), // 使用 helper 確保 ID 符合 CategoryId 類型
            // 直接把後端的多語系物件 (zh, en) 傳給 Domain，讓 UI 決定顯示哪種語言
            label: dto.name
        };
    }

    /**
     * 批次轉換分類
     */
    static toDomainCategoryList(dtos: SupportCategoryResDto[]): SupportCategory[] {
        if (!Array.isArray(dtos)) return [];
        return dtos.map(dto => this.toDomainCategory(dto));
    }

    // ==========================================
    // Private Helpers: 資料清洗與轉型
    // ==========================================

    /**
     * 處理分類選單的 ID 字串轉換 (用於 SupportCategory)
     * 與 mapCategory 不同，這個方法支持 'all' 分類
     */
    private static mapCategoryId(id: string): CategoryId {
        if (!id) return 'all'; // 防止 undefined/null

        // 將後端可能的大寫轉小寫
        const normalized = id.toLowerCase();

        // 定義合法的 CategoryId 清單 (包含 'all')
        const validCategories: CategoryId[] = ['all', 'manual', 'firmware', 'software', 'faq'];

        if (validCategories.includes(normalized as CategoryId)) {
            return normalized as CategoryId;
        }

        // Fallback: 如果後端傳來未知的分類，預設歸類為 all
        console.warn(`Unknown category ID: ${id}, fallback to 'all'`);
        return 'all';
    }

    /**
     * 處理 Category ID 字串轉換 (確保符合前端 Enum)
     * 用於資源列表，不包含 'all'
     */
    private static mapCategory(cat: string): CategoryId {
        if (!cat) return 'manual'; // 防止 undefined/null

        // 將後端可能的大寫轉小寫
        const normalized = cat.toLowerCase();

        // 定義合法的 CategoryId 清單
        // 注意：'all' 通常是前端虛擬的分類，後端資源通常不會標記為 'all'
        const validCategories: CategoryId[] = ['manual', 'firmware', 'software', 'faq'];

        if (validCategories.includes(normalized as CategoryId)) {
            return normalized as CategoryId;
        }

        // Fallback: 如果後端傳來未知的分類，預設歸類為 manual 或其他安全值
        return 'manual';
    }

    /**
     * 處理 Resource Type 字串轉換 (PDF, ZIP...)
     */
    private static mapType(type: string): ResourceType {
        if (!type) return 'Article';

        // 統一轉大寫
        const normalized = type.toUpperCase();

        const validTypes: ResourceType[] = ['PDF', 'ZIP', 'Article', 'EXE'];

        if (validTypes.includes(normalized as ResourceType)) {
            return normalized as ResourceType;
        }

        // Fallback
        return 'Article';
    }
}