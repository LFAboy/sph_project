import { defineStore } from "pinia";
import { SearchInfo, SearchParam } from "@/models/search";
import { reqGetSearchInfo } from "@/api";

export const useSearchStore = defineStore('search', {
  state: () => {
    return {
      searchInfo: {} as SearchInfo,
    }
  },
  getters: {
    goodsList:state => state.searchInfo.goodsList || [],
    attrsList: state => state.searchInfo.attrsList || [],
    trademarkList: state => state.searchInfo.trademarkList || [],
  },
  actions: {
    async getSearchInfo(searchParams: SearchParam) {
      let result = await reqGetSearchInfo(searchParams);

      if (result.code === 200) {
        this.searchInfo = result.data;
      }
    }
  }
});