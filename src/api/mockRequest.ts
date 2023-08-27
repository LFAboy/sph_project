// 在这个文件中我们创建另一个 axios 实例，这个实例的baseUrl 为 mock
import axios from "axios";


const mockRequest = axios.create({
  baseURL: '/mock',
  timeout: 10000,
})


// 请求拦截器
mockRequest.interceptors.request.use(config => {
  return config;
})

// 响应拦截器
mockRequest.interceptors.response.use((response) => {
  return response.data
}, (err) => {
  console.log(err);
  return Promise.reject(new Error('mock response faile'))
})

export default mockRequest;