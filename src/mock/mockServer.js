import Mock from 'mockjs';  // 注意我们要引入 mock 这个Mock 是一个对象 要注意大写。

// 在 webpack 中 json 和图片数据都是默认暴露的，不需要暴露，直接引用即可。
import bannerList from './banner.json';
import floorList from './floor.json';
import userAddress from './address.json'
import payInfo from './payInfo.json'

// mock 数据，设置我们请求的URL, 调用 Mock 对象上的 mock 方法，设置 我们的拦截规则
// Mock.mock(); 方法接收两个参数，第一个参数是 我们的请求地址，第二个参数是我们的响应对象。

Mock.mock('/mock/banner', {code: 200, data: bannerList}); // 当请求路径为 /mock/banner 的时候，浏览器会拦截这个请求，
//并把我们设置的响应返回
Mock.mock('/mock/floor', {code: 200, data: floorList}); 

Mock.mock('/mock/user/userAddress/auth/findUserAddressList', {code: 200, data: userAddress});

Mock.mock('/mock/order/auth/submitOrder', {code: 200, data: 177321, ok: true});

Mock.mock('/mock/payment/weixin/createNative', {code: 200, message: "成功", data: payInfo, ok: true});