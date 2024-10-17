<script setup>
import { ref } from 'vue';
import path from 'path-browserify';
import AppLink from './Link.vue';
import Item from './Item.vue';
import { useTagsViewStore } from '@/store/modules/tagsView';

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  basePath: {
    type: String,
    required: true
  },
  isNest: {
    type: Boolean,
    default: false
  }
});

const tagsViewStore = useTagsViewStore();

const onlyOneChild = ref(); // 临时变量，唯一子路由

const hasOneShowingChild = (children, parent) => {

  if (!children) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true };
    return true;
  }

  // 子路由集合
  const showingChildren = children?.filter((route) => {
    if (route.meta?.hidden) {
      return false;
    } else {
      route.meta.hidden = false;
      onlyOneChild.value = route;
      return true;
    }
  });


  // 如果只有一个子路由
  if (showingChildren.length === 1) {
    return true;
  }

  // 如果没有子路由
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true };
    return true;
  }

  return false;
};

const resolvePath = (routePath) => {
  const fullPath = path.resolve(props.basePath, routePath);

  return fullPath;
};

const selectMenuItem = (route) => {
  console.log('route: ', route);
  if (route.meta.title) {
    tagsViewStore.addView({
      name: route.name,
      title: route.meta.title[route.meta.title.length - 1],
      path: resolvePath(route.path),
      keepAlive: true
    });
  }
};
</script>

<template>
  <div v-if="!props.item.meta || !props.item.hidden">
    <!-- 无子路由 -->
    <template
      v-if="hasOneShowingChild(props.item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren)">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !props.isNest }"
          @click="selectMenuItem(onlyOneChild)">
          <item :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" :title="onlyOneChild.meta.title"></item>
        </el-menu-item>
      </app-link>
    </template>

    <!-- 有子路由 -->
    <el-sub-menu v-else :index="resolvePath(props.item.path)" teleported>
      <template #title>
        <item v-if="props.item.meta" :icon="props.item.meta && props.item.meta.icon" :title="props.item.meta.title">
        </item>
      </template>

      <sidebar-item v-for="child in props.item.children" :key="child.path" :is-nest="true" :item="child"
        :base-path="resolvePath(child.path)" />
    </el-sub-menu>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-menu-item .el-menu-tooltip__trigger) {
  width: auto !important;
}
</style>