import Vue from 'vue'
import Vuex from 'vuex'

import home from './home'
import search from './search'
import login from './login'
import register from './register'
import detail from './detail'
import shopcart from './shopcart';
import user from './user';
import trade from './trade'

Vue.use(Vuex);
// 我们引入的 Vuex 是一个 对象，这个对象上有很多的方法

export default new Vuex.Store({
    modules:{
        home,
        search,
        login,
        register,
        detail,
        shopcart,
        user,
        trade
    }
})