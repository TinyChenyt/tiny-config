import request from '@/utils/request';

const getUserInfo = () => {
  return request.get('/user/info');
};

const token = (data) => {
  return request.post('/user/login', data);
};

const addTest = (data) => {
  return request.post('/typeTags/create', data);
};

const listTest = () => {
  return request.get('/typeTags/list/');
};

export default {
  getUserInfo,
  token,
  addTest,
  listTest
};