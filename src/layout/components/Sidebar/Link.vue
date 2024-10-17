<script setup>
import { useRouter } from 'vue-router';
import { rules } from '@/utils';

const props = defineProps({
  to: {
    type: String,
    required: true
  }
});

const router = useRouter();

console.log(props.to);

function push() {
  router.push(props.to).catch((err) => {
    console.log(err);
  });
}
</script>

<template>
  <a v-if="rules.isExternal(to)" :href="to" rel="noopener">
    <slot />
  </a>

  <div @click.prevent="push">
    <slot />
  </div>
</template>

<style scoped></style>