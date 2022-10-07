import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import 'vant/lib/index.css'; // 引入vant的样式库
import './style.css';
import App from './App.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('./views/Home.vue'),
    },
    {
      path: '/list',
      name: 'List',
      component: () => import('./views/List.vue'),
    },
    {
      path: '/detail',
      name: 'Detail',
      component: () => import('./views/Detail.vue'),
      meta: {
        needHideTabBar: true, // 需要隐藏底部的TabBar
      },
    },
    {
      path: '/user',
      name: 'User',
      component: () => import('./views/User.vue'),
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('./views/Cart.vue'),
    },
  ],
});

//路由前置守卫
// router.beforeEach((to, from, next) => {
//   console.log('beforeEach');
//   next();
// });

// use表示使用一个插件
createApp(App).use(router).mount('#app');
