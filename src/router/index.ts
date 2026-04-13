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
    redirect: '/check-in', // 重定向到打卡页面
    component: () => import('@/layout/default/index.vue'),
    children: [
      // 打卡页面（整合了首页和环保打卡）
      {
        path: '/check-in',
        name: 'CheckIn',
        component: () => import('@/views/check-in/index.vue'),
      },
      // 用户中心
      {
        path: '/user',
        name: 'User',
        component: () => import('@/views/user/index.vue'),
      },
      // 管理后台
      {
        path: '/admin',
        name: 'Admin',
        component: () => import('@/views/admin/index.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// // 路由守卫：未登录跳转到登录
// router.beforeEach((to, _from, next) => {
//   const userStore = useUserStore();
//   if (to.path !== '/login' && to.path !== '/register' && !userStore.token) {
//     next('/login');
//   } else {
//     next();
//   }
// });

export default router;
