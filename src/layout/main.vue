<script setup>
import { useSettingsStore } from '@/store/modules/settings';
import { computed } from 'vue';
import { AppMain, Navbar } from './components/index';


const settingsStore = useSettingsStore();

const showTagsView = computed(() => settingsStore.tagsView);
// const showSettings = computed(() => settingsStore.showSettings);
const layout = computed(() => settingsStore.layout);
</script>

<template>
  <div :class="{ hasTagsView: showTagsView }" class="main-container">
    <div>
      <navbar v-if="layout === 'left'" />
    </div>

    <!-- 主面板 -->
    <app-main />

    <!-- 设置面板 -->
  </div>
</template>

<style lang="scss" scoped>
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - 210px);
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.hideSidebar.mobile .fixed-header {
  width: 100%;
}

.isTop .fixed-header {
  width: 100% !important;
}

.isMix,
.isTop {
  .fixed-header {
    top: 50px;
  }
}
</style>