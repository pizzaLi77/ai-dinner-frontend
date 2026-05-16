<template>
  <view class="page">
    <view class="title">收藏菜品</view>
    <LoadingState v-if="loading" text="正在读取收藏" />
    <EmptyState v-else-if="items.length === 0" title="还没有收藏" description="在推荐结果里点收藏，之后就能在这里找回。" />
    <view v-else class="section list">
      <view v-for="item in items" :key="item.id" class="panel dish">
        <view class="dish-head">
          <view class="name">{{ item.name }}</view>
          <view class="time">{{ item.estimatedTimeMinutes }} 分钟</view>
        </view>
        <view class="tags">{{ joinTags(item.tags) }}</view>
        <view class="ingredients">会用到：{{ joinTags(item.ingredientsUsed) }}</view>
        <button class="ghost-button" @tap="goHome">从这个口味再想一顿</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import EmptyState from '../../components/EmptyState.vue';
import LoadingState from '../../components/LoadingState.vue';
import { getFavorites } from '../../api/favorite';
import { useUserStore } from '../../stores/user';
import type { FavoriteDish } from '../../types/recommendation';
import { joinTags } from '../../utils/format';

const user = useUserStore();
const loading = ref(false);
const items = ref<FavoriteDish[]>([]);

onShow(load);

async function load() {
  loading.value = true;
  try {
    await user.ensureLogin();
    items.value = (await getFavorites()).records;
  } catch (error) {
    uni.showToast({ title: (error as Error).message || '读取收藏失败', icon: 'none' });
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

.dish + .dish {
  margin-top: 20rpx;
}

.dish-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16rpx;
}

.name {
  color: #111827;
  font-size: 32rpx;
  font-weight: 800;
}

.time {
  flex: 0 0 auto;
  color: #8a5a00;
  font-size: 24rpx;
  font-weight: 700;
}

.tags,
.ingredients {
  margin-top: 14rpx;
  color: #6b7280;
  font-size: 26rpx;
  line-height: 1.45;
}

.ghost-button {
  margin-top: 22rpx;
}
</style>
