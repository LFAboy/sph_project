import {reqGetSearchInfo} from '@/api';
// search 模块的仓库
const state = {
    searchList:{}
};
const actions = {
    // 获取 search 模块的数据
    async getSearchList({commit}, params={}){
        // 这个 action 函数，调用至少传递一个参数：空对象
        // params 形参，是当我们触发 acrion 时传递的第二个参数，如果没有就默认是一个空对象
        let result = await reqGetSearchInfo(params);
        if(result.code == 200){
            commit('GETSEARCHLIST', result.data)
        }
    }
};
const mutations = {
    GETSEARCHLIST(state, searchList){
        state.searchList = searchList
    }
};
// getters 是为了简化把仓库中的数据映射到 组件上而生
//  我们可以把将来在组件当中需要用的数据简化一下，将来组件获取数据的时候就方便了。
const getters = {
    goodsList(state){
        // 当前 的形参， state 是当前仓库中的 state 并不是大仓库中的 state  不包括home 中的数据
       return state.searchList.goodsList || [];
       // 这么写 ，state 有两种情况，1 服务器的数据还没有回来，是一个空对象，2服务器的数据已经返回了，当第一种情况时有bug
       // 如果服务器没有返回数据，则返回一个空数组
    },
    trademarkList(state){
        return state.searchList.trademarkList || [];
    },
    attrsList(state){
        return state.searchList.attrsList || [];
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}