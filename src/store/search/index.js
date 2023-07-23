import { reqGetSearchInfo } from "@/api";

const state = {
  searchList: {},
};
const actions = {
  async getSearchList({commit}, params = {}) {
    let result = await reqGetSearchInfo(params);
    if (result.code === 200) {
      commit('GETSEARCHLIST', result.data);
    }
  }
};
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  }
};
const getters = {
  goodsList(state) {
    // getter 可以认为 是 store 的计算属性，接收本模块的 state 做为参数，我们可以拿到 state 中的数据。
    // getter 存在的意义就是为了简化数据而生，在数据过于庞大的情况下，我们在组件中拿数据，需要写很多层非常的不方便，所以我们用getter 过滤一下，方便在组件中拿到数据.
    return state.searchList.goodsList || [];
    // up: 为什么要加 || [] ? 因为如果请求的数据还没有拿到，那么searchList 就是空对象，.goodsList 是undefined，而我们的 goodsList 至少是一个空数组。
  },
  attrsList(state) {
    return state.searchList.attrsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList || [];
  }
};

export default {
  state,
  actions,
  mutations,
  getters
}