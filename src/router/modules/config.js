const router = [
  {
    path: '/config',
    name: 'config',
    meta: {
      title: ['工具']
    },
    redirect: '',
    children: [
      {
        path: '/config/li18',
        name: 'li18',
        component: () => import('@/views/config/li18.vue'),
        meta: {
          title: ['工具', '多语言1']
        }
      },
      {
        path: '/config/li18Key',
        name: 'li18Key',
        component: () => import('@/views/config/li18Key.vue'),
        meta: {
          title: ['工具', '多语言2']
        }
      }
    ]
  }
];

export default router;