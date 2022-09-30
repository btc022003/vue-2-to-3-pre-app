import { get } from '../utils/request';

/**
 * 获取商品分类
 * @returns
 */
export const loadCategoriesAPI = () => get('/api/v1/product_categories');
