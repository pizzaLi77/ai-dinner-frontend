import { request } from './request';

export function trackEvent(eventName: string, properties: Record<string, unknown> = {}) {
  if (!uni.getStorageSync('token')) {
    return Promise.resolve(true);
  }
  return request<boolean>({
    url: '/api/analytics/events',
    method: 'POST',
    data: { eventName, properties },
  });
}
