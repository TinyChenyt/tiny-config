const router = [
  {
    path: '/element',
    name: 'element',
    // component: () => import('../views/element.vue'),
    meta: {
      title: ['组件']
    },
    redirect: '/element/button',
    children: [
      {
        path: '/element/button',
        name: 'element-button',
        component: () => import('@/views/element/button.vue'),
        meta: {
          title: ['组件', '按钮']
        }
      },
      {
        path: '/element/table',
        name: 'element-table',
        component: () => import('@/views/element/table.vue'),
        meta: {
          title: ['组件', '表格']
        }
      }
    ]
  }
];

export default router;