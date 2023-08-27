import axiosInstance from '@/api/request'
import mockRequest from './mockRequest';

import { SearchParam } from '@/models/search'
import { RegisterQuery, LoginQuery } from '@/models/user';
import { SubmitOrderQuery } from '@/models/shopCart';

// 请求三级联动选项卡的数据 的 api
export const reqCategoryList = () => {
  return axiosInstance({url: '/product/getBaseCategoryList', method: 'get'})
};

// 请求 bannerList 的 api ,bannerList 是轮播图的数据，这次请求会被mock 拦截
export const reqBnnerList = () => mockRequest({url: '/bannerList', method: 'get'})

// 请求 floor 组件的数据，会被mock拦截
export const reqFloorList = () => mockRequest({url: '/floorList', method: 'get'});

// search 模块请求api 请求的是 该模块需要展示的数据
export const reqGetSearchInfo = (params:SearchParam) => axiosInstance({url: '/list', method: 'post', data: params})

// Detail 模块的数据请求
export const reqGetDeatilInfo = (skuId:number) => axiosInstance({url: `/item/${skuId}`, method: 'get'})

// 添加商品到购物车，或更新购物车中商品的数量 /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddUpdateGoods = (skuId: number, skuNum: number) => axiosInstance({url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post'})

// 获取购物车模块的购物车列表 /api/cart/cartList get
export const reqShopCartList = () => axiosInstance({url: '/cart/cartList', method: 'get'})

// 切换购物车中商品的选中状态的接口 /api/cart/checkCart/{skuId}/{isChecked} get
export const reqUpdateChecked = (skuId: number, isChecked:number) => axiosInstance({url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get'});

// 删除购物车中某个商品的接口 /api/cart/deleteCart/{skuId}  delete
export const reqDeleteGoods = (skuId: number) => axiosInstance({url: `/cart/deleteCart/${skuId}`, method: 'delete'})

// 获取用户收获地址的信息 /api/user/userAddress/auth/findUserAddressList get
export const reqAddressInfo = () => axiosInstance({url: '/user/userAddress/auth/findUserAddressList', method: 'get'})

// 获取用户订单清单的数据  /api/order/auth/trade   get
export const reqOrderInfo = () => axiosInstance({url: '/order/auth/trade', method: 'get'})

// 用户注册的接口   /api/user/passport/register post
export const reqUserRegister = (data: RegisterQuery) => axiosInstance({url: '/user/passport/register', method: 'post', data});

// 用户登录的接口 /api/user/passport/login  post
export const reqUserLogin = (data: LoginQuery) => axiosInstance({url: '/user/passport/login', method: 'post', data})

// 获取用户的信息，需要携带用户的 token  接口 /api/user/passport/auth/getUserInfo  get
export const reqUserInfo = () => axiosInstance({url: 'user/passport/auth/getUserInfo', method: 'get'})

// 退出登录的接口  /api/user/passport/logout  get
export const reqLogout = () => axiosInstance({url: '/user/passport/logout', method: 'get'})

// 获取验证码 这个验证码是用户注册时候需要的验证码  /api/user/passport/sendCode/{phone}  get
export const reqRegisterCode = (phone: string) => axiosInstance({url: `/user/passport/sendCode/${phone}`, method: 'get'});

// 提交订单的接口，告诉服务器，订单的相关信息 /api/order/auth/submitOrder?tradeNo={tradeNo}   post 还有订单的具体信息参数 data
export const reqSubmitOrder = (tradeNo:string, data:SubmitOrderQuery) => axiosInstance({url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data});

// 获取订单的支付信息   /api/payment/weixin/createNative/{orderId}  get
export const reqPayInfo = (orderId: number) => axiosInstance({url: `/payment/weixin/createNative/${orderId}`, method: 'get'});

// 查询用户是否支付成功 /api/payment/weixin/queryPayStatus/{orderId}    get
export const reqPayStatus = (orderId: number) => axiosInstance({url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get'});

//  获取个人中心中，myOrder 的数据接口 /api/order/auth/{page}/{limit}  get
export const reqMyorderList = (page:number, limit: number) => axiosInstance({url: `/order/auth/${page}/${limit}`, method: 'get'})