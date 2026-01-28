import { ProductCardData } from "@/type/page/product";
import { Pagination } from "@/type/common";
import { ProductListReqDto } from "@/api/request/product.request";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductService } from "@/api/services/product.service";
import { ConstantProductsCategoriesResDto } from "@/api/response/constant.response";
import { ConstantsService } from "@/api/services/constants.service";

// 1. 定義 State 結構
interface ProductState {
    list: ProductCardData[];
    categories: ConstantProductsCategoriesResDto[],
    pagination: Pagination | null;
    loading: boolean;
    error: string | null;
    // 儲存當前的查詢條件
    queryParams: ProductListReqDto;
}

export const fetchCategories = createAsyncThunk(
    'product/fetchCategories',
    async (lang: string, { rejectWithValue }) => {
        try {
            return await ConstantsService.handleGetProductsCategories(lang);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// 2. 定義 Async Thunk (處理 API 請求)
// 第一個泛型是回傳值，第二個是傳入參數(這裡我們傳入 lang)
export const fetchProducts = createAsyncThunk(
    'product/fetchList',
    async (lang: string, { getState, rejectWithValue }) => {
        try {
            // 從目前的 state 取得查詢參數
            const state = getState() as any;
            const params = state.product.queryParams;

            // 呼叫我們之前寫好的 Service
            const response = await ProductService.handleGetProducts(params, lang);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// 預設查詢條件
const initialParams: ProductListReqDto = {
    page: 1,
    limit: 12,
    category: undefined, // undefined 代表 'all'
    sort: 'asc'
};

const initialState: ProductState = {
    list: [],
    categories: [],
    pagination: null,
    loading: false,
    error: null,
    queryParams: initialParams,
};

// 3. 建立 Slice
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        // 設定分類 (這會觸發重新抓取，但在 Hook 裡做)
        setCategory(state, action: PayloadAction<string>) {
            state.queryParams.category = action.payload === 'all' ? undefined : action.payload;
            state.queryParams.page = 1; // 切換分類時重置回第一頁
        },
        // 設定頁碼
        setPage(state, action: PayloadAction<number>) {
            state.queryParams.page = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload.list; // Mapper 轉好的資料
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setCategory, setPage } = productSlice.actions;
export default productSlice.reducer;