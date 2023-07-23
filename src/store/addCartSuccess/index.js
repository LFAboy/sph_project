import { reqAddUpdateGoods } from '@/api/index'

const state = {};

const actions = {
  async addUpdateGoods({commit}, {skuId, skuNum}) {
    let result = await reqAddUpdateGoods(skuId, skuNum);

    if (result.code === 200) {
      return Promise.resolve(result.code)
    }else {
      return Promise.reject(new Error('faile'));
    }
  },
};

const mutations = {};

const getters = {};

export default {
  state,
  actions,
  mutations,
  getters
}