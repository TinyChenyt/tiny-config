<script setup>
import SidebarItem from './SidebarItem.vue';
import { useSettingsStore } from '@/store/modules/settings';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import path from 'path-browserify';
import variables from '@/styles/variables.module.scss';


const settingsStore = useSettingsStore();
const currRoute = useRoute();

const layout = computed(() => settingsStore.layout);

const props = defineProps({
  menuList: {
    required: true,
    default: () => []
  },
  basePath: {
    type: String,
    required: true
  }
});

const resolvePath = (routePath) => {
  const fullPath = path.resolve(props.basePath, routePath);

  return fullPath;
};


</script>

<template>
  <el-menu :default-active="layout === 'leftMix' ? '-' : currRoute.path" :collapse="false" :unique-opened="false"
    :background-color="variables.menuBg" :text-color="variables.menuText" :active-text-color="variables.menuActiveText"
    :collapse-transition="false">
    <sidebar-item v-for="route in menuList" :key="route.path" :item="route" :base-path="resolvePath(route.path)"
      :is-collapse="false" />
  </el-menu>
</template>

<style scoped></style>