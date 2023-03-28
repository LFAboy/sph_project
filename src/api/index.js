// 当前的这个模块，所有的API 接口在这里进行统一管理。
import requests from "./request";
import mockRequests from './mockAjax';

// 三级联动的接口
// 请求地址：/api/product/getBaseCategoryList 是get 请求，无参数

export const reqCategoryList = ()=>{
    return requests({url:'/product/getBaseCategoryList', method:'get'})
}

// 获取banner  （home 首页轮播图接口）
export const reqGetBannerList = ()=> mockRequests.get('/banner');

// 获取 floor 组件的 mock 数据
export const reqFloorList = () => mockRequests.get('/floor');

// 获取 search 模块的数据  请求地址： /api/list 请求方式 post 参数: 需要带参数
export const reqGetSearchInfo = (params) => requests({
    url:'/list',
    method: 'post',
    // 用 data 存放请求的参数，这个参数至少是一个空对象。
    data: params
})


// 获取产品详情信息的接口
export const reqGoodsInfo = (skuid) => requests({url:`/item/${skuid}`, method:'get'})

// 把产品加入购物车，提交给服务器的接口 地址，/api/cart/addToCart/{ skuId }/{ skuNum } 请求方法 post
export const reqAddOrUpdateShopCart = (skuid, skuNum) => requests({url:`/cart/addToCart/${skuid}/${skuNum}`, method:'post',})


// 获取购物车数据    请求地址 /api/cart/cartList  请求方法 get
export const reqCartList = () => requests({url:'/cart/cartList', method:'get'})

// 删除购物产品的接口
export const reqDeleteCartById = (skuId) => requests({url:`/cart/deleteCart/${skuId}`, method:'delete'})

// 修改商品选中状态的接口
export const reqUpdateCheckedById = (skuId, isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`, method:'get'});

// 获取验证码的接口 地址 /api/user/passport/sendCode/{phone} 请求方法 get
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`, method:'get'})

// 注册的接口 地址 /api/user/passport/register post
export const reqUserRegister = (data) => requests({url:'/user/passport/register', method:'post', data})
// 注意 data  也可以带参数，此处是 key v 一致省略写法


// 登录的接口 /api/user/passport/login post
export const reqUserLogin = (data) => requests({url:'/user/passport/login', method:'post', data})

// 获取用户的信息 需要带着用户的token 地址 /user/passport/auth/getUserInfo
export const reqUserInfo = () => requests({url:'/user/passport/auth/getUserInfo', method:'get'})

// 退出登录的接口 /api/user/passport/logout get 
export const reqLogout = () => requests({url:'/user/passport/logout', method:'get'})

// 获取用户地址信息接口 地址 /api/user/userAddress/auth/findUserAddressList get
export const reqAddressInfo = () => requests({url:'/user/userAddress/auth/findUserAddressList', method:'get'})

// 获取订单清单 地址 /api/order/auth/trade get 
export const reqOrderInfo = ()=> requests({url:'/order/auth/trade', method:"get"})

// 提交订单的接口，告诉服务器 订单的相关信息 /api/order/auth/submitOrder?tradeNo={tradeNo} post 还有订单的具体信息作为参数data
export const reqSubmitOrder = (tradeNo, data) => requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method:'post'})

// 获取订单的支付信息接口 /api/payment/weixin/createNative/{orderId} get 
export const reqPayInfo = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`, method:'get'})

// 获取支付结果状态
export const reqPayStatus = (orderId) => requests({url:`/payment/weixin/queryPayStatus/${orderId}`, method:'get'})

// 获取个人中心，我的订单的数据接口 /api/order/auth/{page}/{limit} get
export const reqMyorderList = (page, limit) => requests({url:`/order/auth/${page}/${limit}`, method:'get'})