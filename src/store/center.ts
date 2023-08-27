import { defineStore } from "pinia";
import { reqMyorderList } from "@/api";
import { EntireOrder } from "@/models/center";

export const useCenterStore = defineStore('center', {
  state: () => {
    return {
      myOrder: <EntireOrder>{}
    }
  },
  actions:{
    async getMyOrderList(page: number, limit: number) {
      try {
        let result = await reqMyorderList(page, limit);
        if (result.code == 200) {
          this.myOrder = result.data
          return Promise.resolve(result);
        }else {
          return Promise.reject(new Error('请求个人订单失败'));
        } 
      } catch (error) {
        console.error(error);
      }
    }
  },
  getters: {
    myOrderList(state) {
      return state.myOrder.records
    }
  }
})