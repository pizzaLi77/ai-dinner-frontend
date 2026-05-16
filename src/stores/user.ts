import { defineStore } from 'pinia';
import { loginByWechat } from '../api/auth';
import { getMyProfile } from '../api/profile';
import type { UserProfile } from '../types/profile';

interface UserState {
  token: string;
  userId: number | null;
  profile: UserProfile | null;
  ready: boolean;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: uni.getStorageSync('token') || '',
    userId: uni.getStorageSync('userId') || null,
    profile: null,
    ready: false,
  }),
  actions: {
    async ensureLogin() {
      if (!this.token) {
        const data = await loginByWechat();
        this.token = data.token;
        this.userId = data.userId;
        this.profile = data.profile;
        uni.setStorageSync('token', data.token);
        uni.setStorageSync('userId', data.userId);
      } else if (!this.profile) {
        this.profile = await getMyProfile();
      }
      this.ready = true;
    },
    setProfile(profile: UserProfile) {
      this.profile = profile;
    },
    logout() {
      this.token = '';
      this.userId = null;
      this.profile = null;
      this.ready = false;
      uni.removeStorageSync('token');
      uni.removeStorageSync('userId');
    },
  },
});
