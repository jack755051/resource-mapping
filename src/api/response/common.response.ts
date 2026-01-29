export interface APIResponse<T> {
  success: boolean;
  message: string;
  code: number;
  data: T;
}

export interface PaginationDto {
  current_page: number;
  total_pages: number;
  total_items: number;
  items_per_page: number;
}

export interface PaginatedResDto<T> {
  data: T[];
  meta: {
    pagination: PaginationDto;
  };
}
