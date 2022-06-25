import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { Answer } from '../../shared/constants/types/Answer';
import { answerType } from './answerType';
import answerService from './answerService';

export interface AnswerInputInterface {
  content: string;
  questionId: string;
}

const initialState = {
  answers: [] as Answer[],
  answer: null,
  currentQuestion: null,
  currentUser: null,
  isError: '',
  isSuccess: '',
  isLoading: false,
  message: '',
};

// Create new answer
export const createAnswer = createAsyncThunk(
  `answer/${answerType.CREATE_ANSWER}`,
  async (answerData: AnswerInputInterface, thunkAPI) => {
    try {
      const data = await answerService.createAnswer(answerData);
      return data;
    } catch (error: any) {
      if (!error.response) {
        throw new Error('No internet connection');
      }
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all answers by question id
export const getAnswersByQuestionId = createAsyncThunk(
  `answer/${answerType.GET_ALL_ANSWERS}`,
  async (questionId: string, thunkAPI) => {
    try {
      return await answerService.getAnswersByQuestionId(questionId);
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all answers
export const paginateAnswers = createAsyncThunk(
  `answer/${answerType.PAGINATE_ANSWERS}`,
  async (queryString: string, thunkAPI) => {
    try {
      return await answerService.paginateAnswers(queryString);
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get answer by id
export const getAnswerById = createAsyncThunk(
  `answer/${answerType.GET_ANSWER}`,
  async (id: string, thunkAPI) => {
    try {
      return await answerService.getAnswerById(id);
    } catch (error: any) {
      const errorCode = error?.response?.status;
      const message = error?.response?.data?.message;
      const errorResponse = { errorCode, message };
      return thunkAPI.rejectWithValue(errorResponse);
    }
  }
);

// Update user answer
export const updateAnswer = createAsyncThunk(
  `answer/${answerType.UPDATE_ANSWER}`,
  async (data: any, thunkAPI) => {
    try {
      return await answerService.updateAnswer(data.id, data.updatedData);
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user answer
export const deleteAnswer = createAsyncThunk(
  `answer/${answerType.DELETE_ANSWER}`,
  async (id: string, thunkAPI) => {
    try {
      return await answerService.deleteAnswer(id);
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Choose current question
export const chooseQuestion = createAction(
  answerType.CHOOSE_QUESTION,
  (payload: any) => ({ payload })
);

// Clear current question
export const clearChooseQuestion = createAction(
  answerType.CLEAR_CURRENT_QUESTION
);

// Choose current user
export const chooseUser = createAction(
  answerType.CHOOSE_USER,
  (payload: any) => ({ payload })
);

// Clear current user
export const clearChooseUser = createAction(answerType.CLEAR_CURRENT_USER);

export const answerSlice = createSlice({
  name: 'answer',
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
      .addCase(createAnswer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAnswer.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = answerType.CREATE_ANSWER;
      })
      .addCase(createAnswer.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = answerType.CREATE_ANSWER;
        state.message = action.payload;
      })
      .addCase(getAnswersByQuestionId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAnswersByQuestionId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = answerType.GET_ALL_ANSWERS;
        state.answers = action.payload;
      })
      .addCase(getAnswersByQuestionId.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = answerType.GET_ALL_ANSWERS;
        state.message = action.payload;
      })
      .addCase(getAnswerById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAnswerById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = answerType.GET_ANSWER;
        state.answer = action.payload;
        state.currentQuestion = action.payload.question;
      })
      .addCase(getAnswerById.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = answerType.GET_ANSWER;
        state.message = action.payload;
      })
      .addCase(paginateAnswers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(paginateAnswers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = answerType.PAGINATE_ANSWERS;
        state.answers = action.payload;
      })
      .addCase(paginateAnswers.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = answerType.PAGINATE_ANSWERS;
        state.message = action.payload;
      })
      .addCase(updateAnswer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAnswer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = answerType.UPDATE_ANSWER;
      })
      .addCase(updateAnswer.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = answerType.UPDATE_ANSWER;
        state.message = action.payload;
      })
      .addCase(deleteAnswer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAnswer.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = answerType.DELETE_ANSWER;
        state.answers.list = state.answers.list.filter(
          (answer: Answer) => answer._id !== action.payload.id
        );
      })
      .addCase(deleteAnswer.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = answerType.DELETE_ANSWER;
        state.message = action.payload;
      })
      .addCase(chooseQuestion, (state, action) => {
        state.currentQuestion = action.payload;
      })
      .addCase(clearChooseQuestion, (state) => {
        state.currentQuestion = null;
      })
      .addCase(chooseUser, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(clearChooseUser, (state) => {
        state.currentUser = null;
      });
  },
});

export const { reset } = answerSlice.actions;
export default answerSlice.reducer;
