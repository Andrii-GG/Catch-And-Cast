import { configureStore } from "@reduxjs/toolkit";
import cartItemCountSlice from "./cartItemCountSlice";
import breadcrumbNameMapSlice from "./breadcrumbNameMapSlice";
import searchItemsSlice from "./searchItemsSlice";
import filterSlice from "./filterSlice";
// import filterSlice from "./filterSlice";
// import localStorageMiddleware from "./localStorageMiddleware";

// const loadInitialState = () => {
//   return {
//     cartItemCount: 0,
//   };
// };

export const store = configureStore({
  reducer: {
    cartItemCount: cartItemCountSlice,
    breadcrumbNameMap: breadcrumbNameMapSlice,
    searchItems: searchItemsSlice,
    filter: filterSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});
