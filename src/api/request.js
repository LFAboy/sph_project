// 本模块主要是 对 axois 的二次封装，为什么要进行二次封装？
// 二次封装可以设置请求拦截器、响应拦截器，请求拦截器可以在发送请求之前处理一些业务，响应拦截器可以在服务器的数据返回后做一些处理。
// 此处进行二次封装要实现的业务是？
import axios from 'axios';

// 引入我们的进度条插件。注意： 使用进度条效果，还要引入进度条的样式。
import nprogress from 'nprogress';
import 'nprogress/nprogress.css'
// up: nprogress 对象上有两个方法，start方法进度条开始， done方法进度条结束

import store from '@/store';
// up: 引入我们的大仓库，可以拿到大仓库中detail 小仓库中存储的用户的uuid 在发送请求的时候拦截，携带这个参数，用请求头携带

// 引入获取我们 token 的方法
import { getToken } from '@/utils/token';

// 我们利用 axios 对象上的 create()方法可以创建一个 axios 对象,这个方法接收一个配置对象作为参数。
const request = axios.create({
  // 设置 baseUrl 的目的就是在请求地址后面/请求路径前面加上这baseUrl，省的我们去多次去搞。
  baseURL: '/api',
  // 设置超时时间，当请求超时时，就结束请求。
  timeout: 5000,
});


// 设置请求拦截器, 接收的参数是一个函数，函数有一个形参，这个形参是一个配置对象。
request.interceptors.request.use((config)=> {
  // config 对象有一个非常重要的属性，header请求头

  // 发送请求的时候判断是否有 uuid，如果有就携带,注意携带的请求头的键是与后端约定好的
  if (store.state.detail.uuid) {
    // userTempId 就是我们往 请求头中添加的字段,这个字段是与后端协商的
    config.headers.userTempId = store.state.detail.uuid;
  }

  // 如果用户有token 那么请求的时候也应该携带上 token
  if (getToken()) {
    config.headers.token = getToken();
  }

  nprogress.start();// 开启进度条
  return config
});


// 设置响应拦截器,response.use() 方法接收两个函数参数，成功的回调和失败的回调处理函数
request.interceptors.response.use((res)=>{

  nprogress.done();// 结束进度条
  return res.data
}, (err)=> {
  return Promise.reject(new Error('faile'))
});


export default request;