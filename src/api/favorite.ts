import { request } from './request';
import type { FavoriteDish, GenerateDinnerResponse, PageResponse, TodayDinnerPlanItem } from '../types/recommendation';

export function getFavorites(tag = '', page = 1, pageSize = 20) {
  const tagQuery = tag ? `&tag=${encodeURIComponent(tag)}` : '';
  return request<PageResponse<FavoriteDish>>({
    url: `/api/favorites?page=${page}&pageSize=${pageSize}${tagQuery}`,
    method: 'GET',
  });
}

export function generateSimilarFromFavorite(favoriteId: number) {
  return request<GenerateDinnerResponse>({
    url: `/api/favorites/${favoriteId}/similar`,
    method: 'POST',
  });
}

export function addFavoriteToToday(favoriteId: number) {
  return request<TodayDinnerPlanItem>({
    url: `/api/favorites/${favoriteId}/add-to-today`,
    method: 'POST',
  });
}
