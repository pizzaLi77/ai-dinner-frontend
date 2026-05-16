<template>
  <view class="loading">
    <view class="dot" />
    <view class="text">{{ text || '正在想今晚吃啥' }}</view>
  </view>
</template>

<script setup lang="ts">
defineProps<{ text?: string }>();
</script>

<style scoped>
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18rpx;
  min-height: 180rpx;
  color: #1f6f5b;
  font-size: 28rpx;
}

.dot {
  width: 18rpx;
  height: 18rpx;
  border-radius: 50%;
  background: #1f6f5b;
  animation: pulse 900ms ease-in-out infinite alternate;
}

@keyframes pulse {
  from {
    opacity: 0.35;
    transform: scale(0.85);
  }
  to {
    opacity: 1;
    transform: scale(1.15);
  }
}
</style>
