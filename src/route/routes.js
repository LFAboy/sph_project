import Home from '@/pages/home';
import Search from '@/pages/search';
import Login from '@/pages/login';
import Register from '@/pages/register';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/shopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';
import MyOrder from '@/pages/Center/myOrder';
import GroupOrder from '@/pages/Center/groupOrder';


export default [
  {
    path: '*',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/search/:keyword?',
    component: Search,
    name: 'search',
    props: true,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      isShowFooter: false
    }
  },
  {
    path: '/register',
    component: Register,
    meta: {
      isShowFooter: false
    }
  },
  {
    path: '/detail/:skuId',
    component: Detail,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/addcartsuccess/:skuNum',
    component: AddCartSuccess,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/shopcart',
    component: ShopCart,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/trade',
    component: Trade,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/pay',
    component: Pay,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/paysuccess',
    component: PaySuccess,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/center',
    component: Center,
    meta: {
      isShowFooter: true
    },
    children: [
      {
        path: 'myorder',
        component: MyOrder,
      },
      {
        path: 'grouporder',
        component: GroupOrder,
      },
      {
        path: '',
        redirect: '/center/myorder',
      }
    ]
  },
]