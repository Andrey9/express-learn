import Vue from 'vue';
import Router from 'vue-router';

import PostsList from '../components/posts/PostsList';
import Post from '../components/posts/Post';
import PostCreate from '../components/posts/PostCreate';
import PostUpdate from '../components/posts/PostUpdate';

import Login from '../components/user/Login';
import Register from '../components/user/Register';

import NotFound from '../components/errors/NotFound';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    // posts routes
    { path: '/', name: 'home', component: PostsList },
    { path: '/posts/new', name: 'addPost', component: PostCreate },
    { path: '/posts/:id/edit', name: 'editPost', component: PostUpdate },
    { path: '/posts/:id', name: 'post', component: Post },
    // authorization
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    // error routes
    { path: '/404', name: 'notFound', component: NotFound },
    { path: '*', redirect: '/404' }
  ]
});
