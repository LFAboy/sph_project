import { reqUserRegister, reqUserLogin, reqVerifyCode, reqUserInfo, reqSignOut} from "@/api";
import { getToken, setToken, removeToken} from '@/utils/token'

const state = {
  token: getToken(),
  code: '',
  userInfo: {},
};
const actions = {
  async getVerifyCode({commit},phone) {
    let result = await reqVerifyCode(phone);
    if (result.code == 200) {
      commit('GETVERIFYCODE', result.data);
      return Promise.resolve(result.code);
    }else {
      return Promise.reject(new Error('获取验证码失败'))
    }
  },
  async userRegister({commit}, data) {
    // 用户注册的回调
    let result = await reqUserRegister(data);
    if (result.code == 200) {
      return Promise.resolve(result.code);
    }else {
      return Promise.reject(new Error('改手机号已经存在'))
    }
  },
  async userLogin({commit}, data) {
    // 用户登录的actions
    let result = await reqUserLogin(data);
    if (result.code == 200) {
      // 如果用户登录成功，那么服务器会返回给用户一个token 我们要把 token 存一下。
      setToken(result.data.token);
      return Promise.resolve(result.code);
    }else {
      return Promise.reject(new Error('登录失败，请重试！'))
    }
  },
  async getUserInfo({commit}) {
    let result = await reqUserInfo();
    if (result.code == 200) {
      // console.log('result.data', result.data);
      commit('GETUSERINFO', result.data)
      return Promise.resolve(result.code)
    }else {
      return Promise.reject(new Error('获取用户信息失败！'))
    }
  },
  async signOut({commit}) {
    let result = await reqSignOut();
    if (result.code == 200) {
      removeToken();
      // 由于还要清除本地的用户数据，所以要改变数据
      commit('SIGNOUT')
      return Promise.resolve(result.code);
    }else {
      return Promise.reject(new Error('退出登录失败！'))
    }
  }
};

const mutations = {
  GETVERIFYCODE(state, code) {
    // 获取验证码的 mutations
    state.code = code
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  SIGNOUT(state) {
    // 清除本地用户数据的 Mutations
    state.userInfo = {};
    this.token = getToken();
  }
};
const getters = {
};

export default {
  state,
  actions,
  mutations,
  getters
}