import { createSlice } from "@reduxjs/toolkit";

export const breadcrumbNameMapSlice = createSlice({
  name: "breadcrumbNameMap",
  initialState: {
    "/": "Головна",
    "/favorite": "Вибране",
    "/cart": "Кошик",
    "/profile": "Профіль",
  },
});

export default breadcrumbNameMapSlice.reducer;
