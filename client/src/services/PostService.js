import Api from '@/services/Api';

export default {
  getPosts () {
    return Api().get('/posts');
  },
  getPostById (id) {
    return Api().get(`/posts/${id}`);
  }
};
