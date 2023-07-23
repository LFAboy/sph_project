// 本模块是对接口进行统一管理。
// 为什么需要对接口统一管理呢？因为当我们的项目比较大的时候，有很多的组件都会用到同一个接口的话，那么分开写，
// 需要在每个组件中都发送一次请求。而后续如果接口更新，那么我们就需要在每一个用到这个接口的组件中都更改一下。所以进行统一管理有利于后期的维护

import request from "./request";
import mockRequest from './mockRequest'

export const reqCategoryList = () => {
  // 发送请求 此处用的是 axios函数的方法发送Ajax请求。注意 axios 发送请求的结果是一个 Promise
  return request({url: '/product/getBaseCategoryList', method: 'get', params: {test: 'dhj'}});
  // 上述情况，只有一个返回语句可以采用简写形式，但是要在 {}外面加一个 () 否则会误认为{} 里面的是函数体
};

// 请求 bannerList 的api bannerList 是轮播图是数据  这次请求会被 mock 拦截
export const reqBnnerList = () => mockRequest({url: '/banner', method: 'get'});

export const reqFloorList = () => mockRequest({url: '/floor', method: 'get'});

// Search 模块 post请求, 请求的是search 模块需要展示的数据
export const reqGetSearchInfo = (params) => request({url: '/list', method: 'post', data: params});
// up:注意：这里的 data 是我们post 需要传递的参数，是一个对象，我们的 post 请求的参数放到 data 中.

// Detail 模块的 详情数据请求
export const reqGetDeatilInfo = (skuId) => request({url: `/item/${skuId}`, method: 'get'});

// 添加商品到购物车，或更新购物车中商品的数量 /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddUpdateGoods = (skuId, skuNum) => request({url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post'})

// 获取购物车模块的购物车列表 /api/cart/cartList get
export const reqShopCartList = () => request({url: '/cart/cartList', method: 'get'});

// 切换商品的选中状态的 api /api/cart/checkCart/{skuID}/{isChecked} get
export const reqUpdateChecked = (skuId, isChecked) => request({url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get'});

// 删除某个产品的 接口， /api/cart/deleteCart/{skuId}  delete
export const reqClearGoods = (skuId) => request({url: `/cart/deleteCart/${skuId}`, method: 'delete'});

// 点击获取验证码的api /api/user/passport/code get 无参数
export const reqVerifyCode = (phone) => request({url: `/user/passport/sendCode/${phone}`, method:'get'});

// 用户注册的接口 /api/user/passport/register post    data 携带参数
export const reqUserRegister = (data) => request({url: '/user/passport/register', data, method: 'post'});

// 用户登录的 接口 /api/user/passport/login post 用 data 传递参数
export const reqUserLogin = (data) => request({url:'/user/passport/login', data, method: 'post'});

// 拿着token 请求服务器用户的信息 /api/user/passport/auth/getUserInfo get
export const reqUserInfo = () => request({url:'/user/passport/auth/getUserInfo', method: 'get'});

// 退出登录的 接口 /api/user/passport/logout get 无参数
export const reqSignOut = () => request({url:'/user/passport/logout', method:'get'});

// 获取trade 页面的信息   /api/order/auth/trade get  没有参数
export const reqTradeInfo = () => request({url: '/order/auth/trade', method: 'get'});

// 获取用户地址的信息 /api/user/userAddress/auth/findUserAddressList get
export const reqUserAddress = () => request({url:'/user/userAddress/auth/findUserAddressList', method:'get'});

// 提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo} post 参数有两个 一个 query参数一个 在data 中携带 由于这里
// 采用了  mock 的假数据，就没有携带参数 ?tradeNo=${tradeNo}  如果下面有query参数就是没有采用mock 的数据
export const reqSubmitOrder = (tradeNo, data) => request({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method:'post'});

// 获取订单的支付信息  get 参数：订单号   由于这里也采用 mock 的假数据，就没有携带参数 ，原本的 url: `/payment/weixin/createNative/${orderId}`, 如果 url 为原本的url 则是没有采用 mock 的数据
export const reqGetPayOrder = (orderId) => request({url:`/payment/weixin/createNative/${orderId}`, method: 'get'});

// 获取我的订单列表 /api/order/auth/{page}/{limit}  get 
export const reqMyOrderList = (page, limit) => request({url: `/order/auth/${page}/${limit}`, method: 'get'});