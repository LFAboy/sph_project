import axios from 'axios';
import nprogress from 'nprogress';
// 引入的 nprogress 是一个对象，这个对象有方法 start:进度条开始，done:进度条结束
// 引入进度条的样式，这样进度条才能工作
import 'nprogress/nprogress.css';

const requests = axios.create({
    baseURL:'/mock',
    timeout:5000
});

// requests.interceptors.requset.use((config)=>{
//     return config;
// });
requests.interceptors.request.use(config => {
    // 在请求拦截器里面配置进度条开始，当发送请求的时候能触发。
    nprogress.start();
    return config;
})

requests.interceptors.response.use((res)=>{
    // 进度条结束
    nprogress.done();
    return res.data;
// eslint-disable-next-line no-unused-vars
},(error)=>{
    return Promise.reject(new Error('falie'))
});

export default requests;