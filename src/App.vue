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
  background: #f7f4ee;
  color: #1f2933;
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
  border: 1rpx solid rgba(31, 41, 51, 0.08);
  border-radius: 16rpx;
  padding: 28rpx;
}

.primary-button {
  min-height: 92rpx;
  border-radius: 14rpx;
  background: #1f6f5b;
  color: #ffffff;
  font-size: 32rpx;
  font-weight: 700;
}

.ghost-button {
  min-height: 72rpx;
  border-radius: 12rpx;
  background: #eef3f0;
  color: #1f6f5b;
  font-size: 28rpx;
}

.muted {
  color: #6b7280;
}
</style>
