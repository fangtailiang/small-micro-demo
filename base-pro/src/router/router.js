import { createRouter, createWebHistory } from 'vue-router'
import { useLoggerStore } from "@/store/logger";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            redirect:'home',
            component: () => import('@/components/layout/layout.vue'),
            children:[
                {
                    path: "",
                    name: "home",
                    component: () => import('@/views/home/home.vue')
                },
                {
                    path: 'main-vite/:page*',
                    component: () => import('@/views/child/vue3.vue'),
                    meta: { keepAlive: true }
                },
                {
                    path: 'child-react/:page*',
                    component: () => import('@/views/child/react.vue'),
                    meta: { keepAlive: true }
                },
                {
                    path: 'threeDemo1',
                    name: 'demo1',
                    component: () => import("@/views/threes/demo1.vue"),
                    meta: { keepAlive: true }
                },
                {
                    path: 'threeMap/:id',
                    name: 'threeMap',
                    component: () => import("@/views/threes/sichuan.vue"),
                    // meta: { keepAlive: true }
                    // children:[
                    //     {
                    //         path: "map/:id",
                    //         name: "map",
                    //         component: () => import('@/views/home/sichuan.vue'),
                    //         meta: { keepAlive: true }
                    //     },
                    // ]
                }
                
            ]
          },
          {
            path: "/login",
            name: "login",
            component: () => import('@/views/login/login.vue')//登录
          },
    ],
  })

  router.beforeEach((to,from,next) => {
    const loggerStore = useLoggerStore();
    loggerStore.setBehaviorLoggerArray({
        title: '页面跳转',
        fromPage:from.path,
        toPage:to.path
    })
    next()
  })
export default router


