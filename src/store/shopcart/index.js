import { reqShopCartList, reqUpdateChecked, reqClearGoods } from '@/api/index'

const state = {
  shopCartList: [],
};

const actions = {
  async getShopCartList({commit}) {
    // 获取购物车中商品列表的 actions
    let result = await reqShopCartList();
    if (result.code === 200) {
      commit('GETSHOPCARTLIST', result.data);
    }
  },
  async updateChecked({commit}, {skuId, isChecked}) {
    // 切换商品选中状态的 actions
    let result = await reqUpdateChecked(skuId, isChecked);

    if (result.code == 200) {
      return Promise.resolve(result.code)
    }else {
      return Promise.reject(new Error('选中状态更新失败！'))
    }
  },
  async clearGoods({commit}, skuId) {
    // 删除某个 商品的 actions
    let result = await reqClearGoods(skuId);
    if (result.code == 200) {
      return Promise.resolve(result.code);
    }else {
      return Promise.reject(new Error('删除失败！'))
    }
  },
  changeAllChecked({dispatch, getters}, isChecked) {
    // 改变全部商品选中状态的 actions
    let promiseArr = [];
    getters.cartInfoList.forEach(element => {
      let promiseOne = dispatch('updateChecked', {'skuId': element.skuId, isChecked});
      promiseArr.push(promiseOne);
    });
    // Promise.all(promiseArr).then(resolve => {return 'ok'}).catch(err => {
    //   return Promise.reject('更新失败')
    // })
    return Promise.all(promiseArr);
    // return 'a'; 这个不行，因为前面的 promise 还没有兑现，调用 dispatch函数返回的promise 就被 a 兑现了
  }
};

const mutations = {
  GETSHOPCARTLIST(state, shopCartList) {
    state.shopCartList = shopCartList;
  },
};

const getters = {
  cartInfoList(state) {
    let cartInfoObj =  state.shopCartList[0] || {}
    return cartInfoObj.cartInfoList || [];
  }
};

export default {
  state,
  actions,
  mutations,
  getters
}