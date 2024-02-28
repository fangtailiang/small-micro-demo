
const routes = [

    {
        path: '/',
        name: 'Home',

        component: () => import(/* webpackChunkName: "page2" */ '../views/home/home.vue')
    },
    {
        path: '/page1',
        name: 'page1',
        component: () => import(/* webpackChunkName: "page2" */ '../views/page1/page1.vue')
      }
]

export default routes;