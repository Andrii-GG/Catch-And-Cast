import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    categoryId: 0,
    categoryName: "Всі товари",
    searchString: "",
  },
  reducers: {
    setFilter: (state, action) => {
      const { categoryId, categoryName, searchString } = action.payload;
      state.categoryId =
        categoryId !== undefined ? categoryId : state.categoryId;
      debugger;
      state.categoryName = categoryName || state.categoryName;
      state.searchString = searchString || state.searchString;
      if (searchString === "") state.searchString = searchString;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
