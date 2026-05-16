import { request } from './request';
import type { FeedbackAction } from '../types/feedback';
import type {
  DinnerRecommendation,
  FeedbackResponse,
  GenerateDinnerRequest,
  GenerateDinnerResponse,
} from '../types/recommendation';

export function generateDinner(data: GenerateDinnerRequest) {
  return request<GenerateDinnerResponse>({
    url: '/api/recommendations/generate',
    method: 'POST',
    data,
  });
}

export function submitFeedback(recommendationId: number, sessionId: number, action: FeedbackAction, extraReason?: string) {
  return request<FeedbackResponse>({
    url: `/api/recommendations/${recommendationId}/feedback`,
    method: 'POST',
    data: { sessionId, action, extraReason },
  });
}

export function replaceRecommendation(recommendationId: number, sessionId: number, type: DinnerRecommendation['type']) {
  return request<DinnerRecommendation>({
    url: `/api/recommendations/${recommendationId}/replace`,
    method: 'POST',
    data: { sessionId, type },
  });
}
