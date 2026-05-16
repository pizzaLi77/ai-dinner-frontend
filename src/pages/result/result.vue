<template>
  <view class="page">
    <LoadingState v-if="recommendation.loading" />
    <template v-else-if="response">
      <view class="header">
        <view class="title">今晚这 3 个最稳</view>
        <view class="subtitle">{{ response?.profileSummary }}</view>
      </view>
      <view class="section">
        <RecommendationCard
          v-for="item in response?.recommendations || []"
          :key="item.id"
          :item="item"
          @feedback="(action) => handleFeedback(item, item.sessionId, action)"
        />
      </view>
    </template>
    <EmptyState v-else title="还没有推荐" description="回到首页告诉我今天的食材和状态。" />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import EmptyState from '../../components/EmptyState.vue';
import LoadingState from '../../components/LoadingState.vue';
import RecommendationCard from '../../components/RecommendationCard.vue';
import { replaceRecommendation, submitFeedback } from '../../api/recommendation';
import { useRecommendationStore } from '../../stores/recommendation';
import { useUserStore } from '../../stores/user';
import type { FeedbackAction } from '../../types/feedback';
import type { DinnerRecommendation } from '../../types/recommendation';

const recommendation = useRecommendationStore();
const user = useUserStore();
const response = computed(() => recommendation.currentResponse);

async function handleFeedback(item: DinnerRecommendation, sessionId: number, action: FeedbackAction) {
  try {
    if (action === 'replace') {
      const next = await replaceRecommendation(item.id, sessionId, item.type);
      const list = recommendation.currentResponse?.recommendations;
      const index = list?.findIndex((value) => value.id === item.id) ?? -1;
      if (list && index >= 0) {
        list[index] = next;
      }
      uni.showToast({ title: '已换一个', icon: 'none' });
      return;
    }

    const result = await submitFeedback(item.id, sessionId, action);
    if (user.profile) {
      user.profile.preferenceSummary = result.profileSummary;
    }
    item.feedbackSummary = {
      liked: action === 'like' || !!item.feedbackSummary?.liked,
      disliked: action === 'dislike' || !!item.feedbackSummary?.disliked,
      saved: action === 'save' ? true : action === 'unsave' ? false : !!item.feedbackSummary?.saved,
      cooked: action === 'cooked' || !!item.feedbackSummary?.cooked,
      neutral: action === 'neutral' || !!item.feedbackSummary?.neutral,
      addToToday: action === 'add_to_today' || !!item.feedbackSummary?.addToToday,
      tooHard: action === 'too_hard' || !!item.feedbackSummary?.tooHard,
      tooLight: action === 'too_light' || !!item.feedbackSummary?.tooLight,
      tooOily: action === 'too_oily' || !!item.feedbackSummary?.tooOily,
    };
    const toastTitle = action === 'save' ? '已收藏' : action === 'add_to_today' ? '已加入今日晚餐' : '反馈已保存';
    uni.showToast({ title: toastTitle, icon: 'none' });
  } catch (error) {
    uni.showToast({ title: (error as Error).message || '反馈保存失败了', icon: 'none' });
  }
}
</script>

<style scoped>
.header {
  padding: 8rpx 0 4rpx;
}

.title {
  color: #111827;
  font-size: 42rpx;
  font-weight: 900;
}

.subtitle {
  margin-top: 14rpx;
  color: #6b7280;
  font-size: 27rpx;
  line-height: 1.5;
}
</style>
