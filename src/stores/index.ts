import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import questionReducer from './questions/questionSlice';
import answerReducer from './answers/answerSlice';
import uploadReducer from './uploads/uploadSlice';
import tagReducer from './tags/tagSlice';
import userReducer from './users/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    questions: questionReducer,
    answers: answerReducer,
    upload: uploadReducer,
    tags: tagReducer,
    users: userReducer,
  },
});
