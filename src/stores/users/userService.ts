import api from '../../core/api.service';
import { ENDPOINT } from '../../shared/constants/constants';
import { UserInputInterface } from './userSlice';

const endpoint = ENDPOINT.USERS;

// Create user
const createUser = async (questionData: UserInputInterface) => {
  const response = await api().post(endpoint, questionData);
  return response.data;
};

// Paginate users
const paginateUsers = async (queryString: string) => {
  const response = await api().get(`${endpoint}?${queryString}`);
  return response.data;
};

// Search users
const searchUsers = async (queryString: string) => {
  const response = await api().get(`${endpoint}/all?search=${queryString}`);
  return response.data;
};

// Get user by id
const getUserById = async (userId: string) => {
  const response = await api().get(`${endpoint}/${userId}`);
  return response.data;
};

// Update user
const updateUser = async (userId: string, data: UserInputInterface) => {
  const response = await api().put(`${endpoint}/${userId}`, data);
  return response.data;
};

// Delete user
const deleteUser = async (userId: string) => {
  const response = await api().delete(`${endpoint}/${userId}`);
  return response.data;
};

// Reset password
const resetPassword = async (userId: string) => {
  const response = await api().post(`${endpoint}/reset-password/${userId}`);
  return response.data;
};

const userService = {
  createUser,
  paginateUsers,
  searchUsers,
  getUserById,
  updateUser,
  deleteUser,
  resetPassword,
};

export default userService;
