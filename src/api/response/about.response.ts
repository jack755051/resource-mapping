export interface ITimelineItem {
    year: string;
    label: string;
    title: string;
    description: string;
}

export interface ITimelineSection {
    header?: {
        title: string;
        description: string;
        cta_text: string;
        cta_link?: string;
    };
    items?: ITimelineItem[];
}

export interface IAboutResponse {
    timeline: ITimelineSection;
}