import { request } from './request';
import type { HistorySession, PageResponse } from '../types/recommendation';

export function getHistory(page = 1, pageSize = 10) {
  return request<PageResponse<HistorySession>>({
    url: `/api/history?page=${page}&pageSize=${pageSize}`,
    method: 'GET',
  });
}
