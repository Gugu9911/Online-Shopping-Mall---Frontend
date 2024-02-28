import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Product, ProductState, NewProduct } from '../../types/Product'; // Adjust the path as necessary
import axios from 'axios';


// Define the initial state using that type
const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};


//Fetch data
const URL = "https://api.escuelajs.co/api/v1/products";

// Define thunk for fetching all products
export const fetchAllProducts = createAsyncThunk<Product[], undefined, { rejectValue: string }>(
  "products/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      // Use axios to get the response directly
      const response = await axios.get<Product[]>(URL);
      return response.data;
    } catch (error) {
      // Handle errors: Axios wraps the response error, so we check for response existence
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.message || error.message;
        return rejectWithValue(message);
      }

      // For non-Axios errors (unlikely here, but good practice to handle)
      return rejectWithValue('An unknown error occurred');
    }
  }
);

// Featch product by id
export const fetchProductById = createAsyncThunk<Product, number, { rejectValue: string }>(
  'products/fetchProductById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.message || error.message;
        return rejectWithValue(message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

// Fetch products by category id
export const fetchProductsByCategoryId = createAsyncThunk<Product[], number, { rejectValue: string }>(
  'products/fetchProductsByCategoryId',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get<Product[]>(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.message || error.message;
        return rejectWithValue(message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

// Create a new product
export const addProduct = createAsyncThunk<Product, NewProduct, { rejectValue: string }>(
  'products/addProduct',
  async (newProduct, { rejectWithValue }) => {
    try {
      const response = await axios.post<Product>(URL, newProduct, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      let message = 'An unknown error occurred'; // 默认错误消息
      if (axios.isAxiosError(error) && error.response) {
        message = error.response.data.message || error.message;
      }
      alert(message);
      return rejectWithValue(message);
    }
  }
);




// Create a slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // Add the fetchAllProducts cases
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      });

    // Add the fetchProductById cases
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      });

    // Add the fetchProductsByCategoryId cases
    builder
      .addCase(fetchProductsByCategoryId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsByCategoryId.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByCategoryId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      });

      // Add the addProduct cases
    builder
    .addCase(addProduct.pending, (state) => {
      state.loading = true;
    })
    .addCase(addProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products.push(action.payload);
    })
    .addCase(addProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'An error occurred';
    });
  },
});

export default productSlice.reducer;
