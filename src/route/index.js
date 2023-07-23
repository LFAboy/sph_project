import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// 引入我们的路由规则
import routes from '@/route/routes'
// import { getToken } from '@/utils/token';
import store from '@/store';
import { getToken } from '@/utils/token';

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写 VueRouter 原型对象上的 push 和 replace 方法。为什么要重写？因为如果我们重复向同一个路由跳转的时候，且参数一致，那么会报
// NavigationDupkicated的错误。解决方法；重写push 和replace 方法。
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    // 为什么使用 call 调用原来的push 方法？因为 我们把这个方法定义在了全局作用域，直接调用里面的this 是window
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => { }, () => { });
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(this, location, () => { }, () => { });
  }
}


let myRouter = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 这个配置项是 配置当我们发生路由跳转的时候，跳转后我们的滚动条的位置
    // 始终滚动到顶部
    return { y: 0 }
  },
});

// 配置全局路由守卫
myRouter.beforeEach(async (to, from, next) => {
  // 全局路由守卫接收一个回调，回调有三个参数，第三个可有可无
  let token = getToken();
  if (token) {
    // 根据是否有 token 判断是否登录

    // 如果登录了，就不能去登录和注册页面
    if (to.path == '/login' || to.path == '/register') {
      next('/')
    } else {
      if (!store.state.loginRegister.userInfo.name) {
        // 判断是否有用户的信息，有就放行，没有就请求用户信息，等返回后再跳转。
        try {
          await store.dispatch('getUserInfo');
          next();
        } catch (error) {
          // 这种清空是 有 token 但是拿着 token 获取 用户信息失败了, 一般是 token 失效了,需要重新登录
          await store.dispatch('signOut');
          next('/login');
        }
      } else {
        next();
      }
    }
  } else {
    if (to.path.includes('trade') || to.path.includes('pay')) {
      next('/');
    } else {
      next();
    }
  }
})

export default myRouter;