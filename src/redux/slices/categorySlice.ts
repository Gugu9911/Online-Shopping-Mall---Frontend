import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";

import { Category, CategoryState } from "../../types/Category";

//Fetch data
const urlCategories = "https://api.escuelajs.co/api/v1/categories";

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: "",
};

// Define thunk for fetching all categories
export const fetchAllCategories = createAsyncThunk<Category[], undefined, { rejectValue: string }>(
  "categories/fetchAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Category[]>(urlCategories);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.message || error.message;
        return rejectWithValue(message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);


// Create a slice
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer;
