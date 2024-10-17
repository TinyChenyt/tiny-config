<script setup>
import { useRouter, useRoute } from 'vue-router';
import utils from '@/utils';

const router = useRouter();
const route = useRoute();

const userInfo = utils.localStorage.get('userInfo');

const logout = () => {
  utils.localStorage.delAll();

  router.push('/');
};

const toVisualization = () => {
  router.push('/visualization');
};
</script>

<template>
  <div class="head">
    <div class="head__left">
      <el-breadcrumb>
        <el-breadcrumb-item>主页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in route.meta.title" :key="item">{{ item }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="head__right">
      <el-button type="primary" @click="toVisualization()">大屏展示</el-button>
      <el-popover placement="bottom" :width="200" trigger="hover">
        <template #reference>
          <el-button text class="c-row-center-y">
            {{ userInfo?.username }}
            <el-icon class="ml-1">
              <Tools />
            </el-icon>
          </el-button>
        </template>

        <div>
          <el-button text class="w-100" @click="logout()">
            退出登录
          </el-button>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<style scoped>
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  border-bottom: 2px solid var(--base-bg-color);
  margin-bottom: 2px;
}

.head__left {
  flex: 1;
  display: flex;
  align-items: center;
}

.head__right {
  display: flex;
  align-items: center;
}
</style>