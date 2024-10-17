<script setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import * as XLSX from 'xlsx';
import codeEditor from '@/components/codeEditor.vue';

const fileContent = ref({});

const changeFile = (event) => {
  const file = event.raw;
  const reader = new FileReader();
  // 处理文件内容
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const title = jsonData[0];
    const dataValue = jsonData.slice(1);
    let obj = {};
    title.forEach(titleKey => {
      obj[titleKey] = {};
    });

    dataValue.forEach((item, index) => {
      item.forEach((item2, index2) => {
        obj[title[index2]]['lang'+index] = item2;
      });
    });

    fileContent.value = JSON.parse(JSON.stringify(obj));
    
  };
  // 读取文件内容
  reader.readAsArrayBuffer(file);
};

const copyToClipboard = async() => {
  try {
    await navigator.clipboard.writeText(JSON.stringify(fileContent.value));
    ElMessage.success('复制成功');
  } catch(err) {
    console.error('Failed to copy text: ', err);
  }
};

</script>

<template>
    <div class="wrapper">
        <el-button class="copy-btn" @click.stop="copyToClipboard()">一键复制</el-button>
        <el-upload ref="uploadRef" :on-change="changeFile" :show-file-list="false" class="mr10"
            accept=".csv, .xlsx, .xls" action="#" :auto-upload="false">
            <template #trigger>
                <el-button type="primary">选择文件</el-button>
            </template></el-upload>
            <codeEditor value="fileContent" language="json"></codeEditor>
    </div>
</template>

<style scoped>
.wrapper {
  padding: 10px;
}
.copy-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>