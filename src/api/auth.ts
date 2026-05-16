import { request } from './request';
import type { LoginResponse } from '../types/user';

export async function loginByWechat() {
  let code: string;
  try {
    const loginRes = await uni.login({ provider: 'weixin' });
    code = loginRes.code;
  } catch {
    code = 'h5_mock_' + Date.now();
  }
  return request<LoginResponse>({
    url: '/api/auth/wechat/login',
    method: 'POST',
    data: { code },
  });
}
