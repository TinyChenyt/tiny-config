<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import localStorage from '@/utils/localStorage';
import TinyForm from '@/components/TinyForm.vue';
import UseLogin from '@/hooks/useLogin';


const router = useRouter();

const useLogin = UseLogin();

localStorage.set('menuData', router.options.routes);

const formData = ref({
  username: 'admin',
  password: '123456'
});

const formConfig = ref([
  {
    label: '用户名',
    type: 'input',
    placeholder: '请输入用户名',
    key: 'username',
    required: true
  },
  {
    label: '密码',
    type: 'input',
    placeholder: '请输入密码',
    key: 'password'
  }
]);


const submit = (data) => {
  login(data);
};

const login = async (data) => {

  useLogin.login(data);

};
</script>

<template>
  <div class="login-box">
    <TinyForm :form-data="formData" :form-config="formConfig" @submit="submit" />
  </div>
</template>

<style scoped>
.login-box {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('@/assets/images/3.jpg') no-repeat center right;
  background-size: cover;
  overflow-y: auto;
}
</style>