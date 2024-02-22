// Import createAsyncThunk
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { SignupUser, User } from '../../types/User'; // Adjust the path as necessary
import axios, { AxiosResponse } from 'axios';


const URL = "https://api.escuelajs.co/api/v1/users";
const LOGIN_URL = "https://api.escuelajs.co/api/v1/auth/login"; 
const profileUrl = "https://api.escuelajs.co/api/v1/auth/profile";

// // Define thunk for fetching all users
// export const getAllUsers = createAsyncThunk(
//   "user/getAllUsers",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(URL, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       console.log('Fetched all users:', response.data); // Optional: Log the fetched data
//       return response.data;
//     } catch (error: any) {
//       console.error('Error fetching all users:', error.message); // Log the error
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Define thunk for fetching single user by ID
// export const fetchUserById = createAsyncThunk(
//   "user/fetchUserById",
//   async (id: number, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${URL}/${id}`, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       console.log(`Fetched user by ID ${id}:`, response.data); // Optional: Log the fetched data
//       return response.data;
//     } catch (error: any) {
//       console.error(`Error fetching user by ID ${id}:`, error.message); // Log the error
//       return rejectWithValue(error.message);
//     }
//   }
// );


// Create a new user
export const createUser = createAsyncThunk(
  'user/createUser',
  async (userData: SignupUser, { rejectWithValue }) => {
    console.log('Sending user data:', userData); // Optional: Log the user data being sent
    try {
      const response = await axios.post(URL, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status); // Optional: Log the response status
      console.log('User created:', response.data); // Optional: Log the created user data

      return response.data; // Return the created user's data
    } catch (error: any) {
      console.error('Error creating user:', error.message); // Log the caught error
      return rejectWithValue(error.message); // Return the error message using rejectWithValue
    }
  }
);


//Define thunk for user with session
const getAuthentication = createAsyncThunk(
  "getAuthentication",
  async (access_token: string, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<User> = await axios.get(profileUrl, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);


// Define thunk for logging in a user
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }: { email: string; password: string }, { dispatch, rejectWithValue }) => {
    try {
      // send a POST request to the server
      const response = await axios.post(LOGIN_URL, {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('User logged in successfully:', response.data); // Log the response data
      // Store the token in local storage
      localStorage.setItem("token", response.data.access_token);
      // Use the token to get the user's profile
      const authentication = await dispatch(
        getAuthentication(response.data.access_token)
      );
      // Back to the user's profile
      return authentication.payload as User;
    } catch (error: any) {
      console.error('Error logging in user:', error.response?.data?.message || error.message); // 记录错误信息
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);







// Define the initial state using that type
interface UserState {
  isLoggedIn: boolean;
  username?: string;
  userCreationStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  userLoginStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
}

const initialState: UserState = {
  isLoggedIn: false,
  username: undefined,
  userCreationStatus: 'idle',
  userLoginStatus: 'idle',
  error: undefined,
};


// Define the slice using the initial state and the reducers
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
    // // Handling getAllUsers
    // builder
    //   .addCase(getAllUsers.pending, (state) => {
    //     state.userCreationStatus = 'loading';
    //   })
    //   .addCase(getAllUsers.fulfilled, (state, action) => {
    //     state.userCreationStatus = 'succeeded';
    //     // Optional: Update state based on action.payload if needed
    //   })
    //   .addCase(getAllUsers.rejected, (state, action) => {
    //     state.userCreationStatus = 'failed';
    //     state.error = action.error.message;
    //   });

    // // Handling fetchUserById
    // builder
    //   .addCase(fetchUserById.pending, (state) => {
    //     state.userCreationStatus = 'loading';
    //   })
    //   .addCase(fetchUserById.fulfilled, (state, action) => {
    //     state.userCreationStatus = 'succeeded';
    //     // Optional: Update state based on action.payload if needed
    //   })
    //   .addCase(fetchUserById.rejected, (state, action) => {
    //     state.userCreationStatus = 'failed';
    //     state.error = action.error.message;
    //   });

    // Handling createUser
    builder
      .addCase(createUser.pending, (state) => {
        state.userCreationStatus = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.userCreationStatus = 'succeeded';
        // Optional: Update state based on action.payload if needed
      })
      .addCase(createUser.rejected, (state, action) => {
        state.userCreationStatus = 'failed';
        state.error = action.error.message;
      });

    // Handling LoginUser
    builder
      .addCase(loginUser.pending, (state) => {
        state.userLoginStatus = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userLoginStatus = 'succeeded';
        state.isLoggedIn = true;
        state.username = action.payload.name; // Ensure your payload structure matches
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.userLoginStatus = 'failed';
        state.error = action.error.message;
      });

    // Add additional async actions as needed following the pattern above
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;

