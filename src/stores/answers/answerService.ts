import api from '../../core/api.service';
import { ENDPOINT } from '../../shared/constants/constants';
import { AnswerInputInterface } from './answerSlice';

const endpoint = ENDPOINT.ANSWERS;

export interface AnswerUpdateInputInterface {
  content: string;
}

// Create new answer
const createAnswer = async (answerData: AnswerInputInterface) => {
  const response = await api().post(endpoint, answerData);
  return response.data;
};

// Get all answers by question id
const getAnswers = async (questionId: string) => {
  const response = await api().get(`${endpoint}/${questionId}`);
  return response.data;
};

// Update user answer
const updateAnswer = async (
  answerId: string,
  data: AnswerUpdateInputInterface
) => {
  const response = await api().put(`${endpoint}/${answerId}`, data);
  return response.data;
};

// Delete user answer
const deleteAnswer = async (answerId: string) => {
  const response = await api().delete(`${endpoint}/${answerId}`);
  return response.data;
};

// Like or unlike answer
const likeOrUnlikeAnswer = async (answerId: string) => {
  const response = await api().put(`${endpoint}/${answerId}/likes`);
  return response.data;
};

const answerService = {
  createAnswer,
  getAnswers,
  updateAnswer,
  deleteAnswer,
  likeOrUnlikeAnswer,
};

export default answerService;
