import {reqGoodsInfo, reqAddOrUpdateShopCart} from '@/api'
// 引入UUID创建的id
import {getUUID} from '@/utils/uuid_token'

const state = {
    goodsInfo:{},
    uuid_token: getUUID()
}
const actions = {
    // 获取产品信息的 action
    async getGoodsInfo({commit}, skuid){
        let result = await reqGoodsInfo(skuid)
        if(result.code == 200){
            commit('GETGOODSINFO', result.data)
        }
    },
    // 加入购物车或者修改一个商品的数量的 action 
    // eslint-disable-next-line no-unused-vars
    async addOrUpdateShopCart({commit},{skuId, skuNum}){

        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'));
        }
    }
}
const mutations = {
    GETGOODSINFO(state, goodsInfo){
        state.goodsInfo = goodsInfo;
    },
}
const getters = {
    categoryView(state){
        return state.goodsInfo.categoryView || {}
        // 如果goodsInfo 服务器还没有返回则返回一个空对象
    },
    skuInfo(state){
        return state.goodsInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList || []
    }
}


export default {
    state,
    actions,
    mutations,
    getters
}