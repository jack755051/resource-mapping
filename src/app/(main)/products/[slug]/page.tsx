import { PRODUCT_SLUGS } from '@/config/static-paths';
import { ProductDetailContent } from './product-detail-content';

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

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProductDetailContent slug={slug} />;
}
