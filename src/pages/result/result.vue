<template>
  <view class="page">
    <LoadingState v-if="recommendation.loading" />
    <template v-else-if="response">
      <view class="header">
        <view class="title">今晚这 3 个最稳</view>
        <view class="subtitle">{{ response.profileSummary }}</view>
      </view>
      <view class="section">
        <RecommendationCard
          v-for="item in response.recommendations"
          :key="item.id"
          :item="item"
          @feedback="(action) => handleFeedback(item.id, response.sessionId, action)"
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
import { submitFeedback } from '../../api/recommendation';
import { useRecommendationStore } from '../../stores/recommendation';
import { useUserStore } from '../../stores/user';
import type { FeedbackAction } from '../../types/feedback';

const recommendation = useRecommendationStore();
const user = useUserStore();
const response = computed(() => recommendation.currentResponse);

async function handleFeedback(recommendationId: number, sessionId: number, action: FeedbackAction) {
  try {
    const result = await submitFeedback(recommendationId, sessionId, action);
    if (user.profile) {
      user.profile.preferenceSummary = result.updatedProfileSummary;
    }
    const item = recommendation.currentResponse?.recommendations.find((value) => value.id === recommendationId);
    if (item) {
      item.feedbackSummary = {
        liked: action === 'like' || !!item.feedbackSummary?.liked,
        disliked: action === 'dislike' || !!item.feedbackSummary?.disliked,
        saved: action === 'save' ? true : action === 'unsave' ? false : !!item.feedbackSummary?.saved,
        cooked: action === 'cooked' || !!item.feedbackSummary?.cooked,
        tooHard: action === 'too_hard' || !!item.feedbackSummary?.tooHard,
        tooLight: action === 'too_light' || !!item.feedbackSummary?.tooLight,
        tooOily: action === 'too_oily' || !!item.feedbackSummary?.tooOily,
      };
    }
    uni.showToast({ title: action === 'save' ? '已收藏' : '反馈已保存', icon: 'none' });
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
