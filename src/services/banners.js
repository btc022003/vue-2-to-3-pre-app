import { get } from '../utils/request';

/**
 * 获取轮播图
 * @returns
 */
export const loadBannersAPI = () => get('/api/v1/banners');
