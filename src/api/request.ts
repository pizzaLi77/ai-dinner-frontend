const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export function request<T>(options: UniApp.RequestOptions): Promise<T> {
  return new Promise((resolve, reject) => {
    const token = uni.getStorageSync('token');
    uni.request({
      ...options,
      url: `${BASE_URL}${options.url}`,
      header: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
        ...(options.header || {}),
      },
      success: (res) => {
        const body = res.data as ApiResponse<T>;
        if (res.statusCode >= 200 && res.statusCode < 300 && body.code === 0) {
          resolve(body.data);
        } else if (body.code === 40001) {
          uni.removeStorageSync('token');
          reject(new Error('登录状态过期了，正在重新登录。'));
        } else {
          reject(new Error(body.message || '请求失败'));
        }
      },
      fail: () => reject(new Error('网络好像不太稳定，稍后再试一下。')),
    });
  });
}
