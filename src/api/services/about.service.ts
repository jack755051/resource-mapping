import { CommonUrl } from "../url";
import { ofetch } from "ofetch";
import { ITimelineSection } from "../response/about.response";

export const AboutService = {

    /**
         * 取得關於我時間軸
         * @param lang - 當前語系代碼 (e.g., 'zh', 'en')
         */
    handleGetTimeline: async (lang: string): Promise<ITimelineSection> => {
        return await ofetch<ITimelineSection>(CommonUrl.ABOUT_TIMELINE, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': lang,
            },
        });
    }
}