import { createSlice } from "@reduxjs/toolkit";

// Створюємо slice
const searchItemsSlice = createSlice({
  name: "searchItems",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setData: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Експортуємо ред'юсери
export const { setLoading, setData, setError } = searchItemsSlice.actions;

// Асинхронна дія для фетчу
export const fetchSearchData =
  (fetchUrl, fetchParams = {}) =>
  async (dispatch) => {
    dispatch(setLoading()); // Встановлюємо loading в true

    try {
      const response = await fetch(fetchUrl, fetchParams);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);

      dispatch(setData(data)); // Якщо успіх, додаємо дані в стан
    } catch (error) {
      dispatch(setError(error.message)); // Якщо помилка, додаємо помилку в стан
    }
  };

// Експортуємо ред'юсер
export default searchItemsSlice.reducer;
