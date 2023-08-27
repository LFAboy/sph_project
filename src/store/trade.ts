import { defineStore } from "pinia";
import { reqAddressInfo, reqOrderInfo, reqSubmitOrder } from "@/api";
import { Address } from "@/models/user";
import { SubmitOrderQuery } from "@/models/shopCart";

export const useTradeStore = defineStore('trade', {
  state: () => {
    return {
      addressList: <Address[]>[],
      orderInfo: <{
        activityReduceAmount: number;
        couponInfoList: [];
        detailArrayList: [];
        orderDetailVoList: [];
        originalTotalAmount: number;
        totalAmount: number;
        totalNum: number;
        tradeNo: string;
        userAddressList: Address[];
      }>{},
      orderId: <number>0,
    }
  },
  actions: {
    async getUserAddress() {
      let result = await reqAddressInfo();
      if (result.code == 200) {
        this.addressList = result.data;
      } else {
        return Promise.reject(new Error('获取用户收货地址失败！'))
        // throw Error('获取收货地址失败！')
      }
    },
    async getOrderInfo() {
      let result = await reqOrderInfo();
      if (result.code === 200) {
        this.orderInfo = result.data
      } else {
        return Promise.reject(new Error('获取用户订单清单失败！'))
        // throw Error('获取用户订单清单失败！')
      }
    },
    async submitOrder(tradeNo: string, data: SubmitOrderQuery) {
      try {
        let result = await reqSubmitOrder(tradeNo, data);
        if (result.code == 200) {
          this.orderId = result.data;
          return Promise.resolve(result.code);
        }else {
          return Promise.reject(result.data);
        }
      } catch (error) {
        return Promise.reject(new Error('提交请求失败'));
      }
    }
  }
})