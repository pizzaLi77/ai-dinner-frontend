<template>
  <view class="empty">
    <view class="empty-title">{{ title }}</view>
    <view v-if="description" class="empty-desc">{{ description }}</view>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
}>();
</script>

<style scoped>
.empty {
  padding: 70rpx 28rpx;
  text-align: center;
  color: #6b7280;
}

.empty-title {
  color: #374151;
  font-size: 30rpx;
  font-weight: 700;
}

.empty-desc {
  margin-top: 12rpx;
  font-size: 26rpx;
  line-height: 1.5;
}
</style>
