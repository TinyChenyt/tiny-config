<script setup>
import { useSettingsStore } from '@/store/modules/settings';
import { computed, ref } from 'vue';
import LeftMenu from './LeftMenu.vue';
import localStorage from '@/utils/localStorage';
import TopMenu from './TopMenu.vue';
import { storeToRefs } from 'pinia';
import LeftMinMenu from './LeftMinMenu.vue';

const settingsStore = useSettingsStore();

const layout = computed(() => settingsStore.layout);
const showContent = ref(true);
const { sidebarLogo } = storeToRefs(settingsStore);

const menuData = localStorage.get('menuData');

const menuList = menuData[1].children;
</script>

<template>
  <div :class="{ 'has-logo': sidebarLogo }" class="menu-wrap" v-if="layout !== 'mix'">
    <el-scrollbar v-if="showContent">
      <left-menu v-if="layout === 'left'" :menu-list="menuList" base-path="" />
      <left-min-menu :menu-list="menuList" base-path="" v-if="layout === 'leftMix'" />
    </el-scrollbar>
  </div>

  <template v-else>
    <div :class="{ 'has-logo': sidebarLogo }" class="menu-wrap">
      <div class="header">
        <TopMenu />
      </div>
    </div>
  </template>
</template>

<style lang="scss" scoped>
:deep(.setting-container) {
  .setting-item {
    color: #fff;

    .svg-icon {
      margin-right: 0;
    }

    &:hover {
      color: var(--el-color-primary);
    }
  }
}

.isMix {
  .menu-wrap {
    z-index: 99;
    width: 100% !important;
    height: 50px;
    background-color: #304156;

    :deep(.header) {
      display: flex;
      width: 100%;
      --el-menu-item-height: 50px;

      .logo-wrap {
        width: 210px;
      }

      .el-menu {
        background-color: #304156;

        .el-menu-item {
          color: #bfcbd9;
        }
      }

      .el-scrollbar {
        flex: 1;
        min-width: 0;
        height: 50px;
      }
    }
  }

  .left-menu {
    display: inline-block;
    width: 210px;
    background-color: #304156;

    :deep(.el-menu) {
      background-color: #304156;

      .el-menu-item {
        color: #bfcbd9;
      }
    }
  }
}
</style>