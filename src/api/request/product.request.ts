export interface ProductListReqDto {
    page: number;
    limit: number;
    category?: string;
    keyword?: string;
    sort?: string;
}