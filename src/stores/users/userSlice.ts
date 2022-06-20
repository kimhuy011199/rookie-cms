import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userType } from './userType';
import userService from './userService';

export interface UserInputInterface {
  title: string;
  content: string;
  tags?: string[];
}

const initialState = {
  users: {},
  user: null,
  isError: '',
  isSuccess: '',
  isLoading: false,
  message: '',
};

// Create new user
export const createUser = createAsyncThunk(
  `user/${userType.CREATE_USER}`,
  async (userData: UserInputInterface, thunkAPI) => {
    try {
      return await userService.createUser(userData);
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all users
export const getUsers = createAsyncThunk(
  `user/${userType.GET_ALL_USERS}`,
  async (queryString: string, thunkAPI) => {
    try {
      return await userService.getUsers(queryString);
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user by id
export const getUserById = createAsyncThunk(
  `user/${userType.GET_USER_BY_ID}`,
  async (id: string, thunkAPI) => {
    try {
      return await userService.getUserById(id);
    } catch (error: any) {
      const errorCode = error?.response?.status;
      const message = error?.response?.data?.message;
      const errorResponse = { errorCode, message };
      return thunkAPI.rejectWithValue(errorResponse);
    }
  }
);

// Update user
export const updateUser = createAsyncThunk(
  `user/${userType.UPDATE_USER}`,
  async (data: any, thunkAPI) => {
    try {
      return await userService.updateUser(data.id, data.updatedData);
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  `user/${userType.DELETE_USER}`,
  async (id: string, thunkAPI) => {
    try {
      return await userService.deleteUser(id);
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
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
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = userType.CREATE_USER;
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = userType.CREATE_USER;
        state.message = action.payload;
      })
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = userType.GET_ALL_USERS;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = userType.GET_ALL_USERS;
        state.message = action.payload;
      })
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = userType.GET_USER_BY_ID;
        state.user = action.payload;
      })
      .addCase(getUserById.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = userType.GET_USER_BY_ID;
        state.message = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = userType.UPDATE_USER;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = userType.UPDATE_USER;
        state.message = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = userType.DELETE_USER;
      })
      .addCase(deleteUser.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = userType.DELETE_USER;
        state.message = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
