import axios from 'axios';
import nprogress from 'nprogress';
// 引入的 nprogress 是一个对象，这个对象有方法 start:进度条开始，done:进度条结束
// 引入进度条的样式，这样进度条才能工作
import 'nprogress/nprogress.css';
// 引入 store
import store from '@/store';

const requests = axios.create({
    baseURL:'/api',
    timeout:5000
});

// requests.interceptors.requset.use((config)=>{
//     return config;
// });
//请求拦截器 --- 在项目中发请求，可以做一些事情
requests.interceptors.request.use(config => {
    // 在请求拦截器里面配置进度条开始，当发送请求的时候能触发。
    if(store.state.detail.uuid_token){
        // 如果有 uuid_token 我们给请求头加一个字段，这个字段是和后台保持一致的
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 如果有 token 需要携带给服务器，在headers
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }
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