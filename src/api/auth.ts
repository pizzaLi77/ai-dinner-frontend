import { request } from './request';
import type { LoginResponse } from '../types/user';

export async function loginByWechat() {
  const loginRes = await uni.login({ provider: 'weixin' });
  return request<LoginResponse>({
    url: '/api/auth/wechat/login',
    method: 'POST',
    data: { code: loginRes.code },
  });
}
