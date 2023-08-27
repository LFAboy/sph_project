import { defineStore } from "pinia";
import { getUUID } from '@/utils/uuid_token';
import { setToken, removeToken } from "@/utils/token";
import { reqUserRegister, reqUserLogin, reqLogout, reqUserInfo, reqRegisterCode} from '@/api/index';
import { RegisterQuery, LoginQuery } from "@/models/user";

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      uuid_token: getUUID(),
      userInfo: {
        name:'',
      },
      code: <string>'',
    }
  },
  actions: {
    async userRegister(user:RegisterQuery) {
      let result = await reqUserRegister(user);
      if (result.code == 200) {
        return Promise.resolve(result.code);
      }else {
        return Promise.reject(new Error('注册失败，请稍后重试！'));
      }
    },
    async userLogin(data: LoginQuery) {
      try {
        let result = await reqUserLogin(data);
        if (result.code == 200) {
          setToken(result.data.token);
          return Promise.resolve(result.code);
        }else {
          return Promise.reject(new Error('登录失败，请稍后重试！'));
        } 
      } catch (error: any) {
        alert(error.message);
      }
    },
    async getCode(phone: string) {
      let result = await reqRegisterCode(phone);
      if (result.code == 200) {
        this.code = result.data;
        return Promise.resolve(result.code);
      }else {
        return Promise.reject(new Error('获取验证码失败！'))
      }
    },
    async userLogout() {
      let result = await reqLogout();
      if (result.code == 200) {
        this.userInfo = {name: ''};
        removeToken();
        return Promise.resolve(result.code);
      }else {
        return Promise.reject(new Error('退出登录失败！'));
      }
    },
    async getUserInfo() {
      let result = await reqUserInfo();
      if (result.code == 200) {
        this.userInfo = result.data
        return Promise.resolve(result.code);
      }else {
        return Promise.reject(new Error('获取用户信息失败！'));
      }
    }
  }
});