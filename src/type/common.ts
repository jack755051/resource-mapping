export interface Pagination {
    current: number;
    pageSize: number;
    total: number;
    totalPages: number;
}

export interface PaginatedList<T> {
    list: T[];
    pagination: Pagination;
}