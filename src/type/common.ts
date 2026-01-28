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

export interface contentProps<T, S> {
    props: T;
    className?: string;
    classNames?: S;
}