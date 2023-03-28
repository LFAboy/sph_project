import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入三级联动这个全局组件
import TypeNav from '@/components/type-nav/TypeNav.vue'
import CarouselIndex from '@/components/carousel/CarouselIndex.vue'
import PaginationIndex from '@/components/pagination/PaginationIndex.vue'
// 引入vuex 数据管理仓库 store
import store from './store';
// 引入mock 模拟数据
import '@/mock/mockServer';
// 引入 swiper 的样式
import 'swiper/css/swiper.css';
import { Button, MessageBox} from 'element-ui';
// 全局注册组件这个函数，第一个参数是注册的名字，第二个参数是这个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(CarouselIndex.name, CarouselIndex);
Vue.component(PaginationIndex.name, PaginationIndex);
Vue.component(Button.name, Button)
Vue.config.productionTip = false

// elementUI 注册组件
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入所以有的api 接口，并放在 Vue 的原型对象上
import * as API from '@/api';

// 引入图片懒加载的插件
import VueLazyload from 'vue-lazyload'
import ck from '@/assets/567.gif'
Vue.use(VueLazyload, {
  // 懒加载默认的图片
  loading: ck,  
})

// 引入自定义插件 功能是把小写字母变成大写，此处练习自定义插件的使用
import Upper from '@/plugins/myPlugins'
Vue.use(Upper, {
  name: 'upper'
})

// 引入我们表单验证的插件
import '@/plugins/validate'

new Vue({
  render: h => h(App),
  // 全局事件总线 $bus 配置
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  router,
  store
}).$mount('#app')