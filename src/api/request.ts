import axios from 'axios';

// 引入进度条组件 nprogress， 注意还要引入进度条的样式。
import NProgress from 'nprogress'
import pinia from '@/store/store';
import { useUserStore } from '@/store/user';
import { getToken } from '@/utils/token';

// 创建 axios 实例
const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
})
const userStore = useUserStore(pinia);

// 设置请求拦截器
axiosInstance.interceptors.request.use((config) => {
  // config 参数是我们创建 axios 实例的配置对象, 这个函数会在请求发送之前做一些处理

  // 如果有 uuid 也就是游客的id 那么就给服务器带过去。
  if (userStore.uuid_token) {
    config.headers.userTempId = userStore.uuid_token;
  }

  // 如果有 token 也携带给服务器
  if (getToken()) {
    config.headers.token = getToken();
  }

  NProgress.start();  //开启进度条

  return config;
}, err => {
  // 对请求错误做些什么
  return Promise.reject(err);
})


// 设置响应拦截器
axiosInstance.interceptors.response.use(response => {
  // 在响应状态码 2xx 是会调用
  
  NProgress.done(); // 结束进度条

  return response.data;
}, err => {
  // 在响应状态码超出 2xx 时会调用

  return Promise.reject(new Error("faile"));
})


export default axiosInstance;