/**
 * 通用 URL 參數替換工具
 * @param url - 原始 URL (例如: '/clients/:clientId/orders/:orderId')
 * @param params - 參數物件 (例如: { clientId: '123', orderId: '456' })
 */
export const replaceUrlParams = (url: string, params: Record<string, string | number>) => {
    let result = url

    Object.entries(params).forEach(([key, value]) => {
        // 使用正則表達式，確保只替換 :key，並處理邊界
        // 這裡的 :${key} 會動態匹配傳入的 key
        result = result.replace(new RegExp(`:${key}\\b`, 'g'), String(value))
    })

    return result
}


export enum CommonUrl {
    CONTACT_FORM = '/contact/form',
}