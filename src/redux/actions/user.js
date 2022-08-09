import {createAction} from 'redux-actions'
import {SET_USER,DELETE_USER} from '../actionsConfig'
const users=[
    {
        userName: 'admin',
        password: '123456',
        roles: ['admin','root'],
        Auth_Token: 'admin'
    },
    {
        userName: 'animate',
        password: '123456',
        roles: ['admin'],
        Auth_Token: 'animate'
    }
    
]
 const setUser=createAction(SET_USER)
 export const login=(info)=>async (dispatch) => {
     const {userName,password}=info
     return new Promise((resolve,reject)=>{
         // axios 发送 获取user
         //这里用假数据模拟得到user数据
         let user=users.find(item=>item.userName===userName)
         if(!user) reject('用户名错误')
         if(!user.password===password) reject('密码错误')
         dispatch(setUser(user))
         resolve(user)
     })
 }
export const deletUser=createAction(DELETE_USER)