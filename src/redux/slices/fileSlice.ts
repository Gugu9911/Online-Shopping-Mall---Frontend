import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FileUploadResponse } from '../../types/File'; // Adjust the import path as necessary
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// Define thunk for uploading a file
export const uploadFile = createAsyncThunk<FileUploadResponse, File>(
  'files/upload',
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post<FileUploadResponse>('https://api.escuelajs.co/api/v1/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Assuming the server responds with an error in a known format
        return rejectWithValue(error.response.data);
      } else {
        // For unexpected errors
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);


interface FileState {
    uploadedFile?: FileUploadResponse;
    isLoading: boolean;
    error?: string;
  }
  
  const initialState: FileState = {
    isLoading: false,
  };
  
  export const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(uploadFile.pending, (state) => {
          state.isLoading = true;
          state.error = undefined;
          state.uploadedFile = undefined;
        })
        .addCase(uploadFile.fulfilled, (state, action: PayloadAction<FileUploadResponse>) => {
          state.isLoading = false;
          state.uploadedFile = action.payload;
        })
        .addCase(uploadFile.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string;
        });
    },
  });
  
  export default fileSlice.reducer;