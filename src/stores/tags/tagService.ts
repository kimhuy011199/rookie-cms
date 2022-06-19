import api from '../../core/api.service';
import { ENDPOINT } from '../../shared/constants/constants';

const endpoint = ENDPOINT.TAGS;

// Get all pagination tags
const getPaginationTags = async (queryString: string) => {
  const response = await api().get(`${endpoint}/pagination?${queryString}`);
  return response.data;
};

// Get all pagination tags
const createTag = async (tagData: any) => {
  const response = await api().post(endpoint, tagData);
  return response.data;
};

// Get tag by id
const getTagById = async (tagId: string) => {
  const response = await api().get(`${endpoint}/${tagId}`);
  return response.data;
};

// Update tag
const updateTag = async (tagId: string, data: any) => {
  const response = await api().put(`${endpoint}/${tagId}`, data);
  return response.data;
};

// Delete tag
const deleteTag = async (tagId: string) => {
  const response = await api().delete(`${endpoint}/${tagId}`);
  return response.data;
};

const tagService = {
  getPaginationTags,
  createTag,
  getTagById,
  updateTag,
  deleteTag,
};

export default tagService;
