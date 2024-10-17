<script setup>
import { onMounted, ref } from 'vue';
import * as monaco from 'monaco-editor';

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: 'javascript'
  },
  readOnly: {
    type: Boolean,
    default: false
  }
});


// const emit = defineEmits(['update:value']);

const editorRef = ref(null);

const editor = ref();

onMounted(() => {
  if(editorRef.value) {
    console.log(props.value);
    editor.value = monaco.editor.create(editorRef.value, {
      value: props.value || '',
      language: props.language || 'json',
      minimap: {
        enabled: true
      },
      colorDecorators: true,
      readOnly: props.readOnly,
      theme: 'vs-dark'
    });
  }

  // editor.value.onDidChangeModelContent(() => {
  //   emit('update:value', editor.value.getValue());
  // });
});

</script>

<template>
    <div>
        <div ref="editorRef" id="editor"></div>
    </div>
</template>

<style scoped>
#editor {
  width: 100%;
  height: 800px;
}
</style>