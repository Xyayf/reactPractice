
import asyncComponent from './asyncComponent'


const _import_componet =path=>asyncComponent(()=>import(`view/${path}`))

//大类分为公有路由和私有路由来标示带有权限的用户
//小类分为layoout布局页面用meta来标识有meta代表是菜单显示内容和非layout布局页面
export const publicRoutes=[
    {
        path:'/',
        redirect:'user',//redirect=redirect+path 所以不用加/
        component:_import_componet('layout')

    },
    {
        path:'/user',
        redirect:'/message',
        meta:{
            name:'用户',
            icon:''
        },
        children:[
            {
                path:'/message',
                component:'',
                redirect:'/fffj',
                meta:{
                    name:'信息详情',
                    icon:''
                },
                children:[
                    {
                        path:'/fffj',
                        component:_import_componet('fffj'),
                        meta:{
                            name:'fffj'
                        }
                    }
                ]
            }
        ]
        
        
    },
    {
        path:'/hhhh',
        component:_import_componet('login'),
        meta:{
            name:'hhhhh'
        }
    },
    {
       path:'/login',
       component:_import_componet('login')
       
    },
    {
        path:'/error',
        children:[
            {
                path:'/404',
                component:_import_componet('404')
            },
            {
                path:'/401',
                component:''
            }
        ]
    }
]

export const privateRoutes=[
    {
        path:'/auth',
        component:'',
        meta:{
            name:'权限'
        },
        auth:['admin','root']
    },
    {
        path:'/admin',
        component:'',
        meta:{
            name:'管理权限'
        },
        auth:['admin']
    }
]
