<script setup>
import { Search, Plus, Delete, Download } from '@element-plus/icons-vue';
import { ref, useSlots } from 'vue';


const props = defineProps({
  tableData: {
    type: Array,
    required: true,
    default: () => []
  },
  tableConfig: {
    type: Array,
    required: true,
    default: () => { }
  },
  selection: {
    type: Boolean,
    required: false,
    default: false
  }
});

const slots = useSlots();

const searchValue = ref('');

// const currentPage = ref(1);

// const pageSize = ref(10);

// const total = ref(1);

// const handleSizeChange = () => { };

// const handleCurrentChange = () => { };
</script>

<template>
  <div class="tiny-table-search">
    <!-- 搜索 -->
    <div class="tiny-table-search-title">
      <div class="search-group">
        <el-input class="search-group-item" v-model="searchValue" style="width: 240px" placeholder="请输入搜索内容"
          :suffix-icon="Search" />
        <slot name="search" />
      </div>
      <div class="btn-group">
        <el-button class="btn-item" type="primary" :icon="Plus">新增</el-button>
        <el-button type="success" :icon="Download">导出</el-button>
        <el-button type="danger" :icon="Delete">批量删除</el-button>
        <slot name="btn"></slot>
      </div>
    </div>
    <!-- 表格 -->

    <el-table class="tiny-table-search-table" :data="props.tableData" border style="width: 100%">
      <el-table-column v-if="selection" type="selection" width="55" />

      <el-table-column v-for="item in props.tableConfig" :key="item.key" :prop="item.key" :label="item.label">
        <template #default="scope">
          <slot v-if="slots[item.key]" :name="item.key" :data="scope.row" />
          <span v-else>
            {{ scope.row[item.key] }}
          </span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作栏">
        <template #default="scope">
          <slot name="operation" :data="scope.row" />
          <el-button type="primary" link>编辑</el-button>
          <el-button type="danger" link>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
  </div>
</template>

<style scoped>
.tiny-table-search-title {
  display: flex;
}

.search-group-item {
  margin-right: 10px;
}

.btn-group {
  margin-left: 10px;
}

.tiny-table-search-table {
  margin-top: 20px;
}
</style>