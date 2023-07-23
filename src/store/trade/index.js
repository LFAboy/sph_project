import {reqTradeInfo, reqUserAddress, reqSubmitOrder} from '@/api'

const state = {
  tradeData: {},
  userAddress: [],
  orderId: '',
};

const actions = {
  async getTradeInfo({commit}) {
    // 获取trade  页面信息的 actions
    let result = await reqTradeInfo();
    if (result.code == 200) {
      commit('GETTRADEINFO', result.data);
    }
  },
  async getUserAddress({commit}) {
    // 获取 收件人信息的 actions
    let result = await reqUserAddress();
    if (result.code == 200) {
      commit('GETUSERADDRESS', result.data);
    }
  },
  async submitOrder({state, commit}, data) {
    // 提交订单的 actions
    console.log(typeof state.tradeData.tradeNo);
    console.log('tradeNo', state.tradeData.tradeNo);
    console.log('data', data);
    let result = await reqSubmitOrder(state.tradeData.tradeNo, data);
    if (result.code == 200) {
      commit('SUBMITORDER', result.data);
      return Promise.resolve(result.code);
    }else {
      console.log('订单提交失败！');
      return Promise.reject(new Error('提交订单失败'));
    }
  }
};

const mutations = {
  GETTRADEINFO(state, tradeData) {
    state.tradeData = tradeData
  },
  GETUSERADDRESS(state, userAddress) {
    state.userAddress = userAddress;
  },
  SUBMITORDER(state, orderId) {
    state.orderId = orderId
  }
};

const getters = {
  detailArrayList(state) {
    return state.tradeData.detailArrayList || [];
  }
};


export default {
  state,
  actions,
  mutations,
  getters
}