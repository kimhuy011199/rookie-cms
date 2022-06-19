import api from '../../core/api.service';
import authStorageService from '../../core/authStorage.service';
import { ENDPOINT } from '../../shared/constants/constants';
import { LoginUserInterface } from './authSlice';

const endpoint = ENDPOINT.USERS;

// Login user
const login = async (userData: LoginUserInterface) => {
  const response = await api().post(`${endpoint}/login`, userData);
  if (response.data) {
    const { token } = response.data;
    authStorageService().setToken(token);
  }
  return response.data;
};

// Login user
const getUserMe = async () => {
  const response = await api().get(`${endpoint}/me`);
  return response.data;
};

// Logout user
const logout = () => {
  authStorageService().removeToken();
};

// Update user
const updateUser = async (updatedUserData: any) => {
  const response = await api().put(
    `${endpoint}/${updatedUserData._id}`,
    updatedUserData
  );
  return response.data;
};

// Change password
const changePassword = async (updatedUserData: any) => {
  const response = await api().put(
    `${endpoint}/${updatedUserData._id}/password`,
    updatedUserData
  );
  return response.data;
};

const authService = {
  logout,
  getUserMe,
  login,
  updateUser,
  changePassword,
};

export default authService;
