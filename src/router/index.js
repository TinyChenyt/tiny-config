// 导入创建路由实例，和 history 模式
import { createRouter, createWebHistory } from 'vue-router';
import localStorage from '@/utils/localStorage';
import admin from './modules/admin';
import echarts from './modules/echarts';
import config from './modules/config';

export const Layout = () => import('@/layout/index.vue');

// 路由规则
const routes = [
  // {
  //   path: '/', // 根路径
  //   name: 'home', // 路由名称
  //   component: () => import('../views/home.vue') // 路由组件
  // }
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: Layout,
    redirect: '/element/button',
    children: [
      ...admin,
      ...echarts,
      ...config
    ]
  },
  {
    path: '/visualization',
    name: 'visualization',
    component: () => import('@/views/visualization/index.vue')
  }
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
});

// 路由导航守卫
router.beforeEach((to, from, next) => {
  // 未登录不允许访问其他页面
  if (to.path !== '/' && !localStorage.get('token')) {
    return next({ path: '/' });
  }

  // 防止重复登录
  if (localStorage.get('token') && to.path === '/') {
    return next({ path: from.path ? from.path : '/' });
  }

  next();
});

// 导出路由实例
export default router;
