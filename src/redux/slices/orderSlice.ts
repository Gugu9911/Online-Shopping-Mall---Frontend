
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { BASE_URL } from '../../misc/constants';
import { Order,OrderState } from '../../types/Order';
import { CartItem } from '../../types/Cart';
import { User } from '../../types/User';

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

const OrderUrl = `${BASE_URL}/orders`;

//Create order slice
export const createOrder = createAsyncThunk(
    'order/createOrder',
    async ({ cartItems, user }: { cartItems: CartItem[], user: User }, { rejectWithValue }) => {
      if (cartItems.length === 0) {
        return rejectWithValue('Cart is empty');
      }
  
      const orderItems = cartItems.map(item => ({
        product: item.id,
        quantity: item.quantity
      }));
  
      const order = { user: user?.id, items: orderItems };
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${OrderUrl}`, order, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return response.data;
      } catch (error) {
        const err = error as AxiosError;
        return rejectWithValue(err.response?.data || 'Failed to create order');
      }
    }
  );

  // Get orders by user id
export const getOrdersByUserId = createAsyncThunk(
    'order/getOrdersByUserId',
    async (userId: string, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get<Order[]>(`${OrderUrl}/getOrder/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data, 'Order:response.data');
        return response.data;
      } catch (error) {
        const err = error as AxiosError;
        return rejectWithValue(err.response?.data || 'Failed to fetch orders');
      }
    }
  );

  //delete order
  export const deleteOrder = createAsyncThunk(
    'order/deleteOrder',
    async (orderId: string, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${OrderUrl}/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          return orderId;
        } else {
          return rejectWithValue('Failed to delete the order');
        }
      } catch (error) {
        const err = error as AxiosError;
        return rejectWithValue(err.response?.data || 'Failed to delete the order');
      }
    }
  );

  //Admin Get All Orders
  export const getAllOrders = createAsyncThunk(
    'order/getAllOrders',
    async (_, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get<Order[]>(`${OrderUrl}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return response.data;
      } catch (error) {
        const err = error as AxiosError;
        return rejectWithValue(err.response?.data || 'Failed to fetch orders');
      }
    }
  );



  const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createOrder.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createOrder.fulfilled, (state, action) => {
          state.loading = false;
          if (state.orders) {
            state.orders.push(action.payload);
          }
        })
        .addCase(createOrder.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
      
        // Add the getOrdersByUserId cases
        builder
        .addCase(getOrdersByUserId.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getOrdersByUserId.fulfilled, (state, action) => {
          state.loading = false;
          state.orders = action.payload;
        })
        .addCase(getOrdersByUserId.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });

        // Add the deleteOrder cases
        builder
        .addCase(deleteOrder.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteOrder.fulfilled, (state, action) => {
          state.loading = false;
          if (state.orders) {
            state.orders = state.orders.filter(order => order.id !== action.payload);
          }
        })
        .addCase(deleteOrder.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
        
        // Add the getAllOrders cases
        builder
        .addCase(getAllOrders.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getAllOrders.fulfilled, (state, action) => {
          state.loading = false;
          state.orders = action.payload;
        })
        .addCase(getAllOrders.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    }
  });
  
  export default orderSlice.reducer;