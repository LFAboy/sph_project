import Vue from "vue";
import VueRouter from "vue-router"
// 引入仓库
import store from "@/store";

// 引入路由的具体配置文件
import routes from "./routes";

Vue.use(VueRouter)

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function(location, resolve, reject) {
    if(resolve && reject){
        originPush.call(this, location, resolve, reject)
    }else{
        originPush.call(this, location, ()=>{}, ()=>{})
    }
}
VueRouter.prototype.replace = function(location, resolve, reject){
    if(resolve && reject){
        originReplace.call(this, location, resolve, reject);
    }else{
        originReplace.call(this, location,()=>{}, ()=>{});
    }
}
let router = new VueRouter({
    routes,
    // key value 一致省略 value
    scrollBehavior () {
        // return 期望滚动到哪个的位置
        return {y:0}
      }
})

//配置路由全局守卫（全局前置守卫）
router.beforeEach(async (to, from, next)=>{
    // to  可以获取到 你要跳转到哪个路由的信息
    // from 可以获取到你从哪个路由而来的信息
    // next 放行函数，next()直接放行， next(path)放行到指定路由, next(false)路由跳转失败，返回原来的路由
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name   // 由于空对象判断为 真，所以我们用对象的属性判断
    if(token){
        // 对于已经登录的情况，就不能再登录了。
        // console.log('已经有token 了');
        if(to.path == '/login' || to.path == '/register'){
            next('/')
        }else{
            //  登录且去的不是 Login 组件
            // 如果名字已经有
            if(name){
                next();
            }else{
                // 没有用户信息，派发 action 让仓库存储用户信息后，再跳转
                try {
                    // 获取用户信息成功
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    // token 失效了，获取不到用户信息，从新登录
                    // 调用退出登录的action 是为了清除token
                    await store.dispatch('userLogout');
                    next('/login');
                }
            }
        }
    }else{
        // 未登录 不能去交易相关的 和支付相关的
        let toPath = to.path;
        if(toPath.indexOf('/trade')!= -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1){
            // 我们未登录时想去而没有去成功的信息存储在路由中，当我们登录成功后立即跳转
            next('/login?redirect=' + toPath);
        }else{
            next()
        }
    }
    // console.log('路由守卫执行了');
})


export default router