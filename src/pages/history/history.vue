<template>
  <view class="page">
    <view class="title">历史推荐</view>
    <LoadingState v-if="loading" text="正在读取历史" />
    <EmptyState v-else-if="groups.length === 0" title="还没有历史" description="生成一次晚餐推荐后，这里会按日期记录。" />
    <view v-else class="section">
      <view v-for="group in groups" :key="group.dateLabel" class="group">
        <view class="date">{{ group.dateLabel }}</view>
        <view v-for="item in group.items" :key="item.sessionId" class="panel session">
          <view class="session-head">
            <view class="section-label">输入 / 推荐 / 反馈</view>
            <button class="mini" :loading="similarLoadingId === item.sessionId" @tap="makeSimilar(item.sessionId)">
              再来类似的
            </button>
          </view>
          <view class="input">输入：{{ item.inputSummary }}</view>
          <view class="input strong">推荐：{{ item.recommendationSummary }}</view>
          <view class="input">反馈：{{ item.feedbackSummary || '暂无反馈' }}</view>
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
import { generateSimilarFromHistory, getGroupedHistory } from '../../api/history';
import { useRecommendationStore } from '../../stores/recommendation';
import { useUserStore } from '../../stores/user';
import type { HistoryGroup } from '../../types/recommendation';

const user = useUserStore();
const recommendation = useRecommendationStore();
const loading = ref(false);
const similarLoadingId = ref<number | null>(null);
const groups = ref<HistoryGroup[]>([]);

onShow(load);

async function load() {
  loading.value = true;
  try {
    await user.ensureLogin();
    groups.value = (await getGroupedHistory()).groups;
  } catch (error) {
    uni.showToast({ title: (error as Error).message || '读取历史失败', icon: 'none' });
  } finally {
    loading.value = false;
  }
}

async function makeSimilar(sessionId: number) {
  similarLoadingId.value = sessionId;
  try {
    const response = await generateSimilarFromHistory(sessionId);
    recommendation.setResponse(response);
    uni.navigateTo({ url: '/pages/result/result' });
  } catch (error) {
    uni.showToast({ title: (error as Error).message || '生成失败', icon: 'none' });
  } finally {
    similarLoadingId.value = null;
  }
}
</script>

<style scoped>
.title {
  color: #111827;
  font-size: 42rpx;
  font-weight: 900;
}

.group + .group {
  margin-top: 30rpx;
}

.session {
  margin-top: 14rpx;
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

.section-label {
  color: #7d746a;
  font-size: 24rpx;
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

.strong {
  color: #374151;
  font-weight: 700;
}
</style>
