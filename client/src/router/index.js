import Vue from 'vue';
import Router from 'vue-router';
import PostsList from '../components/posts/PostsList';
import Login from '../components/user/Login';
import Register from '../components/user/Register';
import Post from '../components/posts/Post';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: PostsList
    },
    {
      path: '/posts/:id',
      name: 'post',
      component: Post
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
});
