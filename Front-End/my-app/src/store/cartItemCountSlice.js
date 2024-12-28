import { createSlice } from "@reduxjs/toolkit";

const cartItemCountSlice = createSlice({
  name: "cartItemCount",
  initialState: 0,
  reducers: {
    setCartItemCount: (state, action) => {
      return action.payload;
    },

    incrementCartItemCount: (state) => {
      return state + 1;
    },

    decrementCartItemCount: (state) => {
      return state - 1;
    },

    incrementCartItemCountByAmount: (state, action) => {
      return state + action.payload;
    },
  },
});

export const {
  setCartItemCount,
  incrementCartItemCount,
  decrementCartItemCount,
  incrementCartItemCountByAmount,
} = cartItemCountSlice.actions;
export default cartItemCountSlice.reducer;
