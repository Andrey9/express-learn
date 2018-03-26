import Api from '@/services/Api';

export default {
  getPosts () {
    return Api().get('/posts');
  },
  getPostById (id) {
    return Api().get(`/posts/${id}`);
  },
  create (data) {
    return Api().post('/posts', data);
  },
  update (id, data) {
    return Api().put(`/posts/${id}`, data);
  },
  addComment (id, data) {
    return Api().post(`/posts/${id}/comments`, data);
  }
};
