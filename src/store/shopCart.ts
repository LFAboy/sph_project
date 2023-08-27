import { defineStore } from "pinia";
import { reqShopCartList, reqUpdateChecked, reqAddUpdateGoods, reqDeleteGoods } from '@/api/index'
import { ShopCart } from "@/models/shopCart";

export const useShopCartStore = defineStore('shopCart', {
  state: () => {
    return {
      shopCartList: <ShopCart []>[],
    }
  },
  actions: {
    async getShopCartList() {
      let result = await reqShopCartList();
      if (result.code === 200) {
        this.shopCartList = result.data;
      }
    },
    async updateChecked(skuId:number, isChecked: number) {
      let result = await reqUpdateChecked(skuId, isChecked);
      if (result.code === 200) {
        return Promise.resolve(result.code);
      }else {
        return Promise.reject(new Error('选中状态更新失败！'));
      }
    },
    async addUpdateGoods(skuId:number, skuNum:number) {
      let result = await reqAddUpdateGoods(skuId, skuNum);
      if (result.code === 200) {
        Promise.resolve(result.code);
      }else {
        Promise.reject(new Error('加入购物车或更新购物车失败'));
      }
    },
    async deleteGoods(skuId: number) {
      let result = await reqDeleteGoods(skuId);
      if (result.code == 200) {
        return Promise.resolve(result.code);
      }else {
        return Promise.reject(new Error('删除失败！'));
      }
    },
  },
})