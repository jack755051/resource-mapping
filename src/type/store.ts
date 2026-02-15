import { SupportCategory } from '@/type/page/support';
import { OfficeLocation } from '@/type/page/contact';
import { ProductCategory } from '@/type/page/product';

export interface SystemState {
  supportCategories: SupportCategory[];
  productCategories: ProductCategory[];
  locationsCategories: OfficeLocation[];
}
