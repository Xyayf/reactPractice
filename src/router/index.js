import React from 'react'
import { Routes,Route,useLocation,Navigate } from 'react-router-dom'
import { connect  } from 'react-redux'
import {bindActionCreators} from 'redux'
import actions from '../redux/actions'
import writeList from './writeList'
function renderRoutes(routes,path=''){
    const filteroutes=routes.filter(item=>item.path!=='/')
   
  return  filteroutes.map(route=>{
        
        if(route.children && route.children.length>0){   
           
            if(route.component){
                const Component=route.component
              return  <Route element={<Component/>}
                  path={path+route.path}
                      >
               {renderRoutes(route.children,path+route.path)} 
            </Route>
                
            }else{
                return renderRoutes(route.children,path+route.path)
            }
        }else{
            let pathed
            if(path==''){
                pathed=route.path
            }else{
                 pathed =path+route.path
            }
            const Component=route.component
            return <Route element={<Component/>}
                key={pathed}
                path={pathed}
                   ></Route>
        }
        
    })
}

function isWriteList(writeList,path){
    let flag=writeList.findIndex(item=>item==path)
    if(flag>-1){
        return true
    }
    return false
}
function multiToSingle(array){
    let arr=[]
    function fn(array,path=''){
        array.forEach(item=>{
            if(item.children&&item.children.length>0){
               
                fn(item.children,path+item.path)
            }
                let pathed
                if(path==''){
                    pathed=item.path
                }else{
                     pathed =path+item.path
                }
                let obj={
                    ...item,
                    path:pathed
                    
                }
               arr.push(obj)
               
            
        })
    }
    fn(array)
   
    return arr

}
function isExistRoutes(routes,path){
    
  return  multiToSingle(routes).some(item=>item.path===path)
                                                                                            
}

function joinRedirect(array){
    const resulte=multiToSingle(array)
  return  resulte.map(item=>{
        if(item.redirect){
            return {
                ...item,
                redirect:item.path+item.redirect
            }
        }
        return item
    })
}
function currenRoute(routes,path){
  return  joinRedirect(routes).find(item=>item.path===path)
}
export default connect(state=>state,dispatch=>bindActionCreators(actions,dispatch))(function (props){
    
   const{user,routes}=props
    const {pathname}=useLocation()
    
    
    const MenuComponet=routes.find(item=>item.path==='/').component
    
    if(!isExistRoutes(routes,pathname)){
        
        return <Navigate to="/error/404"></Navigate>
    }else{
        const currRoute=currenRoute(routes,pathname)
        if(currRoute.redirect){
            return <Navigate to={currRoute.redirect}></Navigate>
        }
         if(!isWriteList(writeList,pathname) && !user) { 
        if(pathname!=='/login'){
            return <Navigate to="/login"></Navigate>
        }
    }
    }
   
    
    
     return(
        
             <Routes>
                <Route element={<MenuComponet/>}
                    path="/"
                >
                   {renderRoutes((routes.filter(item=>item.meta)))} 
                </Route>
                {renderRoutes((routes.filter(item=>!item.meta)))} 
                 </Routes>
         
     )
 })