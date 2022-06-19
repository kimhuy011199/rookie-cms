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
  console.log(tagData);
  const response = await api().post(endpoint, tagData);
  return response.data;
};

const tagService = {
  getPaginationTags,
  createTag,
};

export default tagService;
