<script setup>
import { ref, reactive, toRefs, useSlots, defineEmits } from 'vue';

const props = defineProps({
  formData: {
    type: Object,
    default: () => {
      return {};
    }
  },
  formConfig: {
    type: Array,
    default: () => {
      return [];
    }
  },
  showSubmitBtn: {
    type: Boolean,
    default: true
  },
  showResetBtn: {
    type: Boolean,
    default: true
  },
  showSubmitBtnText: {
    type: String,
    default: '提交'
  }
});

const slots = useSlots();

const { formData, formConfig } = toRefs(props);

const rules = reactive({});

const getPlaceholder = (data) => {
  // 如果是选择类型的框
  let trigger = 'change';
  let placeholder = `请选择${data.label}`;

  // 如果是输入类型的框
  const arr = ['input', 'password', 'textarea', 'number'];

  if (arr.indexOf(data.type) !== -1) {
    trigger = 'blur';
    placeholder = `请填写${data.label}`;
  }

  return {
    trigger,
    placeholder
  };
};

formConfig.value.forEach(item => {
  const placeholderData = getPlaceholder(item);

  const { placeholder, trigger } = placeholderData;
  // 如果设置了必填
  if (item.required) {
    // config是否设置了rule，如果有则赋值，如果没有则添加默认的必填校验
    rules[item.key] = item.rule || [
      { required: true, message: placeholder, trigger }
    ];
  }

  // 如果config没有placeholder，则显示默认的placeholder
  if (!item.placeholder) {
    item.placeholder = placeholder;
  }
});

const tinyFormRef = ref();

const validate = () => {
  return new Promise((resolve, reject) => {
    tinyFormRef.value.validate((valid, fields) => {
      if (valid) {
        // 校验通过,提交表单数据
        submit();
        resolve(true);
      } else {
        reject(fields);
      }
    });
  });
};

const emit = defineEmits(['submit']);

const submit = () => {
  // 导出submit方法
  emit('submit', JSON.parse(JSON.stringify(formData.value)));
};

const reset = () => {
  tinyFormRef.value.resetFields();
};

const clearValidate = (data) => {
  tinyFormRef.value.clearValidate(data);
};

defineExpose({
  reset,
  validate,
  submit,
  clearValidate
});
</script>

<template>
  <el-form :model="props.formData" :rules="rules" ref="tinyFormRef" label-position="top">
    <!-- 通过插槽渲染formConfig中的配置项 -->
    <template v-for="item in props.formConfig" :key="item.key">
      <el-form-item :label="item.label" :prop="item.key">
        <!-- 预留自定义表单 -->
        <slot v-if="slots[item.key]" :name="item.key" :value="formData[item.key]"></slot>
        <!-- 输入框 -->
        <el-input v-else-if="item.type === 'input'" v-model="formData[item.key]" :placeholder="item.placeholder"
          :disabled="item.disabled" clearable :maxlength="item.props?.maxlength" />
        <!-- 密码框 -->
        <el-input v-else-if="item.type === 'password'" v-model="formData[item.key]" type="password"
          :placeholder="item.placeholder" :disabled="item.disabled" show-password clearable />
        <!-- 文本框 -->
        <el-input v-else-if="item.type === 'text'" v-model="formData[item.key]" type="textarea"
          :placeholder="item.placeholder" :disabled="item.disabled" :rows="item.props?.rows" />
        <!-- 数字框 -->
        <el-input-number v-else-if="item.type === 'number'" v-model="formData[item.key]" :disabled="item.disabled"
          controls-position="right" :step="item.props?.step" />
        <!-- 单选 -->
        <el-radio-group v-else-if="item.type === 'radio'" v-model="formData[item.key]">
          <el-radio v-for="option in item.options" :key="option[item.props.key]" :label="option[item.props.value]">
            {{ option[item.props.label] }}
          </el-radio>
        </el-radio-group>
        <!-- 多选 -->
        <el-checkbox-group v-else-if="item.type === 'checkbox'" v-model="formData[item.key]">
          <el-checkbox v-for="option in item.options" :key="option[item.props.key]" :label="option[item.props.value]">
            {{ option[item.props.label] }}
          </el-checkbox>
        </el-checkbox-group>
        <!-- 下拉单选或多选 -->
        <el-select v-else-if="item.type === 'select'" v-model="formData[item.key]" :multiple="item.props.multiple"
          :placeholder="item.placeholder" :disabled="item.disabled" clearable>
          <el-option v-for="option in item.options" :key="option[item.props.key]" :label="option[item.props.label]"
            :value="option[item.props.value]" />
        </el-select>
        <!-- 联级单选或多选 -->
        <el-cascader v-else-if="item.type === 'cascader'" v-model="formData[item.key]" :options="item.options"
          :show-all-levels="false" :props="item.props" :placeholder="item.placeholder" :disabled="item.disabled"
          clearable />
        <!-- 开关 -->
        <el-switch v-else-if="item.type === 'switch'" v-model="formData[item.key]" :disabled="item.disabled" />
        <!-- 取色器 -->
        <el-color-picker v-else-if="item.type === 'color'" v-model="formData[item.key]" :show-alpha="item.showAlpha"
          :predefine="item.predefineColors" />
        <!-- 时间选择 -->
        <el-time-picker v-else-if="item.type === 'time'" v-model="formData[item.key]" :placeholder="item.placeholder"
          :disabled="item.disabled" format="hh:mm:ss" value-format="hh:mm:ss" />
        <!-- 时间 to 时间 -->
        <el-time-picker v-else-if="item.type === 'time-to-time'" v-model="formData[item.key]" is-range
          range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" :disabled="item.disabled"
          format="hh:mm:ss" value-format="hh:mm:ss" />
        <!-- 日期 -->
        <el-date-picker v-else-if="item.type === 'date'" v-model="formData[item.key]" type="date" format="YYYY-MM-DD"
          value-format="YYYY-MM-DD" :placeholder="item.placeholder" :disabled="item.disabled" />
        <!-- 日期 to 日期 -->
        <el-date-picker v-else-if="item.type === 'date-to-date'" v-model="formData[item.key]"
          :placeholder="item.placeholder" type="daterange" format="YYYY-MM-DD" value-format="YYYY-MM-DD"
          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :disabled="item.disabled" />
        <!-- 日期时间 -->
        <el-date-picker v-else-if="item.type === 'datetime'" v-model="formData[item.key]" type="datetime"
          format="YYYY-MM-DD hh:mm:ss" value-format="YYYY-MM-DD hh:mm:ss" :placeholder="item.placeholder"
          :disabled="item.disabled" />
        <!-- 日期时间 to 日期时间 -->
        <el-date-picker v-else-if="item.type === 'datetime-to-datetime'" v-model="formData[item.key]"
          type="datetimerange" format="YYYY-MM-DD hh:mm:ss" value-format="YYYY-MM-DD hh:mm:ss" range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期" :disabled="item.disabled" />
        <!-- 评分 -->
        <el-rate v-else-if="item.type === 'rate'" v-model="formData[item.key]" :colors="item.colors"
          :allow-half="item.allowHalf" :texts="item.texts" clearable />
        <!-- 滑块 -->
        <el-slider v-else-if="item.type === 'slider'" v-model="formData[item.key]" :min="item.props.min"
          :max="item.props.max" />
        <!-- 时间选择 -->
        <el-time-select v-else-if="item.type === 'timeselect'" :placeholder="item.placeholder" :disabled="item.disabled"
          :start="item.props?.start" :end="item.props?.end" :format="'hh:mm:ss'" clearable />
        <!-- 穿梭框 -->
        <el-transfer v-else-if="item.type === 'transfer'" :v-model="formData[item.key]" :filterable="item.filterable" />
        <!-- 文件上传 -->
      </el-form-item>
    </template>

    <el-form-item>
      <slot name="operations" />

      <el-button type="primary" @click="validate" v-if="props.showSubmitBtn">
        {{ props.showSubmitBtnText }}
      </el-button>
      <el-button v-if="props.showResetBtn" @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>