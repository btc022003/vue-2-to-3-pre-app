import { serverUrl } from './request';

/**
 * 为传递过来的字符串在首尾添加中文标识
 * @param {*} str
 * @returns
 */
export const extName = (str) => `【-${str}-】`;

/**
 * 处理图片
 * @param {*} url
 */
export const dalImg = (url) => {
  if (url) {
    if (url.startsWith('http')) {
      return url;
    }
    return serverUrl + url;
  }
  return 'https://img1.baidu.com/it/u=2061440433,1350439428&fm=253&fmt=auto&app=138&f=JPEG?w=506&h=494';
};
