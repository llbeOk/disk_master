import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Login from'@/pages/Login/index.vue'
import FileManage from '@/pages/FileManage/index.vue'
import FileShare from '@/pages/FileShare/index.vue'
import UserView from '@/pages/UserView/index.vue'
import Shared from '@/pages/Shared/index.vue'
import Follow from '@/pages/Follow/index.vue'
const router = new VueRouter({
    routes:[
        {
            path:"/follow",
            component:Follow,
            meta: { isAuth: true, title:'follow' }
        },
        {
            path:"/login",
            component:Login
        },
        {
            path:"/file",
            component:FileManage,
            meta: { isAuth: true, title:'file' }
        },
        {
            path:"/share",
            component:FileShare,
            meta: { isAuth: true, title:'share' }
        },
        {
            path:"/shared",
            component:Shared,
            meta: { isAuth: true, title:'shared' }
        },
        {
            path:"/user",
            component:UserView,
            meta: { isAuth: true, title:'user' }
        },
        {
            path:'/',
            redirect:'Login'
        }
    ]
})
// //全局前置路由守卫————初始化的时候被调用、每次路由切换之前被调用
// router.beforeEach((to, from, next) => {
//     //如果路由需要跳转
//     if (to.meta.isAuth) {
//         if (sessionStorage.getItem('username') !=undefined) {
//             next()  //放行
//         } else {
//             alert('抱歉，您无权限查看！')
//         }
//     } else {
//         // 否则，放行
//         next()
//     }
// })
export default router