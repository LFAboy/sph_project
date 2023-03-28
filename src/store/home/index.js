import {reqCategoryList, reqGetBannerList, reqFloorList} from "@/api/index.js";
const state = {
    categoryList: [],
    // 轮播图的数组
    bannerList: [],
    floorList:[]
};
// action | 用户处理派发action 地方的，可以书写异步语法，书写逻辑的地方。
const actions = {
    // 通过 API 里面的接口函数调用，向服务器发送请求，获取服务器的数据
    async categoryList({commit}){
        let result = await reqCategoryList();
        //   调用 reqCategoryList() 这个方法会，返回我们请求的三级联动数据。
        if (result.code == 200){
            commit('CATEGORYLIST', result.data);
        }
    },
    async getBannerList({commit}){
        let  result = await reqGetBannerList();
        if(result.code == 200){
            commit('GETBANNERLIST', result.data)
        }
    },
    async getFloorList({commit}){
        let result = await reqFloorList();
        if(result.code == 200){
            commit('GETFLOORLIST', result.data)
        }
    }
};
// mutions 是唯一修改statec 的地方
const mutations = {
    CATEGORYLIST(state, categoryList){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList){
        state.floorList = floorList;
    }
};
const getters = {};

export default {
    state,
    actions,
    mutations,
    getters
}