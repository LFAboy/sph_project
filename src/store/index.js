import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);// 由于 Vuex 是一个插件，所以我们要引入并使用一下。

// 引入Vuex 之后，就有了Vuex 对象，这个对象上有一个 Store 方法，这个方法可以创建一个 仓库实例。在创建仓库的时候传入一个配置对象。

import home from './home';
import search from './search';
import detail from './detail';
import addCartSuccess from './addCartSuccess';
import shopCart from './shopcart';
import loginRegister from './loginRegister';
import trade from './trade';
import center from './center';

export default new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    addCartSuccess,
    shopCart,
    loginRegister,
    trade,
    center
  }
})