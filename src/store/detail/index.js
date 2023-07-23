// 本模块是 detail 模块的 小仓库。// 大仓库采用模块化
import {reqGetDeatilInfo} from '@/api/index'
import { getUuid } from '@/utils/uuid_token'
// up: 引入我们获取uuid 封装的方法

const state = {
  detailInfo: {},
  uuid: getUuid(),  // 获取用户的uuid
};

const actions = {
  async getDetail({commit}, skuId) {
    let result = await reqGetDeatilInfo(skuId);

    if (result.code === 200) {
      commit('GETDETAIL', result.data)
    }else {
      console.warn('Deatil request faile');
    }
  }
};

const mutations = {
  GETDETAIL(state, detailInfo) {
    state.detailInfo = detailInfo;
  }
};

const getters = {
  categoryView(state) {
    return state.detailInfo.categoryView || {};
  },
  skuInfo(state) {
    return state.detailInfo.skuInfo || {};
  },
  spuSaleAttrList(state) {
    return state.detailInfo.spuSaleAttrList || [];
  }
};

export default {
  state,
  actions,
  mutations,
  getters
}