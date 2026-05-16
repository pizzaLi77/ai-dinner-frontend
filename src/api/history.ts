import { request } from './request';
import type { GenerateDinnerResponse, GroupedHistoryResponse } from '../types/recommendation';

export function getGroupedHistory(page = 1, pageSize = 10) {
  return request<GroupedHistoryResponse>({
    url: `/api/history/grouped?page=${page}&pageSize=${pageSize}`,
    method: 'GET',
  });
}

export function generateSimilarFromHistory(sessionId: number) {
  return request<GenerateDinnerResponse>({
    url: `/api/history/${sessionId}/similar`,
    method: 'POST',
  });
}
