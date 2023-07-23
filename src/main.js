import Vue from 'vue'
import App from './App.vue'

// 引入我们创建好的路由对象
import router from './route'

// 引入我们创建的Vuex 仓库
import store from '@/store'

// 让 mock 相关文件执行一下 其实也就是让 mockServer.js 文件执行一下.
import '@/mock/mockServer';

// 引入我们的所有的 API 接口，如果没有 Vuex 那么我们就引入全部的接口挂载在Vue的原型上，有利于接口的统一管理。
import * as API from '@/api';

// 引入我们的图片懒加载的插件 vue-lazyload  // 注意我们使用的图片也要引入到main.js
import VueLazyload from 'vue-lazyload';
import seven from '@/assets/s.png';
Vue.use(VueLazyload, {
  loading: seven
})

// 按需引入我们的 element UI 组件库
import { Button, MessageBox } from 'element-ui';
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入我们的 swiper 样式，引包我们已经在 用到的文件引入了，由于多个组件都要yong swiper, 所以我们把样式在这里引入一次就好了
import 'swiper/css/swiper.css'
// 全局注册一些全局组件; 全局注册的方法，用 Vue构造函数的component 方法，该方法接收两个参数，第一个参数是这个全局组件的注册命名，第二个参数就是这个组件
import TypeNav from '@/components/type-nav';
import Pagination from '@/components/pagination';
import Carousel from '@/components/carousel';
Vue.component(TypeNav.name, TypeNav);
Vue.component(Pagination.name, Pagination);
Vue.component(Carousel.name, Carousel);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
    // 这里的原理和 $bus 一样。
  },
  router,
  // 注册仓库，当注册仓库后，组件实例对象上就多了一个 $store 属性
  store
}).$mount('#app')
