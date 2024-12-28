import { createSlice } from "@reduxjs/toolkit";

export const breadcrumbNameMapSlice = createSlice({
  name: "breadcrumbNameMap",
  initialState: {
    "/": "Головна",
    "/favorite": "Вибране",
    "/cart": "Кошик",
  },
});

export default breadcrumbNameMapSlice.reducer;
