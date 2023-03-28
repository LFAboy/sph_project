import {reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout} from '@/api'
import { getToken, removeToken, setToken } from '@/utils/token'
const state = {
    code:'',
    token:getToken(),
    userInfo: {}
}

const actions = {
    // 获取验证码
    async getCode({commit}, phone){
        let result = await reqGetCode(phone)
        if(result.code == 200){
            commit('GETCODE', result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('获取验证码失败'))
        }
    },
    // 用户注册
    // eslint-disable-next-line no-unused-vars
    async userRegister({commit}, user){
        let result = await reqUserRegister(user)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('注册失败'))
        }
    },

    // 用户登录
    async userLogin({commit}, data){
        let result = await reqUserLogin(data)
        if(result.code == 200){
            commit('USERLOGIN', result.data.token)
            setToken(result.data.token);
            return 'ok'
        }else{
            return Promise.reject(new Error('登录失败'))
        }
    },

    // 获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo()
        if(result.code == 200){
            commit('GETUSERINFO', result.data)
        }
    },

    // 退出登录
    async userLogout({commit}){
        let result = await reqLogout()
        if(result.code == 200){
            commit('CLEAR') // action 里面不能操作数据，需要在 mutation 里面修改
            return 'ok'
        }else{
            return Promise.reject(new Error("退出登录失败"))
        }
    }
}

const mutations = {
    GETCODE(state, code){
        state.code = code
    },
    USERLOGIN(state, token){
        state.token = token
    },
    GETUSERINFO(state, userInfo){
        state.userInfo = userInfo
    },
    CLEAR(state){
        state.token = '';
        state.userInfo = {};
        removeToken()
    }
}

const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}