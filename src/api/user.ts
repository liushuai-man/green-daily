import request from '@/utils/request';

/**
 * 获取验证码
 */
export const getCode = (phone: string): Promise<any> =>
  request.get('/api/send_code', { params: { phone } });

/**
 * 登录
 */
export const login = (params: { phone: string; password?: string; code?: string }): Promise<any> =>
  request.post('/api/login', null, { params });

/**
 * 注册
 */
export const register = (params: {
  phone: string;
  password: string;
  nickname: string;
}): Promise<any> => request.post('/api/register', null, { params });
