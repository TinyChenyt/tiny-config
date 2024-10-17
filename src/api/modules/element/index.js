import request from '@/utils/request';

const getTableList = () => {
  return request.get('/table/list');
};

export default {
  getTableList
};