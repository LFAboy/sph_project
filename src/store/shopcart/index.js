import {reqCartList, reqDeleteCartById, reqUpdateCheckedById} from '@/api';

const state = {
    cartList:[]
}
const actions = {
    // 获取 购物车列表数据
    async getCartList({commit}){
        let result = await reqCartList()
        if(result.code == 200){
            commit('GETCARTLIST', result.data)
        }  
    },
    // 删除购物车 某一个产品的action 
    // eslint-disable-next-line no-unused-vars

    // eslint-disable-next-line no-unused-vars
    async deleteCateListBySkuId({commit},skuId){
        let result = await reqDeleteCartById(skuId)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('删除失败'))
        }
    },
    // 修改某一产品的选中状态的action 
    // eslint-disable-next-line no-unused-vars
    async updateCheckedById({commit},{skuId, isChecked}){
        let result = await reqUpdateCheckedById(skuId, isChecked)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('选中状态修改失败'))
        }
    },
    // 删除选中的全部商品
    deleteAllCheckedCart({dispatch, getters}){
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item=> {
            if(item.isChecked == 1){
               let promise = dispatch('deleteCateListBySkuId', item.skuId)
               PromiseAll.push(promise)
            }
            // let promise = item.isChecked ==1 ? dispatch('deleteCateListBySkuId', item.id):''
            
        })
        return Promise.all(PromiseAll);
    },

    // 修改全部产品的选中状态
    updateAllCartIsChecked({dispatch, state}, isChecked){
        let PromiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById', {skuId:item.skuId, isChecked})
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }
}
const mutations = {
    GETCARTLIST(state, cartList){
        state.cartList = cartList
    }
}
const getters = {
    cartList(state){
        return state.cartList[0] || {}
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}