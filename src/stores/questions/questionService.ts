import api from '../../core/api.service';
import { ENDPOINT } from '../../shared/constants/constants';
import { QuestionInputInterface } from './questionSlice';

const endpoint = ENDPOINT.QUESIONS;

// Create new question
const createQuestion = async (questionData: QuestionInputInterface) => {
  const response = await api().post(endpoint, questionData);
  return response.data;
};

// Get all questions
const getQuestions = async (queryString: string) => {
  const response = await api().get(`${endpoint}?${queryString}`);
  return response.data;
};

// Get question by id
const getQuestionById = async (questionId: string) => {
  const response = await api().get(`${endpoint}/${questionId}`);
  return response.data;
};

// Get question by user id
const getQuestionByUserId = async (userId: string) => {
  const response = await api().get(`${endpoint}/user/${userId}`);
  return response.data;
};

// Get recommend questions
const getRecommendQuestions = async (questionId: string) => {
  const response = await api().get(`${endpoint}/${questionId}/recommendation`);
  return response.data;
};

// Update user question
const updateQuestion = async (
  questionId: string,
  data: QuestionInputInterface
) => {
  const response = await api().put(`${endpoint}/${questionId}`, data);
  return response.data;
};

// Delete user question
const deleteQuestion = async (questionId: string) => {
  const response = await api().delete(`${endpoint}/${questionId}`);
  return response.data;
};

const questionService = {
  createQuestion,
  getQuestions,
  getQuestionById,
  getQuestionByUserId,
  updateQuestion,
  deleteQuestion,
  getRecommendQuestions,
};

export default questionService;
