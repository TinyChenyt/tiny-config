<script setup>

const props = defineProps({
  icon: {
    type: String,
    default: ''
  },
  title: {
    type: Array,
    default: () => []
  }
});
</script>

<template>
  <el-icon v-if="icon" class="sub-el-icon">
    <component :is="props.icon"></component>
  </el-icon>
  <span v-if="title && title.length">{{ title[title.length - 1] }}</span>
</template>

<style scoped>
.sub-el-icon {
  width: 1em;
  height: 1em;
  color: currentcolor;
}
</style>