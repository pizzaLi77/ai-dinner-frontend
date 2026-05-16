<template>
  <view class="page">
    <view class="title">今晚想吃点什么？</view>
    <view class="summary panel">
      {{ user.profile?.preferenceSummary || '告诉我家里有什么、今天状态、想吃口味，我帮你想 3 个晚餐方案。' }}
    </view>

    <view class="section panel">
      <textarea
        v-model="freeText"
        class="input"
        maxlength="500"
        placeholder="例如：有鸡蛋、番茄、豆腐，今天很累，想吃热乎一点，最好少洗锅。"
      />
    </view>

    <view class="section panel">
      <TagSelector v-model="selectedMoods" title="今天状态" :options="MOOD_TAGS" multiple />
      <view class="divider" />
      <TagSelector v-model="selectedTastes" title="口味方向" :options="TASTE_TAGS" multiple />
      <view class="divider" />
      <TagSelector v-model="selectedTime" title="可用时间" :options="TIME_TAGS" />
      <view class="divider" />
      <TagSelector v-model="selectedTools" title="可用厨具" :options="TOOL_TAGS" multiple />
    </view>

    <button class="primary-button submit" :loading="recommendation.loading" @tap="handleGenerate">
      帮我想想今晚吃啥
    </button>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import TagSelector from '../../components/TagSelector.vue';
import { trackEvent } from '../../api/analytics';
import { useRecommendationStore } from '../../stores/recommendation';
import { useUserStore } from '../../stores/user';
import { MOOD_TAGS, TASTE_TAGS, TIME_TAGS, TOOL_TAGS } from '../../utils/constants';
import { validateGenerateRequest } from '../../utils/validators';
import type { GenerateDinnerRequest } from '../../types/recommendation';

const user = useUserStore();
const recommendation = useRecommendationStore();
const freeText = ref('');
const selectedMoods = ref<string[]>([]);
const selectedTastes = ref<string[]>([]);
const selectedTime = ref<string | null>('20分钟');
const selectedTools = ref<string[]>([]);

onShow(async () => {
  try {
    await user.ensureLogin();
  } catch (error) {
    uni.showToast({ title: (error as Error).message || '登录失败', icon: 'none' });
  }
});

async function handleGenerate() {
  const request: GenerateDinnerRequest = {
    freeText: freeText.value.trim(),
    selectedMoods: selectedMoods.value,
    selectedTastes: selectedTastes.value,
    selectedTime: selectedTime.value,
    selectedTools: selectedTools.value,
  };
  const message = validateGenerateRequest(request);
  if (message) {
    uni.showToast({ title: message, icon: 'none' });
    return;
  }
  try {
    await trackEvent('generate_click', {
      hasFreeText: !!request.freeText,
      selectedMoodsCount: request.selectedMoods.length,
      selectedTastesCount: request.selectedTastes.length,
    });
    await recommendation.generate(request);
    uni.navigateTo({ url: '/pages/result/result' });
  } catch (error) {
    uni.showToast({ title: (error as Error).message || '我刚刚有点卡住了', icon: 'none' });
  }
}
</script>

<style scoped>
.title {
  color: #111827;
  font-size: 46rpx;
  font-weight: 900;
  line-height: 1.2;
}

.summary {
  margin-top: 24rpx;
  color: #315447;
  font-size: 28rpx;
  line-height: 1.6;
  background: #edf6f1;
}

.input {
  width: 100%;
  min-height: 210rpx;
  color: #111827;
  font-size: 30rpx;
  line-height: 1.55;
}

.divider {
  height: 1rpx;
  margin: 26rpx 0;
  background: #edf0ed;
}

.submit {
  margin-top: 30rpx;
}
</style>
