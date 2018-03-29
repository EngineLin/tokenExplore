import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../containers/HomePage';
import DemoPage from '../containers/DemoPage';

Vue.use(Router);

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/demo',
      name: 'DemoPage',
      component: DemoPage,
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   if (to.path !== '/demo') {
//     next('/');
//   } else {
//     next();
//   }
// });

export default router;
