import { createRouter, createWebHashHistory } from "vue-router";
import Home from '@/views/home/index.vue'
import { useUserStore } from "@/store/user";
import { getToken } from "@/utils/token";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      name: 'home',
      path: '/home',
      component: Home,
    },
    {
      name: 'login',
      path: '/login',
      component: () => import("@/views/login/Login.vue"),
      meta: {
        isShowFooter: false
      }
    },
    {
      name: 'register',
      path: '/register',
      component: () => import("@/views/register/Register.vue"),
      meta: {
        isShowFooter: false
      }
    },
    {
      name: 'search',
      path: '/search/:keyword?',
      component: () => import("@/views/search/index.vue"),
    },
    {
      name: 'detail',
      path: '/detail/:skuId',
      component: () => import("@/views/detail/index.vue"),
    },
    {
      name: 'addcartsuccess',
      path: '/addcartsuccess/:skuNum',
      component: () => import("@/views/add-cart-success/AddCartSuccess.vue"),
    },
    {
      name: 'shopcart',
      path: '/shopcart',
      component: () => import("@/views/shop-cart/ShopCart.vue"),
    },
    {
      name: 'trade',
      path: '/trade',
      component: () => import("@/views/trade/Trade.vue"),
    },
    {
      name: 'pay',
      path: '/pay',
      component: () => import("@/views/pay/Pay.vue"),
      beforeEnter: (to, from) => {
        
        if (from.name == 'trade' || from.name == 'pay' || from.fullPath == '/') {
          return true;
        }else {
          return false;
        };
      }
    },
    {
      name: 'paysuccess',
      path: '/paysuccess',
      component: () => import("@/views/pay-success/PaySuccess.vue"),
      beforeEnter: (to, from) => {
        if (from.name == 'pay' || from.name == 'paysuccess' || from.fullPath == '/') return true;
        else return false;
      }
    },
    {
      name: 'center',
      path: '/center',
      component: () => import('@/views/center/Center.vue'),
      children: [
        {
          name: 'myorder',
          path: '/center/myorder',
          // 子级路由可以写相对路径，只需要写 myorder 即可，不要/
          component: () => import('@/views/center/MyOrder.vue'),
        },
        {
          name: 'grouporder',
          path: 'grouporder',
          component: () => import('@/views/center/GroupOrder.vue'),
        },
        {
          path: '/center',
          redirect: '/center/myorder'
        }
      ]
    }
  ]
})
const userStore = useUserStore();

// 配置路由全局守卫
router.beforeEach(async (to, from) => {
  let token = getToken();
  let name = userStore.userInfo.name
  if (token) {
    // 如果有token（登录）
    if (to.name == 'login' || to.name == 'register') {
      return false;
    }else {
      if (name) { // 已经有用户信息了，就直接放行，没有则发送请求获取用户信息
        return true;
      }else {
        try {
          await userStore.getUserInfo();          
          return true;
        } catch (error) {
          await userStore.userLogout();
          return {name: 'login'};
        }
      }
    }
  }else {
    // 没有 token(没登录) 不能取结算页面，支付相关页面，个人中心
    if (to.name == 'trade' || to.fullPath.indexOf('center') !== -1) {
      if (to.name == 'login') return true;
      return {
        name: 'login',
        query: {
          redirect: to.path,
        }
      }
    }else {
      return true;
    }
  }
})

export default router;
