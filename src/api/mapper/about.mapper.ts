import { TimelineItem, TimelineSection } from "@/type/page/about";
import { ITimelineItem, ITimelineSection } from "../response/about.response";


/** 獨立的 Item Mapper */
class TimelineItemMapper {
    static toDomain(dto: ITimelineItem): TimelineItem {
        // 商業邏輯：如果是 'Future' 或者是當前年份，就設為活躍狀態
        const currentYear = new Date().getFullYear().toString();
        const isActive = dto.year === 'Future' || dto.year === currentYear;

        return {
            year: dto.year,
            label: dto.label,
            title: dto.title,
            description: dto.description,
            isActive: isActive
        };
    }
}

/** 主 Mapper */
export class AboutMapper {
    static toAboutTimelineSection(dto: ITimelineSection): TimelineSection {
        return {
            header: {
                title: dto.header?.title ?? '',
                description: dto.header?.description ?? '',
                ctaText: dto.header?.cta_text ?? '',
                ctaLink: dto.header?.cta_link ?? '',
            },
            items: dto.items?.map(TimelineItemMapper.toDomain) ?? [],
        };
    }
}