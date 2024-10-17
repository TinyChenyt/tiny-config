'use strict';

import axios from 'axios';
import localStorage from './localStorage';

const axiosInstance = axios.create({
  baseURL: '/',
  timeout: 60 * 1000,
  retry: 3,
  retryInterval: 500
});

if (process.env.NODE_ENV === 'development') {
  axiosInstance.baseURL = 'http://localhost:5637';
} else if (process.env.NODE_ENV === 'production') {
  axiosInstance.baseURL = '';
}

const { isCancel } = axios;
const cacheRequest = {};

const abortCacheRequest = (reqKey) => {
  if(cacheRequest[reqKey]) {
    cacheRequest[reqKey].abort();
    delete cacheRequest[reqKey];
  }
};

// 请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    const { url, method, isAbort = false } = config;

    if(isAbort) {
      const reqKey = `${url}&${method}`;

      abortCacheRequest(reqKey);

      const controller = new AbortController();
      config.signal = controller.signal;
      cacheRequest[reqKey] = controller;
    }
    // 添加token
    if (localStorage.get('token')) {
      config.headers.Authorization = `Bearer ${localStorage.get('token')}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  response => {
    const {url, method, isAbort = false} = response.config;
    if(isAbort) {
      delete cacheRequest[`${url}&${method}`];
    }
    return response.data;
  },
  error => {
    if(isCancel(error)) {
      return Promise.reject({
        message: '请求重复，已取消'
      });
    }

    return Promise.reject(error);
  },

  function axiosRetry(res) {
    let config = res.config;

    if(!config || !config.retry) {
      return Promise.reject(res);
    }

    config.retryCount = config.retryCount || 0;

    if(config.retryCount >= config.retry) {
      return Promise.reject(res);
    }

    config.retryCount += 1;

    let back = new Promise((resolve) => {
      console.warn(`[接口请求超时]--接口${config.url}请求超时，正在进行第${config.retryCount}次重试`);
      setTimeout(() => {
        resolve();
      }, config.retryInterval || 1);
    });

    return back.then(() => axiosInstance(config));
  }
);

// 基础请求
const baseRequest = (config) => {
  return axiosInstance(config);
};

// get请求
const get = (url, params = {}) => {
  return baseRequest({
    method: 'get',
    url,
    params
  });
};

// post请求
const post = (url, data = {}) => {
  return baseRequest({
    method: 'post',
    url,
    data
  });
};

// put请求
const put = (url, data = {}) => {
  return baseRequest({
    method: 'put',
    url,
    data
  });
};

// delete请求
const del = (url, params = {}) => {
  return baseRequest({
    method: 'delete',
    url,
    params
  });
};

export default {
  axiosInstance,
  get,
  post,
  put,
  del
};

