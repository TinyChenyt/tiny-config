<script setup>
import { ref } from 'vue';
import codeEditor from '@/components/codeEditor.vue';

const code = ref('');
</script>

<template>
    <div>
        <codeEditor v-model="code" language="json"></codeEditor>
    </div>
</template>

<style scoped></style>