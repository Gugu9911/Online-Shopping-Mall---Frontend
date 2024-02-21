// Import createAsyncThunk
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { SignupUser } from '../../misc/types'; // Adjust the path as necessary
import axios from 'axios';


export const createUser = createAsyncThunk(
  'user/createUser',
  async (userData: SignupUser, { rejectWithValue }) => {
    console.log('Sending user data:', userData); // 打印发送的用户数据
    try {
      const response = await axios.post('https://api.escuelajs.co/api/v1/users/', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status); // 打印响应状态码
      console.log('User created:', response.data); // 打印创建成功的用户数据

      return response.data;
    } catch (error: any) {
      console.error('Error creating user:', error.message); // 打印捕获到的错误信息
      return rejectWithValue(error.message);
    }
  }
);



interface UserState {
  isLoggedIn: boolean;
  username?: string;
  userCreationStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
}

const initialState: UserState = {
  isLoggedIn: false,
  userCreationStatus: 'idle',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string }>) => {
      state.isLoggedIn = true;
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.userCreationStatus = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.userCreationStatus = 'succeeded';
        // Handle the created user data if needed, e.g., setting isLoggedIn or username
      })
      .addCase(createUser.rejected, (state, action) => {
        state.userCreationStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
