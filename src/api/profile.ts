import { request } from './request';
import type { UserProfile } from '../types/profile';

export function getMyProfile() {
  return request<UserProfile>({
    url: '/api/profile/me',
    method: 'GET',
  });
}

export function updateMyProfile(data: Partial<UserProfile>) {
  return request<UserProfile>({
    url: '/api/profile/me',
    method: 'PUT',
    data,
  });
}
