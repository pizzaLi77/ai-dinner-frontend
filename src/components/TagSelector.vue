<template>
  <view class="tag-selector">
    <view class="tag-title">{{ title }}</view>
    <view class="tag-grid">
      <button
        v-for="option in options"
        :key="option"
        class="tag-button"
        :class="{ active: isSelected(option) }"
        @tap="toggle(option)"
      >
        {{ option }}
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  options: string[];
  modelValue: string[] | string | null;
  multiple?: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string[] | string | null];
}>();

function isSelected(option: string) {
  return props.multiple
    ? Array.isArray(props.modelValue) && props.modelValue.includes(option)
    : props.modelValue === option;
}

function toggle(option: string) {
  if (!props.multiple) {
    emit('update:modelValue', props.modelValue === option ? null : option);
    return;
  }
  const current = Array.isArray(props.modelValue) ? props.modelValue : [];
  emit(
    'update:modelValue',
    current.includes(option) ? current.filter((item) => item !== option) : [...current, option],
  );
}
</script>

<style scoped>
.tag-title {
  margin-bottom: 16rpx;
  font-size: 28rpx;
  font-weight: 700;
}

.tag-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 14rpx;
}

.tag-button {
  width: auto;
  margin: 0;
  padding: 0 22rpx;
  min-height: 62rpx;
  border-radius: 12rpx;
  border: 1rpx solid #d8ded9;
  background: #ffffff;
  color: #374151;
  font-size: 26rpx;
  line-height: 62rpx;
}

.tag-button.active {
  border-color: #1f6f5b;
  background: #e1efe9;
  color: #15513f;
  font-weight: 700;
}
</style>
