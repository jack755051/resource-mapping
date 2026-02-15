/**取得頻道ID列表**/
export interface LiveViewListResDto {
  id: string;
  name: string;
}

export interface LiveViewResDto {
  id: string;
  name: string;
}

export interface LiveViewGalleryResDto {
  id: string;
  main_image: string;
  image_url: string[];
  title: string;
  subtitle: string;
  tag: string;
}
