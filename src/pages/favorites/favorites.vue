<template>
  <view class="page">
    <view class="title">收藏</view>
    <view class="filters">
      <button
        v-for="tag in filterTags"
        :key="tag"
        class="filter"
        :class="{ active: activeTag === tag }"
        @tap="selectTag(tag)"
      >
        {{ tag }}
      </button>
    </view>
    <LoadingState v-if="loading" text="正在读取收藏" />
    <EmptyState v-else-if="items.length === 0" title="还没有收藏" description="在推荐结果里点收藏，之后就能在这里找回。" />
    <view v-else class="section list">
      <view v-for="item in items" :key="item.id" class="panel dish">
        <view class="dish-head">
          <view class="name">{{ item.name }}</view>
          <view class="time">{{ item.estimatedTimeMinutes }} 分钟</view>
        </view>
        <view class="summary">{{ item.summary }}</view>
        <view class="tags">{{ joinTags(item.tags) }}</view>
        <view class="ingredients">会用到：{{ joinTags(item.ingredientsUsed) }}</view>
        <view class="actions">
          <button class="ghost-button" :loading="similarLoadingId === item.id" @tap="makeSimilar(item.id)">
            再来类似的
          </button>
          <button class="soft-button" :loading="todayLoadingId === item.id" @tap="addToToday(item.id)">
            加入今日晚餐
          </button>
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
import { addFavoriteToToday, generateSimilarFromFavorite, getFavorites } from '../../api/favorite';
import { useRecommendationStore } from '../../stores/recommendation';
import { useUserStore } from '../../stores/user';
import type { FavoriteDish } from '../../types/recommendation';
import { joinTags } from '../../utils/format';

const user = useUserStore();
const recommendation = useRecommendationStore();
const loading = ref(false);
const similarLoadingId = ref<number | null>(null);
const todayLoadingId = ref<number | null>(null);
const activeTag = ref('全部');
const filterTags = ['全部', '家常', '快手', '汤面', '低脂', '想再做'];
const items = ref<FavoriteDish[]>([]);

onShow(load);

async function load() {
  loading.value = true;
  try {
    await user.ensureLogin();
    const tag = activeTag.value === '全部' ? '' : activeTag.value;
    items.value = (await getFavorites(tag)).records;
  } catch (error) {
    uni.showToast({ title: (error as Error).message || '读取收藏失败', icon: 'none' });
  } finally {
    loading.value = false;
  }
}

function selectTag(tag: string) {
  activeTag.value = tag;
  load();
}

async function makeSimilar(favoriteId: number) {
  similarLoadingId.value = favoriteId;
  try {
    const response = await generateSimilarFromFavorite(favoriteId);
    recommendation.setResponse(response);
    uni.navigateTo({ url: '/pages/result/result' });
  } catch (error) {
    uni.showToast({ title: (error as Error).message || '生成失败', icon: 'none' });
  } finally {
    similarLoadingId.value = null;
  }
}

async function addToToday(favoriteId: number) {
  todayLoadingId.value = favoriteId;
  try {
    await addFavoriteToToday(favoriteId);
    uni.showToast({ title: '已加入今日晚餐', icon: 'none' });
  } catch (error) {
    uni.showToast({ title: (error as Error).message || '加入失败', icon: 'none' });
  } finally {
    todayLoadingId.value = null;
  }
}
</script>

<style scoped>
.title {
  color: #111827;
  font-size: 42rpx;
  font-weight: 900;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 14rpx;
  margin-top: 24rpx;
}

.filter {
  width: auto;
  margin: 0;
  padding: 0 22rpx;
  min-height: 56rpx;
  border-radius: 999rpx;
  border: 1rpx solid #d8c9b8;
  background: #ffffff;
  color: #7d746a;
  font-size: 24rpx;
  line-height: 56rpx;
}

.filter.active {
  border-color: #a85f2d;
  background: #f0d6c0;
  color: #a85f2d;
  font-weight: 700;
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
.ingredients,
.summary {
  margin-top: 14rpx;
  color: #6b7280;
  font-size: 26rpx;
  line-height: 1.45;
}

.actions {
  display: flex;
  gap: 16rpx;
  margin-top: 22rpx;
}

.ghost-button,
.soft-button {
  flex: 1;
  min-height: 68rpx;
  font-size: 26rpx;
}

.soft-button {
  border-radius: 12rpx;
  background: #f0d6c0;
  color: #a85f2d;
}
</style>
