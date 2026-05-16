import { request } from './request';
import type { FavoriteDish, PageResponse } from '../types/recommendation';

export function getFavorites(page = 1, pageSize = 20) {
  return request<PageResponse<FavoriteDish>>({
    url: `/api/favorites?page=${page}&pageSize=${pageSize}`,
    method: 'GET',
  });
}
