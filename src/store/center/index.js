import {reqMyOrderList} from '@/api'

const state = {
  orderList: {}
};

const actions = {
  async getMyOrderList({commit}, {pageNo, limit}) {
    try {
      let result = await reqMyOrderList(pageNo, limit);
      // 当成功返回 订单数据后，保存一下数据，并动态展示到页面上。
      if (result.code == 200) {
        commit('GETORDERLIST', result.data)
      }else {
        alert('获取订单数据失败');
      }
    } catch (error) {
      alert('获取订单数据失败！')
    }
  },
};

const mutations = {
  GETORDERLIST(state, orderList) {
    state.orderList = orderList
  }
};

const getters = {
  total(state) {
    return state.orderList.total || 0;
  },
  pages(state) {
    return state.orderList.pages || 0;
  },
  recordList(state) {
    return state.orderList.records || [];
  }
};


export default {
  state,
  actions,
  mutations,
  getters
}