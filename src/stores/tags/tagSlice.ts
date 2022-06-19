import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Tag } from '../../shared/constants/types/Tag';
import { tagType } from './tagType';
import tagService from './tagService';

const initialState = {
  tags: [] as Tag[],
  isError: '',
  isSuccess: '',
  isLoading: false,
  message: '',
};

// Get all tags
export const getTags = createAsyncThunk(
  `tags/${tagType.GET_TAGS}`,
  async (_, thunkAPI) => {
    try {
      return await tagService.getTags();
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = '';
      state.isError = '';
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTags.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTags.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = tagType.GET_TAGS;
        state.tags = action.payload;
      })
      .addCase(getTags.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = tagType.GET_TAGS;
        state.message = action.payload;
      });
  },
});

export const { reset } = tagSlice.actions;
export default tagSlice.reducer;
