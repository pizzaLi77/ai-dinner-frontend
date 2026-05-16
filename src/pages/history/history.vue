<template>
  <view class="page">
    <view class="title">历史推荐</view>
    <LoadingState v-if="loading" text="正在读取历史" />
    <EmptyState v-else-if="sessions.length === 0" title="还没有历史" description="生成一次晚餐推荐后，这里会按日期记录。" />
    <view v-else class="section">
      <view v-for="session in sessions" :key="session.sessionId" class="panel session">
        <view class="session-head">
          <view class="date">{{ formatDateTime(session.createdAt) }}</view>
          <button class="mini" @tap="goHome">再来类似的</button>
        </view>
        <view class="input">{{ session.freeText || joinTags([...session.selectedMoods, ...session.selectedTastes]) }}</view>
        <view class="dishes">
          <view v-for="item in session.recommendations" :key="item.id" class="dish">
            <text class="dish-type">{{ TYPE_LABELS[item.type] }}</text>
            <text class="dish-name">{{ item.name }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import EmptyState from '../../components/EmptyState.vue';
import LoadingState from '../../components/LoadingState.vue';
import { getHistory } from '../../api/history';
import { useUserStore } from '../../stores/user';
import type { HistorySession } from '../../types/recommendation';
import { TYPE_LABELS } from '../../utils/constants';
import { formatDateTime, joinTags } from '../../utils/format';

const user = useUserStore();
const loading = ref(false);
const sessions = ref<HistorySession[]>([]);

onShow(load);

async function load() {
  loading.value = true;
  try {
    await user.ensureLogin();
    sessions.value = (await getHistory()).records;
  } catch (error) {
    uni.showToast({ title: (error as Error).message || '读取历史失败', icon: 'none' });
  } finally {
    loading.value = false;
  }
}

function goHome() {
  uni.switchTab({ url: '/pages/index/index' });
}
</script>

<style scoped>
.title {
  color: #111827;
  font-size: 42rpx;
  font-weight: 900;
}

.session + .session {
  margin-top: 20rpx;
}

.session-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16rpx;
}

.date {
  color: #111827;
  font-size: 28rpx;
  font-weight: 800;
}

.mini {
  width: auto;
  margin: 0;
  padding: 0 18rpx;
  min-height: 56rpx;
  border-radius: 12rpx;
  background: #eef3f0;
  color: #1f6f5b;
  font-size: 24rpx;
  line-height: 56rpx;
}

.input {
  margin-top: 14rpx;
  color: #6b7280;
  font-size: 26rpx;
  line-height: 1.5;
}

.dishes {
  margin-top: 20rpx;
}

.dish {
  display: flex;
  gap: 14rpx;
  padding: 12rpx 0;
  border-top: 1rpx solid #edf0ed;
}

.dish-type {
  flex: 0 0 92rpx;
  color: #1f6f5b;
  font-size: 24rpx;
  font-weight: 800;
}

.dish-name {
  color: #374151;
  font-size: 26rpx;
}
</style>
