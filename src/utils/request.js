import axios from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export const serverUrl = 'http://localhost:1337';

const instance = axios.create({
  baseURL: serverUrl, //请求的基础地址
  timeout: 5000, // 超时时间
});

// Add a request interceptor 全局请求拦截
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    NProgress.start(); // 启动进度条
    // 此处还可以设置token
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor 全局相应拦截
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    NProgress.done();

    // 如果是固定的数据返回模式，此处可以做继续完整的封装

    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    NProgress.done();

    // 此处需要对返回的状态码或者异常信息作统一处理

    return Promise.reject(error);
  }
);

/**
 * get 请求
 * @param {*} url     请求地址
 * @param {*} params  传递的数据
 * @returns
 */
export const get = (url, params) =>
  instance.get(url, {
    params, // url传递的参数
  });

/**
 * post 请求
 * @param {*} url     请求地址
 * @param {*} data    数据
 * @returns
 */
export const post = (url, data) => instance.post(url, data);

/**
 * put  请求
 * @param {*} url     请求地址
 * @param {*} data    数据
 * @returns
 */
export const put = (url, data) => instance.put(url, data);

/**
 * delete   请求
 * @param {*} url     请求地址
 * @returns
 */
export const del = (url) => instance.delete(url);
