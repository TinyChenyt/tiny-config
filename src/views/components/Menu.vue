<script setup>
import localStorage from '@/utils/localStorage';
import { useRoute } from 'vue-router';
import MenuItem from './MenuItem.vue';

const route = useRoute();

const menuData = localStorage.get('menuData');

</script>

<template>
  <el-menu :router="true" :default-active="route.path" v-if="menuData.length">
    <MenuItem v-for="item in menuData[1].children" :key="item.path" :data="item" />
  </el-menu>
</template>

<style scoped></style>