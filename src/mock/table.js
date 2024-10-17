import Mock from 'mockjs';

Mock.mock('/table/list', 'get', {
  code: 200,
  success: true,
  message: '请求成功',
  'data|66': [
    {
      'id|+1': 1,
      'title': '@cname',
      'address': '@city',
      'date': '@date'
    }
  ]
});