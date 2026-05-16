<template>
  <view class="card">
    <view class="card-head">
      <view>
        <view class="type" :class="item.type">{{ item.typeLabel || TYPE_LABELS[item.type] }}</view>
        <view class="name">{{ item.name }}</view>
      </view>
      <view class="time">{{ item.estimatedTimeMinutes }} 分钟</view>
    </view>

    <view class="reason">{{ item.reason }}</view>

    <view class="meta">
      <text>{{ DIFFICULTY_LABELS[item.difficulty] }}</text>
      <text v-for="tag in item.tags" :key="tag">{{ tag }}</text>
    </view>

    <view class="block">
      <view class="label">会用到</view>
      <view class="content">{{ joinTags(item.ingredientsUsed) }}</view>
    </view>

    <view v-if="item.missingIngredients.length" class="block">
      <view class="label">还缺</view>
      <view class="content">
        <text v-for="ingredient in item.missingIngredients" :key="ingredient.name" class="ingredient">
          {{ ingredient.name }}{{ ingredient.optional ? '（可选）' : '' }}
        </text>
      </view>
    </view>

    <view class="block">
      <view class="label">步骤</view>
      <view v-for="(step, index) in item.steps" :key="step" class="step">
        <text class="step-index">{{ index + 1 }}</text>
        <text>{{ step }}</text>
      </view>
    </view>

    <view v-if="item.substitutions.length" class="block">
      <view class="label">替换</view>
      <view v-for="substitution in item.substitutions" :key="substitution" class="content">{{ substitution }}</view>
    </view>

    <view class="actions">
      <button :class="{ active: item.feedbackSummary?.liked }" @tap="emitFeedback('like')">喜欢</button>
      <button :class="{ active: item.feedbackSummary?.neutral }" @tap="emitFeedback('neutral')">一般</button>
      <button @tap="emitFeedback('replace')">换一个</button>
      <button @tap="emitFeedback(item.feedbackSummary?.saved ? 'unsave' : 'save')">
        {{ item.feedbackSummary?.saved ? '已收藏' : '收藏' }}
      </button>
      <button :class="{ active: item.feedbackSummary?.addToToday }" @tap="emitFeedback('add_to_today')">
        加入今日晚餐
      </button>
      <button @tap="emitFeedback('cooked')">今天做了</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { DIFFICULTY_LABELS, TYPE_LABELS } from '../utils/constants';
import { joinTags } from '../utils/format';
import type { FeedbackAction } from '../types/feedback';
import type { DinnerRecommendation } from '../types/recommendation';

defineProps<{ item: DinnerRecommendation }>();

const emit = defineEmits<{
  feedback: [action: FeedbackAction];
}>();

function emitFeedback(action: FeedbackAction) {
  emit('feedback', action);
}
</script>

<style scoped>
.card {
  background: #ffffff;
  border: 1rpx solid rgba(31, 41, 51, 0.08);
  border-radius: 16rpx;
  padding: 28rpx;
}

.card + .card {
  margin-top: 24rpx;
}

.card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20rpx;
}

.type {
  color: #1f6f5b;
  font-size: 24rpx;
  font-weight: 700;
}

.type.easy {
  color: #a85f2d;
}

.type.satisfying {
  color: #9a6a15;
}

.type.healthy {
  color: #4f7a57;
}

.name {
  margin-top: 8rpx;
  color: #111827;
  font-size: 38rpx;
  font-weight: 800;
  line-height: 1.22;
}

.time {
  flex: 0 0 auto;
  padding: 8rpx 14rpx;
  border-radius: 999rpx;
  background: #fff2d8;
  color: #8a5a00;
  font-size: 24rpx;
  font-weight: 700;
}

.reason {
  margin-top: 18rpx;
  color: #4b5563;
  font-size: 28rpx;
  line-height: 1.55;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
  margin-top: 18rpx;
}

.meta text {
  padding: 7rpx 14rpx;
  border-radius: 999rpx;
  background: #eef3f0;
  color: #315447;
  font-size: 23rpx;
}

.block {
  margin-top: 24rpx;
}

.label {
  margin-bottom: 10rpx;
  color: #111827;
  font-size: 26rpx;
  font-weight: 800;
}

.content {
  color: #4b5563;
  font-size: 27rpx;
  line-height: 1.55;
}

.ingredient {
  display: inline-block;
  margin-right: 16rpx;
  color: #4b5563;
  font-size: 27rpx;
}

.step {
  display: flex;
  gap: 14rpx;
  margin-top: 12rpx;
  color: #374151;
  font-size: 27rpx;
  line-height: 1.55;
}

.step-index {
  flex: 0 0 38rpx;
  width: 38rpx;
  height: 38rpx;
  border-radius: 50%;
  background: #1f6f5b;
  color: #ffffff;
  text-align: center;
  line-height: 38rpx;
  font-size: 22rpx;
  font-weight: 700;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
  margin-top: 26rpx;
}

.actions button {
  width: auto;
  margin: 0;
  padding: 0 18rpx;
  min-height: 58rpx;
  border-radius: 12rpx;
  background: #f4f1ea;
  color: #374151;
  font-size: 24rpx;
  line-height: 58rpx;
}

.actions button.active {
  background: #f0d6c0;
  color: #a85f2d;
  font-weight: 700;
}
</style>
