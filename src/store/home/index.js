// 引入我们请求 三级联动数据的接口
import { reqCategoryList, reqBnnerList, reqFloorList } from "@/api";

const state = {
  categoryList: [],   // categoryList 用于存放我们三级联动请求后的数据
  bannerList: [], // 存储 轮播图的数据
  floorList:  [], // 存储的是 家用电器请求回来的数据
};
const actions = {
  // 这个 actions 是用来请求 三级联动的数据的，注意 reqCategoryList 接口请求返回的结果是一个 promise
  async categoryList(context) {
    let result = await reqCategoryList();
    // console.log(result);
    // 使用 async 和 awaitt 是因为我们 reqCategoryList 请求的结果是一个promise
    // 只有当 promise 被兑现后我们才可以执行接下来的业务。
    if (result.code === 200) {
      context.commit('CATEGORYLIST', result.data);
      //up: 上述代码 只使用了 context 上的 commit 方法，为了性能考虑，可以只从 context 上把 commit 结构出来
    }
  },
  // 这个 actions 是用来请求 home 模块 的轮播图的数据的
  async getBnnerList({commit}) {
    let result = await reqBnnerList();
    if (result.code === 200) {
      commit('GETBANNERLIST', result.data)
    }
  },
  async getFloorList({commit}) {
    let result = await reqFloorList();
    if (result.code === 200) {
      commit('GETFLOORLIST', result.data);
    }
  }
};
const mutations = {
  CATEGORYLIST(state, categoryList) {
    // console.log('mutations 中的 categoryList');
    // console.log(categoryList);
    state.categoryList = categoryList;
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  }
};
const getters = {};

export default {
  state,
  actions,
  mutations,
  getters
}