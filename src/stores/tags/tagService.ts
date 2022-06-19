import api from '../../core/api.service';
import { ENDPOINT } from '../../shared/constants/constants';

const endpoint = ENDPOINT.TAGS;

// Get all pagination tags
const getPaginationTags = async (queryString: string) => {
  const response = await api().get(`${endpoint}/pagination?${queryString}`);
  return response.data;
};

const tagService = {
  getPaginationTags,
};

export default tagService;
