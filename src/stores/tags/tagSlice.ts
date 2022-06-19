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

// Create new tag
export const createTag = createAsyncThunk(
  `tags/${tagType.CREATE_TAG}`,
  async (tagData: any, thunkAPI) => {
    try {
      return await tagService.createTag(tagData);
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get tag by id
export const getTagById = createAsyncThunk(
  `tags/${tagType.GET_TAG}`,
  async (id: string, thunkAPI) => {
    try {
      return await tagService.getTagById(id);
    } catch (error: any) {
      const errorCode = error?.response?.status;
      const message = error?.response?.data?.message;
      const errorResponse = { errorCode, message };
      return thunkAPI.rejectWithValue(errorResponse);
    }
  }
);

// Update tag
export const updateTag = createAsyncThunk(
  `tags/${tagType.UPDATE_TAG}`,
  async (data: any, thunkAPI) => {
    try {
      return await tagService.updateTag(data.id, data.updatedData);
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete tag
export const deleteTag = createAsyncThunk(
  `tags/${tagType.DELETE_TAG}`,
  async (id: string, thunkAPI) => {
    try {
      return await tagService.deleteTag(id);
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
      })
      .addCase(createTag.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = tagType.CREATE_TAG;
        state.tag = action.payload;
      })
      .addCase(createTag.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = tagType.CREATE_TAG;
        state.message = action.payload;
      })
      .addCase(getTagById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTagById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = tagType.GET_PAGINATION_TAGS;
        state.tag = action.payload;
      })
      .addCase(getTagById.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = tagType.GET_PAGINATION_TAGS;
        state.message = action.payload;
      })
      .addCase(updateTag.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTag.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = tagType.UPDATE_TAG;
        state.tag = action.payload;
      })
      .addCase(updateTag.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = tagType.UPDATE_TAG;
        state.message = action.payload;
      })
      .addCase(deleteTag.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTag.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = tagType.DELETE_TAG;
      })
      .addCase(deleteTag.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = tagType.DELETE_TAG;
        state.message = action.payload;
      });
  },
});

export const { reset } = tagSlice.actions;
export default tagSlice.reducer;
