import jwt_decode from 'jwt-decode';

const ACCESS_TOKEN = 'token';

const authStorageService = () => {
  return {
    setToken: (token?: any) => {
      if (token) {
        localStorage.setItem(ACCESS_TOKEN, token);
      }
    },

    getToken: () => localStorage.getItem(ACCESS_TOKEN),

    removeToken: () => {
      localStorage.removeItem(ACCESS_TOKEN);
    },

    getUserInfo: () => {
      const token = authStorageService().getToken();
      return token ? jwt_decode(token) : null;
    },
  };
};

export default authStorageService;
