import { LocalizedString } from "./i18n";
import { ProductCategory } from "./page/product";
import { SupportCategory } from "./page/support";

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

// ====== 篩選的型別 =======
export interface CommonFilter {
  id: string;
  label: LocalizedString;
  active?: boolean;
  slug?: string;
  onFilterClick?: (id: string) => void; // 改为可选，因为组件可以直接使用 hook 的方法
}

// export interface SystemParams {
//   supportCategories: SupportCategory[];
//   productCategories: ProductCategory[];
//   officeCategories: OfficeCategory[];
// }