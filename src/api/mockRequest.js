// 本模块是封装我们的 mock 请求时的路径等相关设置，是在 文件 ./request.js 的基础上改的。
import axios from 'axios';

import nprogress from 'nprogress';
import 'nprogress/nprogress.css'


const request = axios.create({
  baseURL: '/mock',// 在 ./request.js 文件的基础上 只更改了baseURL
  timeout: 5000,
});


request.interceptors.request.use((config)=> {

  nprogress.start();// 开启进度条
  return config
});


request.interceptors.response.use((res)=>{

  nprogress.done();// 结束进度条
  return res.data
}, (err)=> {
  return Promise.reject(new Error('faile'))
});


export default request;