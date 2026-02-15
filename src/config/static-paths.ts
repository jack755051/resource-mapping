/**
 * 自动生成的静态路径配置
 * 由 scripts/generate-product-slugs.ts 生成
 *
 * ⚠️ 此文件会在构建时自动更新，请勿手动编辑！
 * 如需添加产品，请在后台管理系统中添加，然后重新构建
 *
 * 生成时间: 2026-02-15T21:31:01.071Z
 * 产品数量: 32
 */
export const PRODUCT_SLUGS: string[] = [
  "DVR-5116HD",
  "NVR-BH08VHD",
  "NVR-BH16VHD2",
  "NVR-BH16VHD4-16P",
  "NVR-BH32VHD8",
  "NVR-BH32VHD8-16P",
  "NVR-BH04VHD",
  "CP-DS20X-HD36",
  "CP-DS36X-HD",
  "CP-DS36X-HD-5MP",
  "CP-DS20X-HDC",
  "CP-DS20X-HDC-5MP",
  "CP-DS36X-HDC",
  "CP-DS36X-HDN",
  "CP-DS36X-HD20",
  "CP-DS20X-HD",
  "CP-DS05X-HD20",
  "GP-BH04IP-Z",
  "GP-BH045IP",
  "GP-BH045IP-Z",
  "GP-BH048IP-AFZ",
  "GC-ST0454",
  "GC-ST0254",
  "GC-ST075HDZ",
  "GC-AHD100-550",
  "GC-AHD70-288",
  "GC-AHD50-288",
  "GC-AHD30-6",
  "GC-30450-W288",
  "GC-IP30-W288",
  "GC-IP50-R27135",
  "GC-IP50-W288"
];

/**
 * 获取所有产品 slug（用于构建时）
 */
export async function getAllProductSlugs(): Promise<string[]> {
  return PRODUCT_SLUGS;
}
