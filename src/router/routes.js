// 该文件是路由组件的的注册文件，只包含路由配置信息

// 引入一级路由组件
// 使用路由懒加载 ，引入 home 等模块
const Home = ()=> import('@/pages/home/SphHome');
import Register from "@/pages/Register"
import Detail from "@/pages/Detail/SphDetail"

// 引入二级路由组件
import MyOrder from "@/pages/Center/myorder"
import GroupOrder from "@/pages/Center/grouporder"

// 路由的配置信息
export default [
    {
        path:'/home',
        component: Home,
        meta:{isShowFooter:true}
    },
    {
        path:'/search/:keyword?',
        component: ()=> import("@/pages/search/SphSearch"),
        meta:{isShowFooter:true},
        name:'search',
        props:true
    },
    {
        path:'/login',
        component: ()=> import("@/pages/Login"),
        meta:{isShowFooter:false}
    },
    {
        path:'/register',
        component: Register,
        meta:{isShowFooter:false}
    },
    {
        path:'*',
        redirect:'/home'
    },
    {
        path:'/detail/:skuid',
        // 传递 params 参数需要占位
        component: Detail,
        meta:{isShowFooter:true}
    },
    {
        path:'/addcartsuccess',
        name:'addcartsuccess',
        component: ()=> import('@/pages/AddCartSuccess'),
        meta:{isShowFooter:true}
    },
    {
        path:'/shopcart',
        name:'shopcart',
        component: ()=> import('@/pages/ShopCart'),
        meta:{isShowFooter:true}
    },
    {
        path:'/trade',
        name:'trade',
        component: ()=> import("@/pages/Trade"),
        meta:{isShowFooter:true},
        beforeEnter: (to, from, next) => {
            // 想去交易页面，必须从 购物车页面来   这里是路由的独享守卫配置
            if(from.path == '/shopcart'){
                next()
            }else{
                next(false)// 重定向到from 的地址
            }
        }
    },
    {
        path:'/pay',
        name:'pay',
        component: ()=> import('@/pages/Pay'),
        meta:{isShowFooter:true},
        beforeEnter:(to, from, next) => {
            // 如果想去支付页面，必须从，交易页面来   这里是路由的独享守卫配置
            if(from.path == '/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:'/paysuccess',
        name:'paysuccess',
        component: ()=> import('@/pages/PaySuccess'),
        meta:{isShowFooter:true}
    },
    {
        path:'/center',
        component: ()=> import('@/pages/Center'),
        meta:{isShowFooter:true},
        // redirect:'/center/myorder',
        children:[
            {
                path:'/center/myorder',
                // 二级路由 可以不写 / 如果写的话就写全写， myorder 也是对的
                component: MyOrder
            },
            {
                path:'/center/grouporder',
                component:GroupOrder
            },
            {
                path:'/center',
                redirect:'/center/myorder',
            }
        ]
    },
]