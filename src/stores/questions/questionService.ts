import api from '../../core/api.service';
import { ENDPOINT } from '../../shared/constants/constants';
import { QuestionInputInterface } from './questionSlice';

const endpoint = ENDPOINT.QUESIONS;

// Create question
const createQuestion = async (questionData: QuestionInputInterface) => {
  const response = await api().post(endpoint, questionData);
  return response.data;
};

// Search questions
const searchQuestions = async (queryString: string) => {
  const response = await api().get(`${endpoint}/all?search=${queryString}`);
  return response.data;
};

// Paginate questions
const getQuestions = async (queryString: string) => {
  const response = await api().get(`${endpoint}?${queryString}`);
  return response.data;
};

// Get question by id
const getQuestionById = async (questionId: string) => {
  const response = await api().get(`${endpoint}/${questionId}`);
  return response.data;
};

// Update question
const updateQuestion = async (
  questionId: string,
  data: QuestionInputInterface
) => {
  const response = await api().put(`${endpoint}/${questionId}`, data);
  return response.data;
};

// Delete question
const deleteQuestion = async (questionId: string) => {
  const response = await api().delete(`${endpoint}/${questionId}`);
  return response.data;
};

const questionService = {
  createQuestion,
  getQuestions,
  searchQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};

export default questionService;
