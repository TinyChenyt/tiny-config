const router = [
  {
    path: '/echarts',
    name: 'echarts',
    meta: {
      title: ['可视化']
    },
    redirect: '',
    children: [
      {
        path: '/echarts/brokenLine',
        name: 'brokenLine',
        component: () => import('@/views/echarts/brokenLine.vue'),
        meta: {
          title: ['可视化', '折线图']
        }
      },
      {
        path: '/echarts/links',
        name: 'links',
        component: () => import('@/views/echarts/links.vue'),
        meta: {
          title: ['可视化', '关系图']
        }
      }
    ]
  }
];

export default router;