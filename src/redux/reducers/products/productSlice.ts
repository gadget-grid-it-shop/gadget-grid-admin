import { TProduct } from '@/interface/product.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TInitialState {
  product: TProduct;
  selectedCategoryName: string;
  step: 1 | 2 | 3 | 4;
}

interface CustomPayloadAction<K extends keyof TProduct> {
  key: K;
  value: TProduct[K];
}

const initialState: TInitialState = {
  product: {
    id: '',
    name: '',
    price: 0,
    sku: '',
    brand: '',
    model: '',
    warranty: {
      days: 0,
      lifetime: false,
    },
    key_features: '',
    quantity: 0,
    category: [],
    description: '',
    thumbnail: '',
    slug: '',
    createdBy: '',
    discount: undefined,
    reviews: [],
    videos: [],
    gallery: [],
    attributes: [],
    meta: {
      title: '',
      description: '',
      image: '',
    },
    tags: [],
    isFeatured: false,
    sales: 0,
  },
  selectedCategoryName: '',
  step: 1,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateProduct: <K extends keyof TProduct>(
      state: TInitialState,
      action: PayloadAction<CustomPayloadAction<K>>,
    ) => {
      if (action.payload) {
        const { key, value } = action.payload;
        if (state.product) {
          state.product[key] = value;
        }
      }
    },
    setSelectedCategoryName: (
      state: TInitialState,
      action: PayloadAction<string>,
    ) => {
      if (action.payload) {
        state.selectedCategoryName = action.payload;
      }
    },
    setCreateProductStep: (
      state: TInitialState,
      action: PayloadAction<1 | 2 | 3 | 4>,
    ) => {
      if (action.payload) {
        state.step = action.payload;
      }
    },
    resetProductData: () => initialState,
  },
});

export const {
  updateProduct,
  setSelectedCategoryName,
  setCreateProductStep,
  resetProductData,
} = productSlice.actions;

export default productSlice.reducer;
