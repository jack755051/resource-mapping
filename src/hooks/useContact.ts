/**
 * useContact hook
 *
 * ⚠️ 注意：locations 資料已移至 SystemProvider 統一管理
 * 此 hook 僅負責表單相關的配置和邏輯
 */
export function useContact() {
  return {
    data: {
      formConfig: {
        inquiryTags: ['community', 'lpr', 'dvr', 'maintenance', 'other'],
      },
    },
  };
}
