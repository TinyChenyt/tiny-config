import api from '@/api';
import localStorage from '@/utils/localStorage';
import router from '@/router';


const getUserInfo = async () => {
  const res = await api.login.getUserInfo();

  localStorage.set('userInfo', res.data);

  router.push({
    name: 'home',
    path: '/home'
  });
};

const login = async (data) => {
  const res = await api.login.token(data);
  console.log('res: ', res);
  localStorage.set('token', `${res.data.tokenType} ${res.data.accessToken}`);

  getUserInfo();
};

export default function useLogin() {
  return {
    getUserInfo,
    login
  };
}