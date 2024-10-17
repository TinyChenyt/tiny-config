<script setup>
import { onMounted, ref } from 'vue';
import TinyTableSearch from '@/components/TinyTableSearch.vue';
import api from '@/api';

const tableConfig = ref([
  {
    key: 'date',
    label: '日期'
  },
  {
    key: 'title',
    label: '标题'
  },
  {
    key: 'address',
    label: '地址'
  }
]);

const tableData = ref([
  {
    date: '2020',
    title: '测试',
    address: '广州'
  }
]);

const getTableList = async () => {
  const res = await api.element.getTableList();
  tableData.value = res.data;
};

onMounted(() => {
  getTableList();
});

</script>

<template>
  <div>
    <TinyTableSearch :tableData="tableData" :tableConfig="tableConfig" selection>
    </TinyTableSearch>
  </div>
</template>

<style scoped></style>