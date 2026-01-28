import { contentProps } from "../common";

export interface ProductGallery {
    images: string[];
    activeIndex: number;
    onIndexChange: (index: number) => void;
}

export interface ProductGalleryClasses {
    container?: string;
    imageWrapper?: string;
    image?: string;
    badge?: string;
    content?: string;
    title?: string;
    specsGrid?: string;
    footer?: string;
}

export interface ProductGalleryProps extends contentProps<ProductGallery, ProductGalleryClasses> {
}
