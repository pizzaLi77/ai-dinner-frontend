<template>
  <view class="page">
    <LoadingState v-if="loading" text="正在读取口味画像" />
    <template v-else-if="profile">
      <view class="title">我的口味</view>
      <view class="panel summary">{{ profile.preferenceSummary }}</view>

      <view class="section panel form">
        <view class="field">
          <view class="label">辣度：{{ editable.spicyLevel }}</view>
          <slider :value="editable.spicyLevel" min="0" max="5" activeColor="#1f6f5b" @change="onSpicyChange" />
        </view>
        <view class="field">
          <view class="label">偏好口味</view>
          <input v-model="preferredTastesText" class="input" placeholder="微辣、热乎、下饭" />
        </view>
        <view class="field">
          <view class="label">不喜欢食材</view>
          <input v-model="dislikedIngredientsText" class="input" placeholder="香菜、肥肉" />
        </view>
        <view class="field">
          <view class="label">常用厨具</view>
          <input v-model="cookingToolsText" class="input" placeholder="一口炒锅、电饭锅" />
        </view>
        <view class="field">
          <view class="label">常用食材</view>
          <input v-model="commonIngredientsText" class="input" placeholder="鸡蛋、番茄、青菜" />
        </view>
        <view class="field">
          <view class="label">健康目标</view>
          <input v-model="healthGoalsText" class="input" placeholder="less_oil、high_protein" />
        </view>
      </view>

      <button class="primary-button submit" :loading="saving" @tap="save">保存口味</button>
    </template>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import LoadingState from '../../components/LoadingState.vue';
import { getMyProfile, updateMyProfile } from '../../api/profile';
import { useUserStore } from '../../stores/user';
import type { UserProfile } from '../../types/profile';

const user = useUserStore();
const loading = ref(false);
const saving = ref(false);
const profile = ref<UserProfile | null>(null);
const editable = reactive<Partial<UserProfile>>({});
const preferredTastesText = ref('');
const dislikedIngredientsText = ref('');
const cookingToolsText = ref('');
const commonIngredientsText = ref('');
const healthGoalsText = ref('');

onShow(load);

async function load() {
  loading.value = true;
  try {
    await user.ensureLogin();
    profile.value = await getMyProfile();
    Object.assign(editable, profile.value);
    preferredTastesText.value = profile.value.preferredTastes.join('、');
    dislikedIngredientsText.value = profile.value.dislikedIngredients.join('、');
    cookingToolsText.value = profile.value.cookingTools.join('、');
    commonIngredientsText.value = profile.value.commonIngredients.join('、');
    healthGoalsText.value = profile.value.healthGoals.join('、');
  } catch (error) {
    uni.showToast({ title: (error as Error).message || '读取失败', icon: 'none' });
  } finally {
    loading.value = false;
  }
}

function onSpicyChange(event: { detail: { value: number } }) {
  editable.spicyLevel = event.detail.value;
}

function splitText(value: string) {
  return value.split(/[、,，\s]+/).map((item) => item.trim()).filter(Boolean);
}

async function save() {
  if (!profile.value) return;
  saving.value = true;
  try {
    const payload: Partial<UserProfile> = {
      spicyLevel: editable.spicyLevel,
      preferredDifficulty: editable.preferredDifficulty,
      preferredCookingTimeMinutes: editable.preferredCookingTimeMinutes,
      preferredTastes: splitText(preferredTastesText.value),
      dislikedIngredients: splitText(dislikedIngredientsText.value),
      cookingTools: splitText(cookingToolsText.value),
      commonIngredients: splitText(commonIngredientsText.value),
      healthGoals: splitText(healthGoalsText.value),
      dislikedTastes: profile.value.dislikedTastes,
      favoriteIngredients: profile.value.favoriteIngredients,
    };
    profile.value = await updateMyProfile(payload);
    user.setProfile(profile.value);
    uni.showToast({ title: '已保存', icon: 'none' });
  } catch (error) {
    uni.showToast({ title: (error as Error).message || '保存失败', icon: 'none' });
  } finally {
    saving.value = false;
  }
}
</script>

<style scoped>
.title {
  color: #111827;
  font-size: 42rpx;
  font-weight: 900;
}

.summary {
  margin-top: 24rpx;
  color: #315447;
  font-size: 28rpx;
  line-height: 1.6;
  background: #edf6f1;
}

.field + .field {
  margin-top: 28rpx;
}

.label {
  margin-bottom: 12rpx;
  color: #111827;
  font-size: 27rpx;
  font-weight: 800;
}

.input {
  min-height: 74rpx;
  padding: 0 18rpx;
  border-radius: 12rpx;
  background: #f7f4ee;
  color: #111827;
  font-size: 28rpx;
}

.submit {
  margin-top: 30rpx;
}
</style>
