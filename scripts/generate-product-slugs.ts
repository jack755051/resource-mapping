/**
 * 构建时脚本：从 API 获取所有产品 slug
 * 使用方法: npm run generate-slugs (需要在 package.json 中添加脚本)
 *
 * 或者在 next.config.ts 中的构建前钩子中调用
 */

import fs from 'fs';
import path from 'path';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://guangxun.net/api/v1';

interface Product {
  id: string;
  slug: string;
  // 其他产品字段...
}

// 匹配后端实际返回的结构
interface ApiResponse {
  success: boolean;
  code: number;
  message: string;
  data: {
    items: Product[];
    meta: {
      total: number; // 总数
      page: number; // 当前页
      limit: number; // 每页数量
      lastPage: number; // 总页数
    };
  };
}

/**
 * 从 API 获取所有产品 slug
 */
async function fetchAllProductSlugs(): Promise<string[]> {
  const slugs: string[] = [];
  let currentPage = 1;
  let totalPages = 1;

  try {
    // 第一次请求获取总页数
    const firstResponse = await fetch(
      `${API_BASE_URL}/products?page=1&limit=100`,
      {
        headers: {
          'Accept-Language': 'zh', // 使用任意语言即可
        },
      }
    );

    if (!firstResponse.ok) {
      throw new Error(`API request failed: ${firstResponse.status}`);
    }

    const firstData: ApiResponse = await firstResponse.json();
    const { total, limit, lastPage } = firstData.data.meta;
    totalPages = lastPage;

    // 添加第一页的 slug
    slugs.push(...firstData.data.items.map(p => p.slug));

    console.log(`📦 Found ${total} products across ${totalPages} pages`);

    // 获取剩余页面
    for (let page = 2; page <= totalPages; page++) {
      const response = await fetch(
        `${API_BASE_URL}/products?page=${page}&limit=100`,
        {
          headers: {
            'Accept-Language': 'zh',
          },
        }
      );

      if (!response.ok) {
        console.warn(`⚠️  Failed to fetch page ${page}`);
        continue;
      }

      const data: ApiResponse = await response.json();
      slugs.push(...data.data.items.map(p => p.slug));
      console.log(`✓ Fetched page ${page}/${totalPages}`);
    }

    return slugs;
  } catch (error) {
    console.error('❌ Failed to fetch product slugs:', error);
    // 返回空数组，使用默认的 slug 列表
    return [];
  }
}

/**
 * 生成 static-paths.ts 文件
 */
async function generateStaticPathsFile() {
  console.log('🚀 Generating product slugs...\n');

  const slugs = await fetchAllProductSlugs();

  if (slugs.length === 0) {
    console.warn('⚠️  No slugs fetched, keeping existing configuration');
    return;
  }

  const fileContent = `/**
 * 自动生成的静态路径配置
 * 由 scripts/generate-product-slugs.ts 生成
 *
 * ⚠️ 此文件会在构建时自动更新，请勿手动编辑！
 * 如需添加产品，请在后台管理系统中添加，然后重新构建
 *
 * 生成时间: ${new Date().toISOString()}
 * 产品数量: ${slugs.length}
 */
export const PRODUCT_SLUGS: string[] = ${JSON.stringify(slugs, null, 2)};

/**
 * 获取所有产品 slug（用于构建时）
 */
export async function getAllProductSlugs(): Promise<string[]> {
  return PRODUCT_SLUGS;
}
`;

  const filePath = path.join(process.cwd(), 'src/config/static-paths.ts');
  fs.writeFileSync(filePath, fileContent, 'utf-8');

  console.log(`\n✅ Generated ${slugs.length} product slugs`);
  console.log(`📝 Updated: src/config/static-paths.ts`);
  console.log('\nProduct slugs:');
  slugs.forEach((slug, index) => {
    console.log(`  ${index + 1}. ${slug}`);
  });
}

// 执行脚本
generateStaticPathsFile().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
