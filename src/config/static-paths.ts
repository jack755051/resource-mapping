/**
 * 静态路径配置
 * 用于 Next.js 静态导出时生成预渲染页面
 *
 * 使用说明：
 * 1. 在此文件中添加所有需要预渲染的产品 slug
 * 2. 运行 `npm run build` 时，这些页面会被生成为静态 HTML
 * 3. 如果产品数据来自 API，可以在构建前运行脚本获取所有 slug
 *
 * 注意：
 * - 在 output: 'export' 模式下，必须预先定义所有动态路由
 * - 未在此列表中的 slug 将显示 404 页面
 * - 如果暂时没有产品，可以保持为空数组（但产品页面将无法访问）
 */
export const PRODUCT_SLUGS: string[] = [
  // 真实产品列表
  'gwgreg',  // 添加您的产品 slug
  'example-product', // 保留示例

  // 如果有更多产品，继续添加
  // 'gc-ip50-w288',
  // 'smart-eye-x1',
  // 'speed-dome-pro',

  // 或者从外部文件导入
  // ...importedProductSlugs,
];

/**
 * 获取所有产品 slug（用于构建时）
 * 如果需要从 API 获取，可以在这里实现
 */
export async function getAllProductSlugs(): Promise<string[]> {
  // TODO: 实现从 API 或 CMS 获取产品列表的逻辑
  // 例如：
  // const response = await fetch('https://api.example.com/products');
  // const products = await response.json();
  // return products.map(p => p.slug);

  return PRODUCT_SLUGS;
}
