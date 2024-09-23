import { TProduct } from "@/interface/product.interface"
import { createSlice, PayloadAction, } from "@reduxjs/toolkit"

interface TInitialState {
    product: TProduct
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
        warranty: '',
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
            image: ''
        },
        tags: [],
        isFeatured: false,
        sales: 0,
    },
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        updateProduct: <K extends keyof TProduct>(state: TInitialState, action: PayloadAction<CustomPayloadAction<K>>) => {
            if (action.payload) {
                const { key, value } = action.payload;
                if (state.product) {
                    state.product[key] = value
                }
            }
        }
    }
})

export const { updateProduct } = productSlice.actions


export default productSlice.reducer