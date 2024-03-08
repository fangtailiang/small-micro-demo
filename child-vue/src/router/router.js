
const routes = [

    {
        path: '/',
        name: 'home',

        component: () => import(/* webpackChunkName: "home" */ '../views/home/home.vue')
    },
    {
        path: '/page1',
        name: 'page1',
        component: () => import(/* webpackChunkName: "page2" */ '../views/page1/page1.vue')
      }
]

export default routes;