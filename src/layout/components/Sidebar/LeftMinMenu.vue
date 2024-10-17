<script setup>
import Item from './Item.vue';
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

console.log(props.menuList);
</script>

<template>
  <div>
    <div class="parent-item">
      <Item class="parent-item-span" v-for="child in props.menuList" :key="child.path"
        :icon="child.meta && child.meta.icon" :title="child.meta.title"></Item>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.parent-item {
  display: flex;
  flex-direction: column;
  color: #bfcbd9;
  padding: 10px;
}
</style>