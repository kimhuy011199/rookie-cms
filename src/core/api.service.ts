import axios from 'axios';
import authStorageService from './authStorage.service';

const apiService = () => {
  const defaultOptions = {
    baseURL: process.env.REACT_APP_BASE_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let instance = axios.create(defaultOptions);

  instance.interceptors.request.use(function (config) {
    const token = authStorageService().getToken();
    config.headers!.Authorization = token ? `Bearer ${token}` : '';
    return config;
  });

  return instance;
};

export default apiService;

// const apiService = (moreOptions?: any) => {
//   const token = authStorageService().getToken();
//   const options = {
//     ...moreOptions,
//     headers: {
//       ...moreOptions?.headers,
//       Authorization: token ? `Bearer ${token}` : '',
//     },
//   };

//   return {
//     get: (url: string) => axios.get(url, options),
//     post: (url: string, data: any) => axios.post(url, data, options),
//     put: (url: string, data: any) => axios.put(url, data, options),
//     delete: (url: string) => axios.delete(url, options),
//   };
// };
