import { request } from './request';
import type { FeedbackAction } from '../types/feedback';
import type { FeedbackResponse, GenerateDinnerRequest, GenerateDinnerResponse } from '../types/recommendation';

export function generateDinner(data: GenerateDinnerRequest) {
  return request<GenerateDinnerResponse>({
    url: '/api/recommendations/generate',
    method: 'POST',
    data,
  });
}

export function submitFeedback(recommendationId: number, sessionId: number, action: FeedbackAction) {
  return request<FeedbackResponse>({
    url: `/api/recommendations/${recommendationId}/feedback`,
    method: 'POST',
    data: { sessionId, action },
  });
}
