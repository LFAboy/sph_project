import { defineStore } from "pinia";
import { reqPayInfo, reqPayStatus } from "@/api";

export const usePayStore = defineStore('pay', {
  state: () => {
    return {
      payInfo: {},
      payStatus: <boolean>false
    }
  },
  actions: {
    async getPayInfo(orderId:number) {
      try {
       let result = await reqPayInfo(orderId);
       if (result.code == 200) {
         this.payInfo = result.data
         return Promise.resolve(result.code);
       }else {
         // return Promise.reject(new Error("支付信息请求失败！"));
       } 
      } catch (error) {
        console.error(error);
      }
    },
    async getPayStatus(orderId:number) {
      try {
        let result = await reqPayStatus(orderId);
        if (result.code == 200) {
          this.payStatus = true;
          return Promise.resolve(result);
        }else {
          return Promise.reject(new Error("查询支付是否成功请求失败!"));
        } 
      } catch (error) {
        console.error(error);
      }
    }
  }
})