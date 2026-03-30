import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/store/modules/user';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue'),
  },
  {
    path: '/',
    redirect: '/home', // 重定向到存在的路径
    component: () => import('@/layout/default/index.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
      },
      // 用户中心
      {
        path: '/user',
        name: 'User',
        component: () => import('@/views/user/index.vue'),
      },
      // 数据
      {
        path: '/data',
        name: 'Data',
        component: () => import('@/views/data/index.vue'),
      },
      // 社区
      {
        path: '/community',
        name: 'Community',
        component: () => import('@/views/community/index.vue'),
      },
      // 打卡
      {
        path: '/check-in',
        name: 'CheckIn',
        component: () => import('@/views/check-in/index.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫：未登录跳转到登录
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.path !== '/login' && to.path !== '/register' && !userStore.token) {
    next('/login');
  } else {
    next();
  }
});

export default router;
