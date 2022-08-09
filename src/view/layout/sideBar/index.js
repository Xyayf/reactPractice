import connects from '../../../utill/connect'
// import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import {useNavigate} from 'react-router-dom'
function getMenus(routes){
    let arr=[]
       routes.forEach(item=>{
           if(item.meta&&item.meta.name){
               let obj={}
               obj={
                   label:item.meta.name,
                   key:item.path,
                   icon:item.meta.icon
               } 
               if(item.children){
                    obj.children=getMenus(item.children)  
               }
               arr.push(obj)
           }

       })
       return arr

}

function SiderBar(props){
    const items=getMenus(props.routes)
    const navigate = useNavigate()
    const onClick=(e)=>{
        let path=''
        console.log(e)
        e.keyPath.forEach(item=>{
            path=item+path
        })
        navigate(path)
    }
    return(
        <Menu
            items={items}
            mode="inline"
            onClick={onClick}
            style={{
          width: 256
        }}
        />
    )
}
export default connects(SiderBar)