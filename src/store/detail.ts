import { defineStore } from "pinia";
import { DetailInfo } from "@/models/detail";
import { reqGetDeatilInfo } from '@/api/index';

export const useDetailStore = defineStore('detail',{
  state: () => {
    return {
      detailInfo: {} as DetailInfo,    }
  },
  getters: {
    categoryView: state => state.detailInfo.categoryView || {},
    skuInfo: state => state.detailInfo.skuInfo || {}
  },
  actions: {
    async getDeatilInfo(skuId: number) {
      let result = await reqGetDeatilInfo(skuId);
      if (result.code == 200) {
        this.detailInfo = result.data;
      }
    },
  }
})