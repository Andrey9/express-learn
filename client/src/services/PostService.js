import Api from '@/services/Api';

export default {
  getPosts (credentials) {
    return Api().get('/posts', credentials);
  },
  login (credentials) {
    return Api().post('/auth/login', credentials);
  }
};
