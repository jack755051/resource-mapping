import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SystemState } from '@/type/store';
import { SupportCategory } from '@/type/page/support';
import { ProductCategory } from '@/type/page/product';
import { OfficeLocation } from '@/type/page/contact';
import { SupportService } from '@/api/services/support.service';
import { ProductService } from '@/api/services/product.service';
import { ContactService } from '@/api/services/contact.service';
import { SupportMapper } from '@/api/mapper/support.mapper';
import { ContactMapper } from '@/api/mapper/contact.mapper';
import { MOCK_SUPPORT_CATEGORIES } from '@/mock/support';
import { MOCK_CONTACT_API_RESPONSE } from '@/mock/contact';

// 扩展状态，添加 loading 和 error
interface ExtendedSystemState extends SystemState {
  isLoading: boolean;
  error: string | null;
}

const initialState: ExtendedSystemState = {
  supportCategories: [],
  locationsCategories: [],
  productCategories: [],
  isLoading: false,
  error: null,
};

// ==================== Async Thunks ==================== //

/**
 * 获取所有系统资源（支援分类、产品分类、地点）
 * 当语系切换时调用此 thunk
 */
export const fetchSystemResources = createAsyncThunk(
  'system/fetchResources',
  async (language: string, { rejectWithValue }) => {
    try {
      console.log('[Redux System] Fetching resources for:', language);

      // 使用 Promise.allSettled 平行载入，即使某些失败也不影响其他
      const results = await Promise.allSettled([
        SupportService.handleGetSupportCategories(language),
        ProductService.handleGetProductCategories(language),
        ContactService.handleGetLocations(language),
      ]);

      // 处理 Support Categories
      let supportCategories: SupportCategory[] = [];
      if (results[0].status === 'fulfilled') {
        supportCategories = results[0].value;
      } else {
        console.warn(
          '[Redux System] SupportCategories API Failed, using Mock Data.',
          results[0].reason
        );
        supportCategories = SupportMapper.toDomainCategoryList(
          MOCK_SUPPORT_CATEGORIES
        );
      }

      // 处理 Product Categories
      let productCategories: ProductCategory[] = [];
      if (results[1].status === 'fulfilled') {
        productCategories = results[1].value;
      } else {
        console.warn(
          '[Redux System] ProductCategories API Failed, using empty array.',
          results[1].reason
        );
        productCategories = [];
      }

      // 处理 Locations
      let locationsCategories: OfficeLocation[] = [];
      if (results[2].status === 'fulfilled') {
        locationsCategories = results[2].value;
      } else {
        console.warn(
          '[Redux System] Locations API Failed, using Mock Data.',
          results[2].reason
        );
        locationsCategories = ContactMapper.toDomainList(
          MOCK_CONTACT_API_RESPONSE
        );
      }

      return {
        supportCategories,
        productCategories,
        locationsCategories,
      };
    } catch (error: any) {
      console.error('[Redux System] Resource fetch failed', error);
      return rejectWithValue(
        error.message || 'Failed to fetch system resources'
      );
    }
  }
);

// ==================== Slice ==================== //

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    // 清除错误
    clearError: state => {
      state.error = null;
    },
    // 重置所有资源（可选，用于登出等场景）
    resetResources: state => {
      state.supportCategories = [];
      state.productCategories = [];
      state.locationsCategories = [];
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // fetchSystemResources - pending
      .addCase(fetchSystemResources.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      // fetchSystemResources - fulfilled
      .addCase(fetchSystemResources.fulfilled, (state, action) => {
        state.isLoading = false;
        state.supportCategories = action.payload.supportCategories;
        state.productCategories = action.payload.productCategories;
        state.locationsCategories = action.payload.locationsCategories;
        state.error = null;
      })
      // fetchSystemResources - rejected
      .addCase(fetchSystemResources.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Unknown error';
      });
  },
});

// ==================== Exports ==================== //

export const { clearError, resetResources } = systemSlice.actions;
export default systemSlice.reducer;

// ==================== Selectors ==================== //

export const selectSupportCategories = (state: {
  system: ExtendedSystemState;
}) => state.system.supportCategories;

export const selectProductCategories = (state: {
  system: ExtendedSystemState;
}) => state.system.productCategories;

export const selectLocationsCategories = (state: {
  system: ExtendedSystemState;
}) => state.system.locationsCategories;

export const selectSystemIsLoading = (state: { system: ExtendedSystemState }) =>
  state.system.isLoading;

export const selectSystemError = (state: { system: ExtendedSystemState }) =>
  state.system.error;

// 组合 selector - 获取所有资源
export const selectSystemResources = (state: {
  system: ExtendedSystemState;
}) => ({
  supportCategories: state.system.supportCategories,
  productCategories: state.system.productCategories,
  locations: state.system.locationsCategories,
});
