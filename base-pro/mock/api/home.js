export default [
    {
        url: "/api/getmenus",
        method: "get",
        response: () => {
            const list = [{
                index:1,
                name:'首页',
                path:'/home',
                childrens:null
              },
              {
                index:2,
                name:'子应用',
                path:'/main-vite',
                childrens:null
              },
              {
                index:3,
                name:'three',
                path:'/',
                childrens:[{
                    index:301,
                    name:'demo1',
                    path:'/threeDemo1'
                },
                {
                    index:302,
                    name:'threeMap',
                    path:'/threeMap'
                }
            ]
              }
            ];
          return {
              code: 200,
              message: "ok",
              data: {
                list,
                success:''}
            };
        }
    }
]