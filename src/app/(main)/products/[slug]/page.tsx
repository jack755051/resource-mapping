import { PRODUCT_SLUGS } from '@/config/static-paths';
import { ProductDetailContent } from './product-detail-content';
import { Metadata } from 'next';

/**
 * 生成静态路径 - 用于 Next.js 静态导出
 *
 * 注意：在 output: 'export' 模式下，所有动态路由都必须预先生成
 * 请在 src/config/static-paths.ts 中配置所有产品的 slug
 */
export async function generateStaticParams() {
  return PRODUCT_SLUGS.map((slug) => ({
    slug,
  }));
}

/**
 * 只允许预定义的静态路径
 * 如果访问未在 generateStaticParams 中定义的路径，将显示 404
 */
export const dynamicParams = false;

/**
 * 生成動態 Metadata
 * TODO: 未來可優化為從 API 獲取實際產品資料
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // 目前使用通用 metadata，未來可以根據 slug 獲取實際產品資料
  return {
    title: '產品詳情',
    description: '查看光訊科技的專業安防監控產品詳細資訊，包括產品規格、功能特色、下載資源等。',
    openGraph: {
      title: '產品詳情 | Guangxun Tech',
      description: '查看光訊科技的專業安防監控產品詳細資訊。',
      url: `https://guangxun.net/products/${slug}`,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // ✅ 只傳遞 slug，id 會在客戶端組件中透過 useSearchParams 讀取
  return <ProductDetailContent slug={slug} />;
}
