export interface TimelineItem {
  year: string;
  label: string;
  title: string;
  description: string;
  isActive?: boolean;
}

export interface TimelineSection {
  // 🔥 修正：移除 header 後面的問號
  header: {
    title: string;
    description: string;
    ctaText: string;
    ctaLink?: string; // 這個可以保留問號，因為組件內有做 || '/contact' 的處理
  };
  // 🔥 修正：移除 items 後面的問號
  items: TimelineItem[];
}
