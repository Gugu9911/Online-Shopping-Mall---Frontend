import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product, ProductState, NewProduct, UpdatedProduct } from '../../types/Product'; // Adjust the path as necessary
import axios from 'axios';
import { BASE_URL } from '../../misc/constants';

// Define the initial state using that type
const initialState: ProductState = {
  products: [],
  singleProduct: null,
  loading: false,
  error: null,
};


//Fetch data
const URL = BASE_URL + '/products';

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
export const fetchProductById = createAsyncThunk<Product, string, { rejectValue: string }>(
  'products/fetchProductById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/by-id/${id}`);
      console.log('response', response.data);
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
export const fetchProductsByCategoryId = createAsyncThunk<Product[], string, { rejectValue: string }>(
  'products/fetchProductsByCategoryId',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.post<Product[]>(`${URL}/${categoryId}`);
      console.log(categoryId);
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

//delete product
export const deleteProduct = createAsyncThunk<Product, string, { rejectValue: string }>(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${URL}/${id}`);
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

// Filter products by name
export const filterProductsByName = createAsyncThunk<any, string, { rejectValue: string }>(
  'products/filterProductsByName',
  async (name, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}/by-name/${name}`);
      console.log(name);
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

//update product
export const updateProduct = createAsyncThunk<any, { id: number; updatedData: UpdatedProduct }, { rejectValue: string }>(
  'product/updateProduct',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      console.log('updatedData', updatedData);
      const response = await axios.put(`${URL}/${id}`, updatedData);
      console.log(' response', response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.message || error.message;
        return rejectWithValue(message);
      }
      return rejectWithValue('An unexpected error occurred updating the product');
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
        state.singleProduct = action.payload;
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

    // Add the deleteProduct cases
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((product) => product.id !== action.payload.id);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      });
    // Add the filterProductsByTitle cases
    builder
      .addCase(filterProductsByName.pending, (state) => {
        state.loading = true;
      })
      .addCase(filterProductsByName.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(filterProductsByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      });

    //update a product
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateProduct.fulfilled, (state, action) => {
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    })
    .addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong updating the product';
    });
  },
});

export default productSlice.reducer;
