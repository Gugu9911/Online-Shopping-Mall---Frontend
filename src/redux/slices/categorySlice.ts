import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Category, CategoryState } from "../../types/Category";
import { BASE_URL } from "../../misc/constants";

//Fetch data
const urlCategories = BASE_URL + '/categories';

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

// Add the slice for categories
export const createCategory = createAsyncThunk<Category, { name: string }, { rejectValue: string }>(
  "categories/createCategory",
  async ({ name }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BASE_URL}/categories`, { name }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
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

// Update the slice to handle the new createCategory action
export const updateCategory = createAsyncThunk<Category, { id: string, name: string }, { rejectValue: string }>(
  "categories/updateCategory",
  async ({ id, name }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${BASE_URL}/categories/${id}`, { name }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
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

// Delete the category
export const deleteCategory = createAsyncThunk<string, string, { rejectValue: string }>(
  "categories/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${BASE_URL}/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return id;
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

      // Add the createCategory cases
      builder
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

      // Add the updateCategory cases
      builder
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCategory = action.payload;
        const index = state.categories.findIndex((category) => category.id === updatedCategory.id);
        if (index !== -1) {
          state.categories[index] = updatedCategory;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

      // Add the deleteCategory cases
      builder
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        state.categories = state.categories.filter((category) => category.id !== id);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer;
