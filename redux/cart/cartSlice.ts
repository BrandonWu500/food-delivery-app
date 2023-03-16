import { ProductType } from '@/models/Product';
import { createSlice } from '@reduxjs/toolkit';

type CartProductsType = Partial<ProductType> & {
  itemPrice: number;
  itemQuantity: number;
  extras: string[];
};

export type CartSliceState = {
  products: CartProductsType[];
  cartQuantity: number;
  cartTotal: number;
};

const initialState: CartSliceState = {
  products: [],
  cartQuantity: 0,
  cartTotal: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    getCart: () => {
      const cart = localStorage.getItem('cart');
      if (cart) {
        return JSON.parse(cart);
      }
      localStorage.setItem('cart', JSON.stringify(initialState));
      return initialState;
    },
    addProduct: (state, action) => {
      const payload: CartProductsType = action.payload;
      state.products.push(payload);
      state.cartQuantity += payload.itemQuantity;
      state.cartTotal += payload.itemPrice * payload.itemQuantity;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    deleteProduct: (state, action) => {
      const cartIdx = action.payload;
      const delProduct = state.products[cartIdx];
      state.cartQuantity -= delProduct.itemQuantity;
      state.cartTotal -= delProduct.itemPrice * delProduct.itemQuantity;
      state.products.splice(cartIdx, 1);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    reset: () => {
      localStorage.setItem('cart', JSON.stringify(initialState));
      return initialState;
    },
  },
});

export const { getCart, addProduct, deleteProduct, reset } = cartSlice.actions;

export default cartSlice.reducer;
