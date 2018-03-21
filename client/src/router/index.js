import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '../components/pages/HelloWorld';
import Login from '../components/pages/Login';
import Register from '../components/pages/Register';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HelloWorld
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
