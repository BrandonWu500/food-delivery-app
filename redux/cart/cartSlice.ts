import { ProductType } from '@/models/Product';
import { createSlice } from '@reduxjs/toolkit';

type CartProductsType = Partial<ProductType> & {
  price: number;
  quantity: number;
};

export type CartSliceState = {
  products: CartProductsType[];
  quantity: number;
  total: number;
};

const initialState: CartSliceState = {
  products: [],
  quantity: 0,
  total: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const payload: CartProductsType = action.payload;
      state.products.push(payload);
      state.total += payload.price * payload.quantity;
    },
    reset: () => initialState,
  },
});

export const { addProduct, reset } = cartSlice.actions;

export default cartSlice.reducer;
