// hooks/useSolution.ts
import { CarouselSlide } from "@/type/page/solutions";

export function useSolution() {
    // 這裡我們只定義資料結構與 Key，不進行翻譯
    // 將 caption 改為對應的 i18n key
    const slides: CarouselSlide[] = [
        {
            src: '/images/solutions-server_room.jpg',
            caption: 'solutions.quality.slides.1.caption', // 對應 Key
            tag: 'solutions.quality.slides.1.tag'         // 對應 Key
        },
        {
            src: '/images/solutions-copper_cable.jpg',
            caption: 'solutions.quality.slides.2.caption',
            tag: 'solutions.quality.slides.2.tag'
        },
        {
            src: '/images/solutions-test.jpg',
            caption: 'solutions.quality.slides.3.caption',
            tag: 'solutions.quality.slides.3.tag'
        },
    ];

    return {
        slides
    };
}