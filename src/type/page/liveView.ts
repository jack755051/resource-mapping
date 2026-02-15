import { string } from 'zod';

export interface LiveChannelViewModel {
  id: string;
  name: string;
  youtubeChannelId?: string;
  youtubeVideoId?: string;
  isOffline?: boolean;
}

export interface LiveViewGalleryViewModel {
  id: string;
  cover: string;
  images: string[];
  titleKey: string;
  metaKey: string;
  tagKey: string;
}
