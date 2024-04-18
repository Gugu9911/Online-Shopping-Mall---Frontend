// Import createAsyncThunk
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SignupUser, User, UserInitialState } from '../../types/User'; // Adjust the path as necessary
import axios from 'axios';
import  {BASE_URL} from '../../misc/constants';


const URL = BASE_URL + '/users';
const LOGIN_URL = BASE_URL + '/users/login';
const profileUrl = BASE_URL + '/users/profile';


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
export const getProfile = createAsyncThunk(
  "getProfile",
  async (token: string, { rejectWithValue }) => {
    try {
      const response= await axios.post(profileUrl, {},{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('User profile:', response.data);
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
      localStorage.setItem("token", response.data);
      // Use the token to get the user's profile
      const authentication = await dispatch(
        getProfile(response.data)
      );
      // Back to the user's profile
      return authentication.payload as User;
    } catch (error: any) {
      console.error('Error logging in user:', error.response?.data?.message || error.message); // Log the error
      return rejectWithValue(error.response?.data?.message || error.message); 
    }
  }
);

//logout thunk
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("token");
      console.log('User logged out successfully');
      return true;
    } catch (error: any) {
      console.error('Error logging out user:', error.message);
      return rejectWithValue(error.message);
    }
  }
);


// Define thunk for fetching all users
export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(URL, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error fetching all users:', error.message); // Log the error
      return rejectWithValue(error.message);
    }
  }
);

// Define thunk for fetching single user by ID
// export const fetchUserById = createAsyncThunk(
//   "user/fetchUserById",
//   async (id: string, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${URL}/${id}`, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       // Optionally log the fetched data for development purposes
//       console.log(`Fetched user by ID ${id}:`, response.data);
//       return response.data; // Directly return the user data
//     } catch (error: any) {
//       console.error(`Error fetching user by ID ${id}:`, error.response?.data?.message || error.message);
//       // Reject with the error message. Prefer using the error response from the server if available.
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );



const initialState: UserInitialState = {
  user: null,
  users: [],
  loading: false,
  error: null,
};



// Define the slice using the initial state and the reducers
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Define any synchronous reducers if necessary
  },
  extraReducers: (builder) => {
    // Handling createUser
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload); // Assuming action.payload contains the new user
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'An error occurred';
      });

    // Handling loginUser
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Assuming action.payload contains the user's data
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'An error occurred';
      });

    // Handling logoutUser
    builder
      .addCase(logoutUser.fulfilled, (state,action) => {
        state.user = null; // Reset user to null upon logout
      });

    // Handling getAllUsers
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload; // Assuming action.payload contains an array of users
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'An error occurred';
      });

    // Handling fetchUserById
    // builder
    //   .addCase(fetchUserById.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(fetchUserById.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.user = action.payload; 
    //   })
    //   .addCase(fetchUserById.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = typeof action.payload === 'string' ? action.payload : 'An error occurred';
    //   });

    // Handling getProfile
    builder
    .addCase(getProfile.pending, (state) => {
      state.loading = true;
    })
    .addCase(getProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(getProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = typeof action.payload === 'string' ? action.payload : 'An error occurred';
    });

  },
});

export default userSlice.reducer;


