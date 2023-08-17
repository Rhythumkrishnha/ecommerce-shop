import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    increaseQuantity: (state, action) => {
      state.products[action.payload].quantity += 1;
      state.total += state.products[action.payload].price;
    },
    decreaseQuantity: (state, action) => {
      if (state.products[action.payload].quantity > 1) {
        state.products[action.payload].quantity -= 1;
        state.total -= state.products[action.payload].price;
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter((product) => {
        return product._id !== action.payload._id;
      });
      state.quantity -= 1;
      state.total =
        state.total - action.payload.price * action.payload.quantity;
    },
    deleteProduct: (state) => {
      state.quantity = 0;
      state.products = [];
      state.total = 0;
    },
  },
});

export const {
  addProduct,
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
  deleteProduct,
} = cartSlice.actions;
export default cartSlice.reducer;
