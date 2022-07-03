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

// Get users like by answer id
const getUsersLikeByAnswerId = async (answerId: string) => {
  const response = await api().get(`${endpoint}/likes/${answerId}`);
  return response.data;
};

// Paginate answers
const paginateAnswers = async (queryString: string) => {
  const response = await api().get(`${endpoint}?${queryString}`);
  return response.data;
};

// Get all answers by answer id
const getAnswerById = async (answerId: string) => {
  const response = await api().get(`${endpoint}/${answerId}`);
  return response.data;
};

// Update answer
const updateAnswer = async (
  answerId: string,
  data: AnswerUpdateInputInterface
) => {
  const response = await api().put(`${endpoint}/${answerId}`, data);
  return response.data;
};

// Delete answer
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
  paginateAnswers,
  getAnswerById,
  updateAnswer,
  deleteAnswer,
  likeOrUnlikeAnswer,
  getUsersLikeByAnswerId,
};

export default answerService;
