import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Tag } from '../../shared/constants/types/Tag';
import { tagType } from './tagType';
import tagService from './tagService';

const initialState = {
  tags: [] as Tag[],
  tag: null,
  isError: '',
  isSuccess: '',
  isLoading: false,
  message: '',
};

// Get all pagination tags
export const getPaginationTags = createAsyncThunk(
  `tags/${tagType.GET_PAGINATION_TAGS}`,
  async (queryString: string, thunkAPI) => {
    try {
      return await tagService.getPaginationTags(queryString);
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
      .addCase(getPaginationTags.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPaginationTags.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = tagType.GET_PAGINATION_TAGS;
        state.tags = action.payload;
      })
      .addCase(getPaginationTags.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = tagType.GET_PAGINATION_TAGS;
        state.message = action.payload;
      });
  },
});

export const { reset } = tagSlice.actions;
export default tagSlice.reducer;
