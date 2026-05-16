<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app';
import { trackEvent } from './api/analytics';

onLaunch(() => {
  trackEvent('app_open').catch(() => undefined);
});
</script>

<style>
page {
  min-height: 100%;
  background: #f7efe5;
  color: #2d2925;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
}

.page {
  min-height: 100vh;
  box-sizing: border-box;
  padding: 28rpx;
}

.section {
  margin-top: 28rpx;
}

.panel {
  background: #ffffff;
  border: 1rpx solid #d8c9b8;
  border-radius: 16rpx;
  padding: 28rpx;
}

.primary-button {
  min-height: 92rpx;
  border-radius: 18rpx;
  background: #a85f2d;
  color: #ffffff;
  font-size: 32rpx;
  font-weight: 700;
}

.ghost-button {
  min-height: 72rpx;
  border-radius: 12rpx;
  background: #fff9f1;
  color: #a85f2d;
  font-size: 28rpx;
}

.muted {
  color: #7d746a;
}
</style>
